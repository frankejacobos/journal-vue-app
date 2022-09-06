import createVuexStore from "@/../tests/unit/mocks/mock-store";
import axios from "axios";

describe("Auth Module", () => {
  describe("state", () => {
    test("estado inicial", () => {
      const store = createVuexStore({
        status: "authenticating",
        user: null,
        idToken: null,
        refreshToken: null,
      });
      const { status, user, idToken, refreshToken } = store.state.auth;
      expect(status).toBe("authenticating");
      expect(user).toBe(null);
      expect(idToken).toBe(null);
      expect(refreshToken).toBe(null);
    });
  });
  describe("mutations", () => {
    test("método login", () => {
      const store = createVuexStore({
        status: "authenticating",
        user: null,
        idToken: null,
        refreshToken: null,
      });
      store.commit("auth/login", {
        user: { name: "John Doe", email: "email@gmail.com" },
        idToken: "idToken",
        refreshToken: "refreshToken",
      });
      const { status, user, idToken, refreshToken } = store.state.auth;
      expect(status).toBe("authenticated");
      expect(user).toEqual({ name: "John Doe", email: "email@gmail.com" });
      expect(idToken).toBe("idToken");
      expect(refreshToken).toBe("refreshToken");
    });
    test("método logout", () => {
      const store = createVuexStore({
        status: "authenticated",
        user: { name: "John Doe", email: "email@gmail.com" },
        idToken: "idToken",
        refreshToken: "refreshToken",
      });
      store.commit("auth/logout");
      const { status, user, idToken, refreshToken } = store.state.auth;
      expect(status).toBe("unauthenticated");
      expect(user).toBe(null);
      expect(idToken).toBe(null);
      expect(refreshToken).toBe(null);
    });
  });
  describe("getters", () => {
    const store = createVuexStore({
      status: "authenticated",
      user: { name: "John Doe", email: "email@gmail.com" },
      idToken: "idToken",
      refreshToken: "refreshToken",
    });
    test("getter authStatus", () => {
      expect(store.getters["auth/authStatus"]).toBe("authenticated");
    });
    test("getter username", () => {
      expect(store.getters["auth/username"]).toBe("John Doe");
    });
  });
  describe("actions", () => {
    test("user signup - failed, user already exists", async () => {
      const store = createVuexStore({
        status: "authenticating",
        user: null,
        idToken: null,
        refreshToken: null,
      });
      const newUser = {
        name: "John Doe",
        password: "123456",
        email: "test@gmail.com",
      };
      const resp = await store.dispatch("auth/signup", newUser);
      expect(resp).toEqual({
        ok: false,
        message: "Correo ya registrado",
      });
    });
    test("user signup - user created successfully", async () => {
      const store = createVuexStore({
        status: "authenticating",
        user: null,
        idToken: null,
        refreshToken: null,
      });
      const newUser = {
        name: "John Doe",
        password: "access",
        email: "access@gmail.com",
      };
      const resp = await store.dispatch("auth/signup", newUser);
      expect(resp).toEqual({
        ok: true,
        message: "Usuario registrado correctamente",
      });
      const { status, user, idToken: token, refreshToken } = store.state.auth;
      expect(status).toBe("authenticated");
      expect(user).toEqual({ name: "John Doe", email: "access@gmail.com" });
      expect(typeof token).toBe("string");
      expect(typeof refreshToken).toBe("string");
      // we need to delete the user created for this test
      await store.dispatch("auth/login", newUser);
      const { idToken } = store.state.auth;
      await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:delete",
        { idToken },
        { params: { key: "AIzaSyDUu28oZvIK9Kx3ovyQtLHBzCGOv-weKLk" } }
      );
    });
    test("user login - successfully", async () => {
      const store = createVuexStore({
        status: "authenticating",
        user: null,
        idToken: null,
        refreshToken: null,
      });
      const user = {
        password: "123456",
        email: "test@gmail.com",
      };
      const resp = await store.dispatch("auth/login", user);
      expect(resp).toEqual({
        ok: true,
        message: "Usuario logueado correctamente",
      });
    });
    test("user login - failed, email not found", async () => {
      const store = createVuexStore({
        status: "authenticating",
        user: null,
        idToken: null,
        refreshToken: null,
      });
      const user = {
        email: "fatalerror@gmail.com",
        password: "123456",
      };
      const resp = await store.dispatch("auth/login", user);
      expect(resp).toEqual({
        ok: false,
        message: "Correo no registrado",
      });
    });
    test("user login - failed, wrong password", async () => {
      const store = createVuexStore({
        status: "authenticating",
        user: null,
        idToken: null,
        refreshToken: null,
      });
      const user = {
        password: "accesss",
        email: "test@gmail.com",
      };
      const resp = await store.dispatch("auth/login", user);
      expect(resp).toEqual({
        ok: false,
        message: "Contraseña incorrecta",
      });
    });
    test("user logout - successfully", async () => {
      const store = createVuexStore({
        status: "authenticated",
        user: { name: "John Doe", email: "access@gmail.com" },
        idToken: "idToken",
        refreshToken: "refreshToken",
      });
      await store.dispatch("auth/logout");
      const { status, user, idToken, refreshToken } = store.state.auth;
      expect(status).toBe("unauthenticated");
      expect(user).toBe(null);
      expect(idToken).toBe(null);
      expect(refreshToken).toBe(null);
    });
    test("user isAuthenticated - true", async () => {
      const store = createVuexStore({
        status: "authenticating",
        user: null,
        idToken: null,
        refreshToken: null,
      });
      const newUser = {
        name: "John Doe",
        password: "access",
        email: "access@gmail.com",
      };
      await store.dispatch("auth/signup", newUser);
      const resp = await store.dispatch("auth/isAuthenticated");
      expect(resp).toEqual({
        ok: true,
        message: "Usuario autenticado correctamente",
      });
      const { idToken } = store.state.auth;
      await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:delete",
        { idToken },
        { params: { key: "AIzaSyDUu28oZvIK9Kx3ovyQtLHBzCGOv-weKLk" } }
      );
    });
    test("user isAuthenticated - false", async () => {
      const store = createVuexStore({
        status: "unauthenticated",
        user: null,
        idToken: null,
        refreshToken: null,
      });
      const resp = await store.dispatch("auth/isAuthenticated");
      const { status, user, idToken, refreshToken } = store.state.auth;
      expect(resp).toEqual({
        ok: false,
        message: "Usuario no autenticado",
      });
      expect(status).toBe("unauthenticated");
      expect(user).toBe(null);
      expect(idToken).toBe(null);
      expect(refreshToken).toBe(null);
    });
  });
});
