<template>

  <div class="subfield" :style="subfieldStyle">
    <TransitionGroup>
      <div :class="overlayClasses" v-if="isWin" class="subfield_overlay"></div>
      <div class="subfield_overlay_sign" v-if="isWin">
        <WinSign :sign="winSign"/>
      </div>
    </TransitionGroup>
    <Cell
        v-for="(cell, index) in field"
        :key="index"
        :index="index"
        :isWin="isWin"
        @setValueToField="setValueToField"
    />
  </div>
</template>

<script>
import {store} from "@/stores/store.js";
import Cell from "@/components/Cell.vue";
import WinSign from "@/components/icons/WinSign.vue";

export default {
  components: {Cell, WinSign},
  data() {
    return {
      show: true,
      field: [],
      changedIndex: null,
      isWin: false,
      winSign: null,
      overlayClasses: {},
      subfieldStyle: {},
    }
  },
  props: ['index'],
  watch: {
    winSign() {
      this.overlayClasses[`${store.getSignWordBySign(this.winSign)}_win`] = true
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
        this.winSign = winner === 'draw' ? store.defaultDrawSign : findSign
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
  },
}
</script>

<style scoped>
.subfield {
  position: relative;

  &:hover .cell:not(.signed,.blocked) {
    background-color: #b6b4b4;
    cursor: pointer;
  }
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
