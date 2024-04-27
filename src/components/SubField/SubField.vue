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
import Cell from "@/components/Cell/Cell.vue";
import SubFieldWinSign from "@/components/SubField/SubFieldWinSign.vue";

export default {
  components: {Cell, SubFieldWinSign},
  data() {
    return {}
  },
  props: ['index'],
  computed: {
    subfield() {
      return store?.getSingleField(this.index)
    },
    isActiveSubField() {
      return store.getActiveMainFieldIndexes().includes(this.index)
    },
    isWin() {
      return this.subfield.sign !== null
    },
    getBorderColor() {
      return store.botDifficultyEnum?.[store.getBotDifficulty()].style.color
    },
    subfieldClasses() {
      return {
        subfield_nonactive: store.isWinnerExist(),
        subfield_active: this.isActiveSubField
      }
    },
    subfieldStyle() {
      return {
        display: 'grid',
        padding: '8px',
        gridTemplateColumns: `repeat(${store.getFieldSize()}, 2fr)`,
        borderTop: (this.index + 1) > store.getFieldSize() ? `solid 10px ${this.getBorderColor}` : '',
        borderRight: (this.index + 1) % store.getFieldSize() !== 0 ? `solid 10px ${this.getBorderColor}` : '',
      }
    },
    overlayStyle() {
      return {
        backgroundColor: store.signEnums?.[this.subfield.sign]?.mainFieldStyle?.backgroundColor,
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
