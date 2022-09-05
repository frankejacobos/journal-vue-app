<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link :to="{ name: 'no-entry' }">DayBook</router-link>
  </nav> -->
  <h1 v-if="authStatus === 'authenticating'">Authenticating...</h1>
  <router-view />
</template>

<script>
import useAuth from "@/modules/auth/composables/useAuth";
export default {
  name: "App",
  setup() {
    const { authStatus, isAuthenticated } = useAuth();
    return { authStatus, isAuthenticated };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
