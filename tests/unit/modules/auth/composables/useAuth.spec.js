import useAuth from "@/modules/auth/composables/useAuth";

const mockStore = {
  dispatch: jest.fn(), // mock the dispatch method
  getters: {
    // mock the getters
    "auth/authStatus": "authenticated",
    "auth/username": "testuser",
  },
  // state: {},
  // commit: jest.fn(),
};

jest.mock("vuex", () => ({
  useStore: () => mockStore,
}));

describe("useAuth", () => {
  describe("signup", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test("signup must be successful", async () => {
      const { signup } = useAuth();
      const user = { username: "test", password: "test" };
      mockStore.dispatch.mockReturnValue({ ok: true });
      const resp = await signup(user);
      expect(mockStore.dispatch).toHaveBeenCalledWith("auth/signup", user);
      expect(resp).toEqual({ ok: true });
    });
    test("signup must be unsuccessful", async () => {
      const { signup } = useAuth();
      const user = { username: "test", password: "test" };
      mockStore.dispatch.mockReturnValue({
        ok: false,
        message: "Correo ya registrado",
      });
      const resp = await signup(user);
      expect(mockStore.dispatch).toHaveBeenCalledWith("auth/signup", user);
      expect(resp).toEqual({
        ok: false,
        message: "Correo ya registrado",
      });
    });
  });
  describe("login", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test("login must be successful", async () => {
      const { login } = useAuth();
      const user = { email: "email@gmail.com", password: "test" };
      mockStore.dispatch.mockReturnValue({ ok: true });
      const resp = await login(user);
      expect(mockStore.dispatch).toHaveBeenCalledWith("auth/login", user);
      expect(resp).toEqual({ ok: true });
    });
    test("login must be unsuccessful", async () => {
      const { login } = useAuth();
      const user = { email: "email@gmail.com", password: "test" };
      mockStore.dispatch.mockReturnValue({ ok: false });
      const resp = await login(user);
      expect(mockStore.dispatch).toHaveBeenCalledWith("auth/login", user);
      expect(resp).toEqual({ ok: false });
    });
  });
  describe("isAuthenticated", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test("isAuthenticated must be successful", async () => {
      const { isAuthenticated } = useAuth();
      mockStore.dispatch.mockReturnValue({ ok: true });
      const resp = await isAuthenticated();
      expect(mockStore.dispatch).toHaveBeenCalledWith("auth/isAuthenticated");
      expect(resp).toEqual({ ok: true });
    });
    test("isAuthenticated must be unsuccessful", async () => {
      const { isAuthenticated } = useAuth();
      mockStore.dispatch.mockReturnValue({ ok: false });
      const resp = await isAuthenticated();
      expect(mockStore.dispatch).toHaveBeenCalledWith("auth/isAuthenticated");
      expect(resp).toEqual({ ok: false });
    });
  });
  describe("logout", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test("logout must be successful", () => {
      const { logout } = useAuth();
      logout();
      expect(mockStore.dispatch).toHaveBeenCalledWith("auth/logout");
      expect(mockStore.dispatch).toHaveBeenCalledWith("journal/clearEntries");
    });
  });
  describe("computed", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test("authStatus must be successful", () => {
      const { authStatus } = useAuth();
      expect(authStatus.value).toBe("authenticated");
    });
    test("username must be successful", () => {
      const { username } = useAuth();
      expect(username.value).toBe("testuser");
    });
  });
});
