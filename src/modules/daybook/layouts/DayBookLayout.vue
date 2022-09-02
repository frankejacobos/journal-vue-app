<template>
  <nav-bar></nav-bar>
  <div v-if="isLoading" class="row justify-content-md-center">
    <div class="col-3 alert alert-info text-center mt-5">
      Espere un momento...
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>
  <div v-else class="d-flex">
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
import { mapActions, mapState } from "vuex";

export default {
  components: {
    NavBar: defineAsyncComponent(() =>
      import("../components/NavbarDaybook.vue")
    ),
    EntryList: defineAsyncComponent(() =>
      import("../components/EntryList.vue")
    ),
  },
  methods: {
    ...mapActions("journal", ["readEntries"]),
  },
  computed: {
    ...mapState("journal", ["isLoading"]),
  },
  created() {
    this.readEntries();
  },
};
</script>

<style></style>
