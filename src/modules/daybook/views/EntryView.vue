<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div class="entry-title d-flex align-items-center">
        <span class="text-success fs-4 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-5">{{ month }} {{ year }}</span>
      </div>
      <div>
        <input
          type="file"
          @change="onFileChange"
          ref="imageSelector"
          v-show="false"
          accept="image/*"
        />
        <button class="btn btn-danger mx-2" @click="onDelete">
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary" @click="onSelectImage">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea
        placeholder="¿Qué está pasando en el mundo 2022?"
        v-model="entry.text"
        class="form-control"
        rows="10"
      ></textarea>
    </div>
    <img
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="entry-picture"
      class="img-thumbnail"
    />
    <img
      v-if="localImage"
      :src="localImage"
      alt="entry-picture"
      class="img-thumbnail"
    />
    <fab-icon icon="fa-save" @on:click="onSave"></fab-icon>
  </template>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";
import Swal from "sweetalert2";
import uploadImage from "../helpers/uploadImage";

export default {
  name: "EntryView",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    FabIcon: defineAsyncComponent(() => import("../components/FabIcon.vue")),
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
    };
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    year() {
      const { year } = getDayMonthYear(this.entry.date);
      return year;
    },
  },
  methods: {
    ...mapActions("journal", ["createEntry", "updateEntry", "deleteEntry"]),
    getEntry() {
      const entry = this.getEntryById(this.id);
      if (this.id === "new") {
        this.entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        if (!entry) return this.$router.push({ name: "no-entry" });
        this.entry = entry;
      }
    },
    async onSave() {
      new Swal({
        title: "Espere",
        text: "Guardando información",
        icon: "info",
        allowOutsideClick: false,
      });
      Swal.showLoading();
      const picture = await uploadImage(this.file);
      this.entry.picture = picture;
      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const index = await this.createEntry(this.entry);
        this.$router.push({ name: "entry", params: { id: index } });
      }
      Swal.fire({
        title: "Guardado",
        text: "Se guardó correctamente",
        icon: "success",
      });
      this.localImage = null;
    },
    async onDelete() {
      const { isConfirmed } = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
      });
      if (isConfirmed) {
        Swal.fire({
          title: "Espere",
          text: "Borrando información",
          icon: "info",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        await this.deleteEntry(this.id);
        this.$router.push({ name: "no-entry" });
        Swal.fire({
          title: "Borrado",
          text: "Se borró correctamente",
          icon: "success",
        });
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }
      this.file = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.localImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onSelectImage() {
      this.$refs.imageSelector.click();
    },
  },
  created() {
    this.getEntry();
  },
  watch: {
    id() {
      this.getEntry();
    },
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
