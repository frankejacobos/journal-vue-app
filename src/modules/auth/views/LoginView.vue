<template>
  <span class="login100-form-title p-b-41"> Ingresar </span>
  <form
    class="login100-form validate-form p-b-33 p-t-5"
    @submit.prevent="onSubmit"
  >
    <div class="wrap-input100 validate-input" data-validate="Enter email">
      <input
        required
        type="text"
        class="input100"
        placeholder="email"
        v-model="userForm.email"
      />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        required
        type="password"
        class="input100"
        placeholder="password"
        v-model="userForm.password"
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button type="submit" class="login100-form-btn">Login</button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'register' }">¿No tienes cuenta?</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "../composables/useAuth";
import Swal from "sweetalert2";

export default {
  name: "LoginView",
  setup() {
    const router = useRouter();
    const { login } = useAuth();
    const userForm = ref({
      email: "",
      password: "",
    });
    return {
      userForm,
      onSubmit: async () => {
        const { ok, message } = await login(userForm.value);
        if (!ok) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: message,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Bienvenido",
            text: message,
          });
          router.push({ name: "no-entry" });
        }
      },
    };
  },
};
</script>

<style></style>
