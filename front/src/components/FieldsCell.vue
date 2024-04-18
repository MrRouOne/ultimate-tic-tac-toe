<template>
  <div class="cell" :style="cellStyle">
    <div :class="classes" v-if="isWin" class="overlay d-flex justify-content-center align-items-center">
    </div>
    <div class="win_sign" v-if="isWin" :class="winSignClasses">
      <WinSign
          :sign="winSign"
      />
    </div>
    <SubCell
        v-for="(subCell, index) in subField"
        :key="index"
        :index="index"
        :isWin="isWin"
        @setValueToSubField="setValueToSubField"
    />
  </div>
</template>

<script>
import {store} from "@/stores/store.js";
import SubCell from "@/components/SubCell.vue";
import WinSign from "@/components/icons/WinSign.vue";

export default {
  components: {SubCell, WinSign},
  data() {
    return {
      subField: [],
      changedIndex: null,
      isWin: false,
      winSign: null,
      classes: {},
      cellStyle: {},
      winSignClasses: {opacity: 0},
    }
  },
  props: ['index'],
  watch: {
    winSign() {
      this.classes[`${store.getSignWordBySign(this.winSign)}_win`] = true
      this.winSignClasses[`${store.getSignWordBySign(this.winSign)}_win_sign`] = 1
    }
  },
  methods: {
    fillStartSubField() {
      this.subField = Array(store.fieldSize * store.fieldSize).fill([])
    },
    setValueToSubField(index) {
      if (this.subField[index].length !== 0) return;
      this.subField[index] = store.signToArrays
      this.changedIndex = index
      this.checkWin()
    },
    checkWin() {
      const findSign = this.subField[this.changedIndex]
      if (store.checkWin(this.subField, this.changedIndex, findSign)) {
        this.isWin = true
        this.winSign = findSign
      }
    },
    setCellStyle() {
      this.cellStyle = {
        display: 'grid',
        padding: '8px',
        gridTemplateColumns: `repeat(${store.fieldSize}, 2fr)`,
        borderTop: (this.index + 1) > store.fieldSize ? 'solid 10px #2ecc71' : '',
        borderRight: (this.index + 1) % store.fieldSize !== 0 ? 'solid 10px #2ecc71' : '',
      }
    }
  },
  mounted() {
    this.fillStartSubField()
    this.setCellStyle()
  },
  computed: {},
}
</script>

<style scoped>
.cell {
  position: relative;

  &:hover .sub_cell:not(.signed,.blocked) {
    background-color: #b6b4b4;
    cursor: pointer;
  }
}

.overlay {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  z-index: 1;
}

.win_sign {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  z-index: 1;
}

.draw_win {
  background-color: yellow;
}

.circle_win {
  opacity: 0.5;
  transition: opacity 0.5s;
  background-color: #0e5388;
}

.cross_win {
  opacity: 0.5;
  transition: opacity 0.5s;
  background-color: #830d0d;
}

.draw_win_sign {

}

.circle_win_sign {
  opacity: 1;
}

.cross_win_sign {
  opacity: 1;
}
</style>
