<template>
  <svg
      class="svg_container"
      :viewBox="getSvgViewBoxBySign"
      :width="getWidthOrHeight"
      :height="getWidthOrHeight"
  >
    <path
        :d="getSvgPathBySign"
        :style="getStyle"
    />
  </svg>
</template>

<script>
import {store} from "@/stores/store.js";

export default {
  data() {
    return {
      currentMultiplier: 56,
      bigMultiplier: 56,
      littleMultiplier: 30,
    }
  },
  props: ['sign', 'subFieldIndex'],
  computed: {
    winIndexes() {
      return store.getWinIndexes()
    },
    getSvgPathBySign() {
      return store?.getSvgPathBySign(this.sign)
    },
    getSvgViewBoxBySign() {
      return store?.getSvgViewBoxBySign(this.sign)
    },
    getStyle() {
      return {
        fill: store?.getDefaultColorBySign(this.sign)
      }
    },
    getWidthOrHeight() {
      return store.getFieldSize() * this.currentMultiplier
    },
  },
  methods: {
    changeSizeCurrentMultiplier() {
      if (!this.winIndexes.includes(this.subFieldIndex.toString())) return

      setInterval(() => {
        this.currentMultiplier = this.currentMultiplier === this.littleMultiplier ? this.bigMultiplier : this.littleMultiplier
      }, 1100)
    },
  },
  watch: {
    'winIndexes'() {
      this.changeSizeCurrentMultiplier()
    }
  },
  mounted() {
    this.changeSizeCurrentMultiplier()
  }
}
</script>

<style scoped>
.svg_container {
  transition: width 1s ease, height 1s ease;
}

</style>