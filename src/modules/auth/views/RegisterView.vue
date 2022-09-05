<template>
  <span class="login100-form-title p-b-41"> Ingresar </span>
  <form
    class="login100-form validate-form p-b-33 p-t-5"
    @submit.prevent="onSubmit"
  >
    <div class="wrap-input100 validate-input" data-validate="Enter name">
      <input
        required
        type="text"
        class="input100"
        placeholder="name"
        v-model="userForm.name"
      />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter email">
      <input
        required
        type="email"
        class="input100"
        placeholder="email"
        v-model="userForm.email"
      />
      <span class="focus-input100" data-placeholder="&#xe818;"></span>
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
      <button class="login100-form-btn" type="submit">Sign Up</button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'login' }">¿Ya tienes cuenta?</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import useAuth from "../composables/useAuth";

export default {
  setup() {
    const router = useRouter();
    const { signup } = useAuth();
    const userForm = ref({
      name: "name",
      email: "email@gmail.com",
      password: "2@3#4$5%",
    });
    return {
      userForm,
      onSubmit: async () => {
        const { ok, message } = await signup(userForm.value);
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
