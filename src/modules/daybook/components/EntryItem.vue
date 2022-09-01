<template>
  <div
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: 10 } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-4 fw-bold">1</span>
      <span class="mx-1 fs-5">Septiembre</span>
      <span class="mx-2 fw-light">2022</span>
    </div>
    <div class="entry-description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio magni
      quae accusamus molestiae quidem provident eaque dicta, sint id reiciendis
      nesciunt consequuntur eum repellendus esse, ducimus nemo? Ab, repellat
      laudantium.
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.entry-container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  .entry-description {
    padding: 10px;
    font-size: 14px;
  }
}
</style>
