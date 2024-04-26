<template>
  <svg
      class="svg_container"
      :viewBox="getViewBox"
      :width="getWidthOrHeight"
      :height="getWidthOrHeight"
  >
    <path
        :d="getPath"
        :style="getStyle"
    />
  </svg>
</template>

<script>
import {signsStore} from "@/stores/signsStore.js";
import {store} from "@/stores/store.js";

export default {
  data() {
    return {
      multiplier: 56,
      bigMultiplier: 56,
      littleMultiplier: 30,
    }
  },
  props: ['sign', 'subFieldIndex'],
  computed: {
    winIndexes() {
      return store.winIndexes
    },
    getPath() {
      //TODO: enum все геттеры
      return signsStore?.getPath(store?.getSignWordBySign(this.sign));
    },
    getViewBox() {
      return signsStore?.getViewBox(store?.getSignWordBySign(this.sign));
    },
    getStyle() {
      return {fill: store?.getDefaultColorBySign(store?.getSignWordBySign(this.sign))}
    },
    getWidthOrHeight() {
      return store.fieldSize * this.multiplier;
    },
  },
  methods: {
    changeSizeMultiplier() {
      setInterval(() => {
        this.multiplier = this.multiplier === this.littleMultiplier ? this.bigMultiplier : this.littleMultiplier;
      }, 1100)
    },
    changeSizeMultiplierIfWinIndexesNotEmpty() {
      if (this.winIndexes.length && this.winIndexes.includes(this.subFieldIndex.toString())) {
        this.changeSizeMultiplier()
      }
    }
  },
  watch: {
    'winIndexes'() {
      this.changeSizeMultiplierIfWinIndexesNotEmpty()
    }
  },
  mounted() {
    this.changeSizeMultiplierIfWinIndexesNotEmpty()
  }
}
</script>

<style scoped>
.svg_container {
  transition: width 1s ease, height 1s ease;
}

</style>