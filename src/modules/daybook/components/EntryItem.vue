<template>
  <div
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: entry.id } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-4 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-5">{{ month }}</span>
      <span class="mx-2 fw-light">{{ year }}</span>
    </div>
    <div class="entry-description">
      {{ shortText }}
    </div>
  </div>
</template>

<script>
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
export default {
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  computed: {
    shortText() {
      return this.entry.text.length > 100
        ? this.entry.text.substr(0, 100) + "..."
        : this.entry.text;
    },
    day() {
      const date = new Date(this.entry.date);
      return date.getDate();
    },
    month() {
      const date = new Date(this.entry.date);
      return months[date.getMonth()];
    },
    year() {
      const date = new Date(this.entry.date);
      return date.getFullYear() + ", " + days[date.getDay()];
    },
  },
};
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
