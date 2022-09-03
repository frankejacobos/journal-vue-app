import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import { journalState } from "@/../tests/unit/mocks/test-journal-state";
import journal from "@/modules/daybook/store/journal";
import EntryView from "@/modules/daybook/views/EntryView.vue";
import Swal from "sweetalert2";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));
const createVuexStore = (state) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...state },
      },
    },
  });
const store = createVuexStore(journalState);
store.dispatch = jest.fn();
const mockRouter = { push: jest.fn() };
let wrapper;
describe("Pruebas en el componente EntryView", () => {
  const exec = (id) => {
    wrapper = shallowMount(EntryView, {
      props: { id },
      global: {
        mocks: { $router: mockRouter },
        plugins: [store],
      },
    });
  };
  afterEach(() => {
    mockRouter.push.mockClear(); /* limpiar mocks */
  });
  test("debe sacar al usuario si el id no existe", () => {
    exec("3");
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
  test("debe de mostrar el entry si el id existe", () => {
    exec("1");
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
  test("debe de llamar al deleteEntry al hacer click en el botón", (done) => {
    exec("1");
    Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));
    wrapper.find(".btn-danger").trigger("click");
    expect(Swal.fire).toHaveBeenCalledWith({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });
    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith("journal/deleteEntry", "1");
      expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
      done();
    }, 1);
  });
});
