<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input type="text" class="form-control" placeholder="Buscar algo" />
    </div>
    <div class="entry-scrollarea">
      <entry-item v-for="item in 100" :key="item"></entry-item>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    EntryItem: defineAsyncComponent(() => import("./EntryItem")),
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
