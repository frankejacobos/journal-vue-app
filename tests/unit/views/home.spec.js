import { shallowMount } from "@vue/test-utils";
import Home from "@/views/HomeView.vue";

describe("Pruebas en la vista Home", () => {
  test("debe de hacer match con el snapshot", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("debe redireccionar a no-entry al hacer click en un boton", () => {
    const mockRouter = { push: jest.fn() };
    const wrapper = shallowMount(Home, {
      global: { mocks: { $router: mockRouter } },
    });
    wrapper.find("button").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
});
