<template>
  <div
      class="subfield"
      :class="subfieldClasses"
      :style="subfieldStyle"
  >
    <TransitionGroup>
      <div
          class="subfield_overlay"
          :style="overlayStyle"
          v-if="isWin"
      />
      <div
          class="subfield_overlay_sign"
          v-if="isWin"
      >
        <SubFieldWinSign
            :sign="subfield.sign"
            :subFieldIndex="index"
        />
      </div>
    </TransitionGroup>
    <Cell
        v-for="(cell, index) in subfield?.field"
        :key="index"
        :subFieldIndex="index"
        :mainFieldIndex="this.index"
        :isActiveSubField="isActiveSubField"
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
    return {}
  },
  props: ['index'],
  computed: {
    subfield() {
      return store?.singleField?.[this.index]
    },

    isActiveSubField() {
      return store.getActiveFieldIndex().includes(this.index)
    },
    isWin() {
      return this.subfield.sign !== null
    },
    getBorderColor() {
      // TODO: из енама
      return store.gameWithBot === null ? '#2ebacc' : store.gameWithBot === 'light' ? '#2ecc71' : '#cca72e'
    },
    subfieldClasses() {
      return {
        subfield_nonactive: store.winner !== null,
        subfield_active: this.isActiveSubField
      }
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
    overlayStyle() {
      return {
        // TODO: из енама
        backgroundColor: this.subfield.sign === store.defaultDrawSign ? 'rgba(163,163,19,0.7)' : this.subfield.sign === store.defaultCircleSign ? 'rgba(14,83,136,0.5)' : this.subfield.sign === store.defaultCrossSign ? 'rgba(131,13,13,0.5)' : '',
      }
    },
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
