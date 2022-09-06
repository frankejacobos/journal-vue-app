import LoginView from "@/modules/auth/views/LoginView.vue";
import { shallowMount } from "@vue/test-utils";
import createVuexStore from "@/../tests/unit/mocks/mock-store";
import Swal from "sweetalert2";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe("Pruebas en el componente LoginView", () => {
  const store = createVuexStore({
    status: "authenticating",
    user: null,
    idToken: null,
    refreshToken: null,
  });
  store.dispatch = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Debe de hacer match con el snapshot", () => {
    const wrapper = shallowMount(LoginView, {
      global: { plugins: [store] },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("Debe de disparar el Swal.fire", async () => {
    store.dispatch.mockReturnValueOnce({ ok: false, message: "Error" });
    const wrapper = shallowMount(LoginView, {
      global: { plugins: [store] },
    });
    await wrapper.find("form").trigger("submit");
    expect(store.dispatch).toHaveBeenCalledWith("auth/login", {
      email: "",
      password: "",
    });
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      title: "Oops...",
      text: "Error",
    });
  });
  test("Debe de redireccionar al dashboard (no-entry)", async () => {
    store.dispatch.mockReturnValueOnce({ ok: true, message: "Ok" });
    const wrapper = shallowMount(LoginView, {
      global: { plugins: [store] },
    });
    const [email, password] = wrapper.findAll("input");
    await email.setValue("prueba@gmail.com");
    await password.setValue("123456");
    await wrapper.find("form").trigger("submit");
    expect(store.dispatch).toHaveBeenCalledWith("auth/login", {
      email: "prueba@gmail.com",
      password: "123456",
    });
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "success",
      title: "Bienvenido",
      text: "Ok",
    });
    expect(wrapper.router.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
});
