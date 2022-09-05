export const setUser = (state, { user, idToken, refreshToken }) => {
  if (!user) {
    state.user = null;
    state.idToken = null;
    state.refreshToken = null;
    state.status = "unauthenticated";
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
  } else {
    if (idToken) {
      state.idToken = idToken;
      localStorage.setItem("idToken", idToken);
    }
    if (refreshToken) {
      state.refreshToken = refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
    }
    state.user = user;
    state.status = "authenticated";
  }
};
