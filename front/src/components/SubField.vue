<template>
  <div
      class="subfield"
      :style="subfieldStyle"
      :class="{...subfieldClasses,...getActiveSubFieldClass}"
  >
    <TransitionGroup>
      <div :class="overlayClasses" v-if="isWin" class="subfield_overlay"></div>
      <div class="subfield_overlay_sign" v-if="isWin">
        <SubFieldWinSign :sign="subfield.sign" :subFieldIndex="index"/>
      </div>
    </TransitionGroup>
    <Cell
        v-for="(cell, index) in subfield?.field"
        :key="index"
        :subFieldIndex="index"
        :mainFieldIndex="this.index"
        :isWin="isWin"
        :isActiveSubField="isActiveSubField"
        :isSubHovered="isSubHovered"
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
      overlayClasses: {},
      subfieldClasses: {},
    }
  },
  props: ['index'],
  watch: {
    winner(val) {
      this.subfieldClasses.subfield_nonactive = (val !== null)
    },
    subfield: {
      handler(newVal) {
        if (newVal?.sign === null) return

        this.overlayClasses[`${store.getSignWordBySign(this.subfield.sign)}_win`] = true
      },
      deep: true
    },
    'restart'() {
      this.overlayClasses = {}
      this.subfieldClasses = {}
    },
  },
  computed: {
    restart() {
      return store.restart
    },
    isWin() {
      return this.subfield.sign !== null
    },
    winner() {
      return store.winner
    },
    subfield() {
      return store?.singleField?.[this.index]
    },
    subfieldStyle() {
      return {
        display: 'grid',
        padding: '8px',
        gridTemplateColumns: `repeat(${store.fieldSize}, 2fr)`,
        borderTop: (this.index + 1) > store.fieldSize ? `solid 10px ${this.getBorderColor}` : '',
        borderRight: (this.index + 1) % store.fieldSize !== 0 ? `solid 10px ${this.getBorderColor}` : '',
      }
    },
    getBorderColor() {
      return store.gameWithBot === null ? '#2ebacc' : store.gameWithBot === 'light' ? '#2ecc71' : '#cca72e'
    },
    getActiveSubFieldClass() {
      return {subfield_active: this.isActiveSubField}
    },
    isActiveSubField() {
      return store.getActiveFieldIndex().includes(this.index)
    },
    isSubHovered() {
      return store?.hoveredIndexes?.includes(this.index)
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
