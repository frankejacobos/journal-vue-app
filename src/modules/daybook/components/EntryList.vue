<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar algo"
        v-model="search"
      />
    </div>
    <div class="mt-2 d-flex flex-column">
      <button
        class="btn btn-primary m-3"
        @click="$router.push({ name: 'entry', params: { id: 'new' } })"
      >
        <i class="fa fa-plus-circle"></i>
        Nueva entrada
      </button>
    </div>
    <div class="entry-scrollarea">
      <entry-item
        v-for="entry in entriesByTerm"
        :key="entry.id"
        :entry="entry"
      ></entry-item>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

export default {
  components: {
    EntryItem: defineAsyncComponent(() => import("./EntryItem.vue")),
  },
  computed: {
    ...mapGetters("journal", ["getEntriesByTerm"]),
    entriesByTerm() {
      return this.getEntriesByTerm(this.search);
    },
  },
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style scoped>
.entry-list-container {
  height: calc(100vh - 66px);
}

.entry-scrollarea {
  height: calc(100vh - 64px - 48px);
  overflow: scroll;
}
</style>
