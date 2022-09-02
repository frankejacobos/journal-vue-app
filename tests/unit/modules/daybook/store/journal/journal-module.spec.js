import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import { journalState } from "@/../tests/unit/mocks/test-journal-state";

const createVuexStore = (state) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...state },
      },
    },
  });

describe("Vuex - Pruebas en el módulo journal - Mutations", () => {
  test("se debe tener el state en el estado inicial", () => {
    const store = createVuexStore(journalState);
    const { isLoading, entries } = store.state.journal;
    expect(entries).toEqual(journalState.entries);
    expect(isLoading).toBe(false);
  });
  test('se debe llamar a la mutación "setEntries" y cargar las entradas', () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    store.commit("journal/setEntries", journalState.entries);
    const { isLoading, entries } = store.state.journal;
    expect(entries.length).toBe(2);
    expect(isLoading).toBe(false);
  });
  test('se debe llamar a la mutación "updateEntry" y actualizar la entrada', () => {
    const store = createVuexStore(journalState);
    const entry = { ...journalState.entries[0], date: 123456789 };
    store.commit("journal/updateEntry", entry);
    const { entries } = store.state.journal;
    expect(entries.length).toBe(2);
    expect(entries[0]).toEqual(entry);
    expect(entries[0].date).toBe(123456789);
  });
  test('se debe llamar a la mutación "deleteEntry" y eliminar la entrada', () => {
    const store = createVuexStore(journalState);
    store.commit("journal/deleteEntry", journalState.entries[0].id);
    const { entries } = store.state.journal;
    expect(entries.length).toBe(1);
    expect(entries[0].id).toBe("2");
  });
  test('se debe llamar a la mutación "addEntry" y agregar la entrada', () => {
    const store = createVuexStore(journalState);
    const entry = { ...journalState.entries[0], id: "3" };
    store.commit("journal/addEntry", entry);
    const { entries } = store.state.journal;
    expect(entries.length).toBe(3);
    expect(entries[0]).toEqual(entry);
  });
});

describe("Vuex - Pruebas en el módulo journal - Getters", () => {
  test("se debe llamar al getter 'getEntryById' y retornar la entrada", () => {
    const store = createVuexStore(journalState);
    const entry = store.getters["journal/getEntryById"]("1");
    expect(entry).toEqual(journalState.entries[0]);
  });
  test("se debe llamar al getter 'getEntriesByTerm' y retornar las entradas", () => {
    const store = createVuexStore(journalState);
    const entries = store.getters["journal/getEntriesByTerm"]("Hola");
    expect(entries.length).toBe(1);
    expect(entries[0].text).toBe("Hola Mundo");
  });
});

describe("Vuex - Pruebas en el módulo journal - Actions", () => {
  let index, store, entry;
  beforeEach(() => {
    store = createVuexStore({ isLoading: true, entries: [] });
  });
  const exec = async () => {
    entry = { date: 123456789, text: "Entrada 1", picture: null };
    index = await store.dispatch("journal/createEntry", entry);
  };
  test('se debe llamar a la acción "readEntries" y cargar las entradas', async () => {
    await store.dispatch("journal/readEntries");
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBe(false);
    expect(entries.length).toBe(3);
  });
  test('se debe llamar a la acción "createEntry" y agregar la entrada', async () => {
    await exec();
    const { entries } = store.state.journal;
    const entryCreated = entries.find((e) => e.id === index);
    expect(entries.length).toBe(1);
    expect(entryCreated).toEqual({ ...entry, id: index });
    await store.dispatch("journal/deleteEntry", index);
  });
  test('se debe llamar a la acción "updateEntry" y actualizar la entrada', async () => {
    await exec();
    const entryUpdated = { ...entry, id: index, text: "Entrada 1 actualizada" };
    await store.dispatch("journal/updateEntry", entryUpdated);
    const { entries } = store.state.journal;
    const entryCreated = entries.find((e) => e.id === index);
    expect(entryCreated).toEqual(entryUpdated);
    await store.dispatch("journal/deleteEntry", index);
  });
  test('se debe llamar a la acción "deleteEntry" y eliminar la entrada', async () => {
    await exec();
    await store.dispatch("journal/deleteEntry", index);
    const { entries } = store.state.journal;
    expect(entries.length).toBe(0);
  });
});
