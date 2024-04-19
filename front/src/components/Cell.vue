<template>
  <div class="cell" :class="cellClasses">
    <CellSign
        @click="setSign"
        ref="signRef"
        @setClass="setSignedClass"
        :subFieldIndex="subFieldIndex"
    />
  </div>
</template>

<script>
import CellSign from "@/components/icons/CellSign.vue";
import {store} from "@/stores/store.js";

export default {
  components: {CellSign},
  data() {
    return {
      cellClasses: {},
      store: null,
    }
  },
  emits: ['setValueToField'],
  props: ['subFieldIndex', 'isWin', 'isActiveSubField'],
  methods: {
    setSign() {
      if (this.isWin || store.winner !== null || !this.isActiveSubField) return

      this.$refs.signRef.setSign();
      this.$emit('setValueToField', this.subFieldIndex)
    },
    setSignedClass() {
      this.cellClasses.signed = true
    }
  },
  watch: {
    isWin() {
      this.cellClasses.blocked = true
    },
    'store.winner'() {
      this.cellClasses.blocked = true
    },
    isActiveSubField(val) {
      this.cellClasses.blocked = !val
    }
  },
  mounted() {
    this.store = store
  }
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
