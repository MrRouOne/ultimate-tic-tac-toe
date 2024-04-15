<template>
  <div class="cell" :style="cellStyle">
    <SubCell
        v-for="(subCell, index) in subField"
        :key="index"
        :fieldSize="fieldSize"
    />
  </div>
</template>

<script>
import SubCell from "@/components/SubCell.vue";

export default {
  components: {SubCell},
  data() {
    return {
      subField: [],
    }
  },
  props: ['fieldSize', 'index'],
  methods: {
    fillStartSubField() {
      for (let i = 0; i < this.fieldSize * this.fieldSize; i++) {
        this.subField.push([])
      }
    }
  },
  mounted() {
    this.fillStartSubField()
  },
  computed: {
    cellStyle() {
      return {
        gridTemplateColumns: `repeat(${this.fieldSize}, 2fr)`,
        borderTop: (this.index + 1) > this.fieldSize ? 'solid 10px #2ecc71' : '',
        borderRight: (this.index + 1) % this.fieldSize !== 0 ? 'solid 10px #2ecc71' : '',
      };
    },
  },
}
</script>

<style scoped>
.cell {
  justify-content: center;
  align-items: center;
  display: grid;
  padding: 8px;

  &:hover .sub_cell {
    background-color: #b6b4b4;
    cursor: pointer;
  }
}
</style>
