import journalApi from "@/api/journalApi";

export const createEntry = async ({ commit }, entry) => {
  const { date, text, picture } = entry;
  const dataToSave = { date, text, picture };
  const { data } = await journalApi.post("/entries.json", dataToSave);
  commit("addEntry", { ...dataToSave, id: data.name });
  return data.name;
};

export const readEntries = async ({ commit }) => {
  const { data } = await journalApi.get("/entries.json");
  let entries = [];
  if (data) {
    for (let id of Object.keys(data)) {
      entries.push({
        id,
        ...data[id],
      });
    }
  }
  commit("setEntries", entries);
};

export const updateEntry = async ({ commit }, entry) => {
  const { date, text, picture } = entry;
  const dataToSave = { date, text, picture };
  await journalApi.put(`/entries/${entry.id}.json`, dataToSave);
  commit("updateEntry", { ...entry });
};

export const deleteEntry = async ({ commit }, id) => {
  await journalApi.delete(`/entries/${id}.json`);
  commit("deleteEntry", id);
};

export const clearEntries = ({ commit }) => {
  commit("clearEntries");
};
