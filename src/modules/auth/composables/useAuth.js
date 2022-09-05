import { computed } from "vue";
import { useStore } from "vuex";

const useAuth = () => {
  const store = useStore();
  const isAuthenticated = async () => {
    const resp = await store.dispatch("auth/isAuthenticated");
    return resp;
  };
  const login = async (user) => {
    const resp = await store.dispatch("auth/login", user);
    return resp;
  };
  const logout = () => {
    store.dispatch("auth/logout");
    store.dispatch("journal/clearEntries");
  };
  const signup = async (user) => {
    const resp = await store.dispatch("auth/signup", user);
    return resp;
  };
  return {
    login,
    signup,
    logout,
    isAuthenticated,
    authStatus: computed(() => store.getters["auth/authStatus"]),
    username: computed(() => store.getters["auth/username"]),
  };
};

export default useAuth;
