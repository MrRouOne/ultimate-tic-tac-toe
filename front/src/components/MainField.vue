<template>
  <div :style="mainFieldStyle">
    <SubField
        v-for="(cell, index) in field"
        :key="index"
        :index="index"
        :activeSubFieldIndex="getActiveSubFieldIndex"
        @setValueToField="setValueToField"
    />
  </div>
</template>

<script>
import SubField from "@/components/SubField.vue";
import {store} from "@/stores/store.js";

export default {
  components: {SubField},
  data() {
    return {
      field: [],
      isWin: false,
      changedIndex: null,
    }
  },
  methods: {
    fillStartField() {
      this.field = Array(store.fieldSize * store.fieldSize).fill([])
    },
    setValueToField(index, value) {
      if (this.field[index].length !== 0) return;

      this.field[index] = value
      this.changedIndex = index
      this.checkWin()
    },
    checkWin() {
      const findSign = this.field[this.changedIndex]
      const drawOnly = findSign === store.defaultDrawSign
      const winner = store.checkWinOrDraw(this.field, this.changedIndex, findSign, drawOnly, true)
      if (winner !== 'nothing') {
        this.$emit('setValueToField', this.index)
        this.isWin = true
        const winSign = winner === 'draw' ? store.defaultDrawSign : findSign
        store.setWinner(winSign)
      }
    },
  },
  mounted() {
    this.fillStartField()
  },
  computed: {
    mainFieldStyle() {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${store.fieldSize}, 2fr)`
      };
    },
    getActiveSubFieldIndex() {
      const activeCells = this.field
          .map((subarray, index) => subarray.length === 0 ? index : -1)
          .filter(index => index !== -1);
      return activeCells.includes(store.activeSubfieldIndex) ? [store.activeSubfieldIndex] : activeCells;
    },
  },
}
</script>

<style scoped>
</style>
