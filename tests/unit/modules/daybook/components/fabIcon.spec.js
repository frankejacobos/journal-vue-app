import { shallowMount } from "@vue/test-utils";
import Fab from "@/modules/daybook/components/FabIcon.vue";

describe("Pruebas en el componente Fab", () => {
  test("debe de hacer match con el snapshot", () => {
    const wrapper = shallowMount(Fab);
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("debe mostrar el icono por defecto", () => {
    const wrapper = shallowMount(Fab);
    const icon = wrapper.find("i");
    expect(icon.classes("fa-plus")).toBe(true);
  });
  test("debe mostrar el icono enviado por props", () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: "fa-save",
      },
    });
    const icon = wrapper.find("i");
    expect(icon.classes("fa-save")).toBe(true);
  });
  test("debe de emitir el evento on:click", () => {
    const wrapper = shallowMount(Fab);
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted("on:click")).toBeTruthy();
    expect(wrapper.emitted("on:click").length).toBe(1);
  });
});
