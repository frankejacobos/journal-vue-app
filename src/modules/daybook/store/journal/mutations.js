export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
};

export const addEntry = (state, entry) => {
  state.entries = [entry, ...state.entries];
};

export const updateEntry = (state, entry) => {
  const index = state.entries.findIndex((e) => e.id === entry.id);
  state.entries[index] = entry;
};

export const deleteEntry = (state, entryId) => {
  state.entries = state.entries.filter((e) => e.id !== entryId);
};

export const clearEntries = (state) => {
  state.entries = [];
}
