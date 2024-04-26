<template>
  <svg :viewBox="getViewBox" width="60" height="60">
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
  props: ['sign'],
  computed: {
    getViewBox() {
      // TODO все на енамы
      return this.sign !== null ? signsStore?.getViewBox(store.getSignWordBySign(this.sign)) : signsStore?.getViewBox()
    },
    getPath() {
      return this.sign !== null ? signsStore?.getPath(store.getSignWordBySign(this.sign)) : signsStore?.getPath()
    },
    getStyle() {
      return {
        fill: this.sign !== null ? store?.getDefaultColorBySign(store.getSignWordBySign(this.sign)) : store?.getDefaultColorBySign()
      }
    }
  },
}
</script>

<style scoped>
</style>