// export const getter = (state) => {
//   return state.property;
// };

export const getEntriesByTerm =
  (state) =>
  (term = "") => {
    return term.length > 0
      ? state.entries.filter((entry) =>
          entry.text.toLowerCase().includes(term.toLowerCase())
        )
      : state.entries;
  };

export const getEntryById =
  (state) =>
  (id = "") => {
    const entry = state.entries.find((entry) => entry.id === id);
    return entry ? { ...entry } : undefined;
  };
