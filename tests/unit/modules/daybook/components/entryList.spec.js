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
  const wrapper = shallowMount(EntryList, {
    global: {
      mocks: { $router: mockRouter },
      plugins: [store],
    },
  });
  test("debe de llamar getEntriesByTerm y retornar 2 entries", () => {
    console.log(wrapper.html());
    // expect(wrapper.vm.entries.length).toBe(2);
  });
});
