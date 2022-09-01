<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div class="entry-title d-flex">
      <span class="text-success fs-4 fw-bold">1</span>
      <span class="mx-1 fs-5">Septiembre</span>
      <span class="mx-2 fw-light">2022</span>
    </div>
    <div>
      <button class="btn btn-danger mx-2">
        Borrar
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="btn btn-primary">
        Subir foto
        <i class="fa fa-upload"></i>
      </button>
    </div>
  </div>
  <hr />
  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="¿Qué está pasando en el mundo 2022?"></textarea>
  </div>
  <fab-icon icon="fa-save"></fab-icon>
  <img
    src="https://images.unsplash.com/photo-1662049973637-1d019030406f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    alt="entry-picture"
    class="img-thumbnail"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    FabIcon: defineAsyncComponent(() => import("../components/FabIcon.vue")),
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
  },
  methods: {
    getEntry() {
      const entry = this.getEntryById(this.id);
      console.log(entry);
    },
  },
  created() {
    this.getEntry();
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;
  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
}
</style>
