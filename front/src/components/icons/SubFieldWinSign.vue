<template>
  <svg
      :viewBox="getViewBox"
      :width="getWidthOrHeight"
      :height="getWidthOrHeight"
      class="svg-container"
  >
    <path
        :d="getPath"
        :style="{fill: this.getColor}"
    />
  </svg>
</template>

<script>
import {signsStore} from "@/stores/signsStore.js";
import {store} from "@/stores/store.js";

export default {
  data() {
    return {
      store: null,
      path: '',
      viewBox: '',
      multiplier: 56,
      isAnimating: false
    }
  },
  props: ['sign', 'subFieldIndex'],
  computed: {
    getPath() {
      return signsStore?.getPath(this.store?.getSignWordBySign(this.sign));
    },
    getViewBox() {
      return signsStore?.getViewBox(this.store?.getSignWordBySign(this.sign));
    },
    getColor() {
      return this.store?.getDefaultColorBySign(this.store?.getSignWordBySign(this.sign))
    },
    getWidthOrHeight() {
      return store.fieldSize * this.multiplier;
    },
  },
  methods: {
    changeSizeMultiplier() {
      setInterval(() => {
        this.multiplier = this.multiplier === 30 ? 56 : 30;
      }, 1100)
    },
  },
  watch: {
    'store.winIndexes'(val) {
      if (val.length && val.includes(this.subFieldIndex.toString())) {
        this.changeSizeMultiplier()
      }
    }
  },
  mounted() {
    this.store = store
  },
}
</script>

<style scoped>
.svg-container {
  transition: width 1s ease, height 1s ease;
}

</style>