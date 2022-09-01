<template>
  <nav-bar></nav-bar>
  <div class="d-flex">
    <div class="col-4">
      <entry-list></entry-list>
    </div>
    <div class="col">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    NavBar: defineAsyncComponent(() => import("../components/NavbarDaybook.vue")),
    EntryList: defineAsyncComponent(() => import("../components/EntryList.vue")),
  },
};
</script>

<style></style>
