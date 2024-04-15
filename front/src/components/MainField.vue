<template>
  <div class="space">
    <div class="main_field p-2" :style="gridStyle">
      <FieldsCell
          v-for="(cell, index) in mainField"
          :key="index"
          :index="index"
          :fieldSize="fieldSize"
      />
    </div>
  </div>

</template>

<script>
import FieldsCell from "@/components/FieldsCell.vue";

export default {
  components: {FieldsCell},
  data() {
    return {
      fieldSize: 3,
      mainField: [],
    }
  },
  methods: {
    fillStartField() {
      for (let i = 0; i < this.fieldSize * this.fieldSize; i++) {
        this.mainField.push([])
      }
    }
  },
  mounted() {
    this.fillStartField()
  },
  computed: {
    gridStyle() {
      return {gridTemplateColumns: `repeat(${this.fieldSize}, 2fr)`,};
    },
  },
}
</script>

<style scoped>
.main_field {
  display: grid;
  border-radius: 15px;
}

</style>
