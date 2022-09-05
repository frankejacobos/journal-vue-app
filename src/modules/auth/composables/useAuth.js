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
    return store.dispatch("auth/logout");
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
  };
};

export default useAuth;
