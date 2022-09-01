<template>
  <div class="home-view">
    <h1>Home</h1>
    <p>This is the Home page</p>
    <button @click="goToDayBook" class="btn btn-primary">Go to DayBook</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToDayBook() {
      this.$router.push({ name: "no-entry" });
    },
  },
};
</script>

<style></style>
