import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import { journalState } from "@/../tests/unit/mocks/test-journal-state";
import EntryList from "@/modules/daybook/components/EntryList.vue";
import journal from "@/modules/daybook/store/journal";

const createVuexStore = (state) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...state },
      },
    },
  });
describe("Pruebas en el componente EntryList", () => {
  const store = createVuexStore(journalState);
  const mockRouter = { push: jest.fn() };
  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryList, {
      global: {
        mocks: { $router: mockRouter },
        plugins: [store],
      },
    });
  });
  test("debe de llamar getEntriesByTerm sin termino y retornar 2 entries", () => {
    expect(wrapper.findAll("entry-item-stub").length).toBe(2);
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("debe de llamar getEntriesByTerm con termino y retornar 1 entry", async () => {
    await wrapper.find("input").setValue("Hola");
    expect(wrapper.findAll("entry-item-stub").length).toBe(1);
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("debe de llamar getEntriesByTerm con termino y retornar 0 entry", async () => {
    await wrapper.find("input").setValue("Hola mndo");
    expect(wrapper.findAll("entry-item-stub").length).toBe(0);
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('debe redireccionar a /new cuando se haga click en el boton "new"', () => {
    wrapper.find("button").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: "new" },
    });
  });
});
