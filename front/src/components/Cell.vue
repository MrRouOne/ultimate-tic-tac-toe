<template>
  <div class="cell" :class="cellClasses">
    <CellSign
        @click="setSign"
        ref="signRef"
        @setClass="setSignedClass"
    />
  </div>
</template>

<script>
import CellSign from "@/components/icons/CellSign.vue";

export default {
  components: {CellSign},
  data() {
    return {
      cellClasses: {}
    }
  },
  emits: ['setValueToField'],
  props: ['index', 'isWin'],
  methods: {
    setSign() {
      if (this.isWin) return

      this.$refs.signRef.setSign();
      this.$emit('setValueToField', this.index)
    },
    setSignedClass() {
      this.cellClasses.signed = true
    }
  },
  watch: {
    isWin() {
      this.cellClasses.blocked = true
    }
  },
}
</script>

<style scoped>
.cell {
  margin: 4px;
  height: 50px;
  width: 50px;
  background-color: rgb(67, 65, 65);
  border-radius: 5px;

  &:not(.signed,.blocked):hover {
    background-color: #fff !important;
    cursor: pointer;
  }
}
</style>
