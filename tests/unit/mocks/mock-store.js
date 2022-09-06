import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import auth from "@/modules/auth/store";
import { journalState } from "./test-journal-state";

const createVuexStore = (
  authInitialState,
  journalInitialState = journalState
) =>
  createStore({
    modules: {
      auth: { ...auth, state: { ...authInitialState } },
      journal: { ...journal, state: { ...journalInitialState } },
    },
  });

export default createVuexStore;
