<template>
  <div class="cell"
       :class="{...cellClasses,...expandAllCellClass,...botMotionClass,...subHoveredClass,...blockedClass}">
    <CellSign
        @mouseover="setHovered(true)"
        @mouseleave="setHovered(false)"
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
  props: ['subFieldIndex', 'mainFieldIndex', 'isWin', 'isActiveSubField', 'isSubHovered'],
  methods: {
    mounted() {
      this.store = store
    },
    setSign() {
      if (this.isWin || store.winner !== null || !this.isActiveSubField || store.isBotMotion) return

      store.setSignToSingleField(this.mainFieldIndex, this.subFieldIndex)
      this.setHovered(false)

      if (store.winner === null && store.gameWithBot !== null) {
        store.isBotMotion = true
        setTimeout(() => {
          store.botMotion()
          store.isBotMotion = false
        }, 500)
      }
    },
    setSignedClass() {
      this.cellClasses.signed = true
    },
    setHovered(val) {
      if (
          this.isActiveSubField
          && (
              Object.keys(this.cellClasses).length === 0
              || Object.values(this.cellClasses).every(value => value === false)
          )
          && !this.botMotionClass.bot_move
      ) {
        store.setHoveredIndexes(this.subFieldIndex, val)
      }
    }
  },
  computed: {
    cell() {
      return store?.singleField?.[this.mainFieldIndex]?.field?.[this.subFieldIndex]
    },
    fillIndexes() {
      return store.getNonActiveFieldIndex()
    },
    expandAllCellClass() {
      return {expand_all_cell: this.isActiveSubField && store.getNonActiveFieldIndex().includes(this.subFieldIndex)}
    },
    botMotionClass() {
      return {bot_move: store.isBotMotion && this.isActiveSubField}
    },
    subHoveredClass() {
      return {sub_hovered: this.isSubHovered && store.winner === null}
    },
    blockedClass() {
      return {blocked: this.isWin || store.winner !== null || !this.isActiveSubField}
    }
  },
  watch: {
    cell: {
      handler(val) {
        if (val?.length === 0) return
        this.$refs.signRef.setSign();
      },
      deep: true
    },
    'store.restart'() {
      this.cellClasses = {}

      this.mounted()
    },
  },
  mounted() {
    this.mounted()
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
