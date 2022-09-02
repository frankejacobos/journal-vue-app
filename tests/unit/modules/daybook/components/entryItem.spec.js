import { shallowMount } from "@vue/test-utils";
import EntryItem from "@/modules/daybook/components/EntryItem.vue";
import { journalState } from "@/../tests/unit/mocks/test-journal-state";

describe("Pruebas en el componente EntryItem", () => {
  const mockRouter = { push: jest.fn() };
  test("Debe de hacer match con el snapshot", () => {
    const wrapper = shallowMount(EntryItem, {
      props: {
        entry: journalState.entries[0],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("debe redireccionar con click en el entry-container", () => {
    const wrapper = shallowMount(EntryItem, {
      props: { entry: journalState.entries[0] },
      global: { mocks: { $router: mockRouter } },
    });
    wrapper.find(".entry-container").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: journalState.entries[0].id },
    });
  });
  test("pruebas en las propiedades computadas", () => {
    const wrapper = shallowMount(EntryItem, {
      props: { entry: journalState.entries[0] },
      global: { mocks: { $router: mockRouter } },
    });
    expect(wrapper.vm.day).toBe(1);
    expect(wrapper.vm.month).toBe("Enero");
    expect(wrapper.vm.year).toBe("2020, Miércoles");
  });
});
