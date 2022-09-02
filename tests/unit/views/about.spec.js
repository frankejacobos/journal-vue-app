import { shallowMount } from "@vue/test-utils";
import About from "@/views/AboutView.vue";

describe("Pruebas en la vista About", () => {
  test("debe de hacer match con el snapshot", () => {
    const wrapper = shallowMount(About);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
