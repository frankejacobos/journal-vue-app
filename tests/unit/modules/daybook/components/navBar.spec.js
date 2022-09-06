import { shallowMount } from "@vue/test-utils";
import NavbarDaybook from "@/modules/daybook/components/NavbarDaybook.vue";
import createVuexStore from "@/../tests/unit/mocks/mock-store";

describe("Pruebas en el componente NavbarDaybook", () => {
  const store = createVuexStore({
    user: { name: "Test", email: "email@gmail.com" },
    status: "authenticated",
    idToken: "123456",
    refreshToken: "654321",
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Debe de hacer match con el snapshot", () => {
    const wrapper = shallowMount(NavbarDaybook, {
      global: { plugins: [store] },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("Debe de llamar el logout", async () => {
    const wrapper = shallowMount(NavbarDaybook, {
      global: { plugins: [store] },
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.router.push).toHaveBeenCalledWith({ name: "login" });
    expect(store.state.auth).toEqual({
      user: null,
      idToken: null,
      refreshToken: null,
      status: "unauthenticated",
    });
  });
});
