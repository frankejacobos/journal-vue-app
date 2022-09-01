<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">No hay nada seleccionado</h1>
    <i class="far fa-star fa-4x mt-5"></i>
    <button-fab></button-fab>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    ButtonFab: defineAsyncComponent(() => import("../components/FabIcon.vue")),
  },
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>
