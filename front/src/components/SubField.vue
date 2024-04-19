<template>

  <div class="subfield" :style="subfieldStyle" :class="{...subfieldClasses,...getActiveSubFieldClass}">
    <TransitionGroup>
      <div :class="overlayClasses" v-if="isWin" class="subfield_overlay"></div>
      <div class="subfield_overlay_sign" v-if="isWin">
        <SubFieldWinSign :sign="winSign" :subFieldIndex="index"/>
      </div>
    </TransitionGroup>
    <Cell
        v-for="(cell, index) in field"
        :key="index"
        :subFieldIndex="index"
        :isWin="isWin"
        :isActiveSubField="isActiveSubField"
        @setValueToField="setValueToField"
    />
  </div>
</template>

<script>
import {store} from "@/stores/store.js";
import Cell from "@/components/Cell.vue";
import SubFieldWinSign from "@/components/icons/SubFieldWinSign.vue";

export default {
  components: {Cell, SubFieldWinSign},
  data() {
    return {
      store: null,
      show: true,
      field: [],
      changedIndex: null,
      isWin: false,
      winSign: null,
      overlayClasses: {},
      subfieldStyle: {},
      subfieldClasses: {},
    }
  },
  props: ['index', 'activeSubFieldIndex'],
  emits: ['setValueToField'],
  watch: {
    winSign() {
      this.overlayClasses[`${store.getSignWordBySign(this.winSign)}_win`] = true
    },
    'store.winner'() {
      this.subfieldClasses.subfield_nonactive = true

    }
  },
  methods: {
    fillStartField() {
      this.field = Array(store.fieldSize * store.fieldSize).fill([])
    },
    setValueToField(index) {
      if (this.field[index].length !== 0) return;

      this.field[index] = store.signToArrays
      this.changedIndex = index
      this.checkWin()
    },
    checkWin() {
      const findSign = this.field[this.changedIndex]
      const winner = store.checkWinOrDraw(this.field, this.changedIndex, findSign)

      if (winner !== 'nothing') {
        this.isWin = true
        const winSign = winner === 'draw' ? store.defaultDrawSign : findSign
        this.winSign = winSign
        this.$emit('setValueToField', this.index, winSign)
      }
    },
    setSubfieldStyle() {
      this.subfieldStyle = {
        display: 'grid',
        padding: '8px',
        gridTemplateColumns: `repeat(${store.fieldSize}, 2fr)`,
        borderTop: (this.index + 1) > store.fieldSize ? 'solid 10px #2ecc71' : '',
        borderRight: (this.index + 1) % store.fieldSize !== 0 ? 'solid 10px #2ecc71' : '',
      }
    }
  },
  mounted() {
    this.fillStartField()
    this.setSubfieldStyle()
    this.store = store
  },
  computed: {
    getActiveSubFieldClass() {
      return {subfield_active: this.isActiveSubField}
    },
    isActiveSubField() {
      return this.activeSubFieldIndex.includes(this.index)
    }
  }
}
</script>

<style scoped>
.subfield {
  position: relative;
}

.subfield_active:not(.subfield_nonactive) .cell:not(.signed,.blocked) {
  transition: background-color 0.5s ease;
  background-color: #b6b4b4;
  cursor: pointer;

}

.subfield_overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}

.subfield_overlay_sign {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.draw_win {
  opacity: 0.7;
  background-color: #a3a313;
}

.circle_win {
  opacity: 0.5;
  background-color: #0e5388;
}

.cross_win {
  opacity: 0.5;
  background-color: #830d0d;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
