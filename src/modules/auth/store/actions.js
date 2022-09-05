import authApi from "@/api/authApi";

export const signup = async ({ commit }, user) => {
  const { name, email, password } = user;
  try {
    const { data } = await authApi.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });
    const { idToken, refreshToken } = data;
    await authApi.post(":update", {
      displayName: name,
      idToken,
    });
    delete user.password;
    commit("setUser", { user, idToken, refreshToken });
    return { ok: true, message: "Usuario registrado correctamente" };
  } catch (error) {
    const message =
      error.response.data.error.message === "EMAIL_EXISTS"
        ? "Correo ya registrado"
        : "Error al crear usuario";
    return { ok: false, message: message };
  }
};

export const login = async ({ commit }, user) => {
  const { email, password } = user;
  try {
    const { data } = await authApi.post(":signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });
    const { idToken, refreshToken, displayName } = data;
    user.name = displayName;
    delete user.password;
    commit("setUser", { user, idToken, refreshToken });
    return { ok: true, message: "Usuario logueado correctamente" };
  } catch (error) {
    const message =
      error.response.data.error.message === "EMAIL_NOT_FOUND"
        ? "Correo no registrado"
        : "Contraseña incorrecta";
    return { ok: false, message: message };
  }
};

export const logout = async ({ commit }) => {
  commit("setUser", null);
};

export const isAuthenticated = async ({ commit }) => {
  const idToken = localStorage.getItem("idToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!idToken || !refreshToken) {
    commit("setUser", null);
    return { ok: false, message: "Usuario no autenticado" };
  }
  try {
    const { data } = await authApi.post(":lookup", {
      idToken,
    });
    const { email, displayName } = data.users[0];
    const user = { email, name: displayName };
    commit("setUser", { user, idToken, refreshToken });
    return { ok: true, message: "Usuario autenticado correctamente" };
  } catch (error) {
    commit("setUser", null);
    return { ok: false, message: "Usuario no autenticado" };
  }
};
