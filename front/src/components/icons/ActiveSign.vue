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
  computed: {
    getViewBox() {
      return signsStore?.getViewBox()
    },
    getPath() {
      return signsStore?.getPath()
    },
    getStyle() {
      return {fill: store?.getDefaultColorBySign()}
    }
  },
}
</script>

<style scoped>
</style>