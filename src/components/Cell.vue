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
import CellSign from "@/components/icons/CellSign.vue";
import {store} from "@/stores/store.js";

export default {
  components: {CellSign},
  data() {
    return {
      store: null,
    }
  },
  props: ['subFieldIndex', 'mainFieldIndex', 'isActiveSubField'],
  methods: {
    setSign() {
      if (store.winner !== null || !this.isActiveSubField || store.isBotMotion) return

      store.setSignToSingleField(this.mainFieldIndex, this.subFieldIndex)
      store.swapSign()
      store.activeSubfieldIndex = this.subFieldIndex

      this.setHovered(false)

      if (store.winner === null && store.gameWithBot !== null) {
        store.isBotMotion = true
        setTimeout(() => {
          store.botMotion()
          store.isBotMotion = false
        }, 500)
      }
    },
    setHovered(val) {
      if (
          this.isActiveSubField
          && !store.isBotMotion
          && !this.isSigned
      ) {
        store.setHoveredIndexes(this.subFieldIndex, val)
      }
    }
  },
  computed: {
    cell() {
      return store?.singleField?.[this.mainFieldIndex]?.field?.[this.subFieldIndex]
    },

    isSigned() {
      return !Array.isArray(this.cell)
    },
    isBlocked() {
      return store.winner !== null || !this.isActiveSubField
    },
    isExpandAllCell() {
      return this.isActiveSubField && store.getNonActiveFieldIndex().includes(this.subFieldIndex)
    },
    isBotMove() {
      return store.isBotMotion && this.isActiveSubField
    },
    isSubHovered() {
      return store?.hoveredIndexes?.includes(this.mainFieldIndex) && store.winner === null
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
  watch: {
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
