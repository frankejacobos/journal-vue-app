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
    commit("login", { user, idToken, refreshToken });
    return { ok: true, message: "Usuario registrado correctamente" };
  } catch (error) {
    const message =
      error.response.data.error.message === "EMAIL_EXISTS"
        ? "Correo ya registrado"
        : error.response.data.error.message;
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
    commit("login", { user, idToken, refreshToken });
    return { ok: true, message: "Usuario logueado correctamente" };
  } catch (error) {
    const message =
      error.response.data.error.message === "EMAIL_NOT_FOUND"
        ? "Correo no registrado"
        : error.response.data.error.message === "INVALID_PASSWORD"
        ? "Contraseña incorrecta"
        : error.response.data.error.message;
    return { ok: false, message: message };
  }
};

export const logout = async ({ commit }) => {
  commit("logout");
};

export const isAuthenticated = async ({ commit }) => {
  const idToken = localStorage.getItem("idToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!idToken || !refreshToken) {
    commit("logout");
    return { ok: false, message: "Usuario no autenticado" };
  }
  try {
    const { data } = await authApi.post(":lookup", {
      idToken,
    });
    const { email, displayName } = data.users[0];
    const user = { email, name: displayName };
    commit("login", { user, idToken, refreshToken });
    return { ok: true, message: "Usuario autenticado correctamente" };
  } catch (error) {
    commit("logout");
    return { ok: false, message: "Usuario no autenticado" };
  }
};
