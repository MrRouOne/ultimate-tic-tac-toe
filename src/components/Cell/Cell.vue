<template>
  <div
      class="cell"
      :class="cellClasses"
  >
    <CellSign
        @mouseover="setHovered(true)"
        @mouseleave="setHovered(false)"
        @click="setSign"
        :cell="cell"
    />
  </div>
</template>

<script>
import CellSign from "@/components/Cell/CellSign.vue";
import {store} from "@/stores/store.js";

export default {
  components: {CellSign},
  data() {
    return {}
  },
  props: ['subFieldIndex', 'mainFieldIndex', 'isActiveSubField'],
  methods: {
    setSign() {
      if (store.isWinnerExist() || !this.isActiveSubField || store.getIsBotMotion() || this.isSigned) return

      store.moveInField(this.mainFieldIndex, this.subFieldIndex)

      if (!store.isWinnerExist() && store.isGameWithBot()) {
        store.botMotion()
      }
    },
    setHovered(val) {
      if (
          this.isActiveSubField
          && !store.getIsBotMotion()
          && !this.isSigned
      ) {
        store.setHoveredIndexes(this.subFieldIndex, val)
      }
    }
  },
  computed: {
    cell() {
      return store?.getSingleField(this.mainFieldIndex, this.subFieldIndex)
    },

    isSigned() {
      return !Array.isArray(this.cell)
    },
    isBlocked() {
      return store.isWinnerExist() || !this.isActiveSubField
    },
    isExpandAllCell() {
      return this.isActiveSubField && store.getIndexesByEmptyCondition(false).includes(this.subFieldIndex)
    },
    isBotMove() {
      return store.getIsBotMotion() && this.isActiveSubField
    },
    isSubHovered() {
      return store?.getHoveredIndexes()?.includes(this.mainFieldIndex) && !store.isWinnerExist()
    },

    cellClasses() {
      return {
        signed: this.isSigned,
        blocked: this.isBlocked,
        expand_all_cell: this.isExpandAllCell,
        bot_move: this.isBotMove,
        sub_hovered: this.isSubHovered,
      }
    },
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

  &:not(.signed,.blocked,.bot_move):hover {
    background-color: #fff !important;
    cursor: pointer;
  }
}

.bot_move {
  cursor: default !important;
}

.expand_all_cell:not(.blocked,.signed) {
  background-color: #e1cbae !important;
}

.sub_hovered:not(.signed).blocked {
  transition: background-color 0.5s;
  background-color: #554d49 !important;
}

.sub_hovered:not(.signed,.blocked) {
  transition: background-color 0.5s;
  background-color: #e1c4c4 !important;
}
</style>
