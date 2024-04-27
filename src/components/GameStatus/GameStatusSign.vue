<template>
  <svg
      class="game_status_sign"
      :viewBox="getSvgViewBoxBySign"
      width="60"
      height="60"
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
  computed: {
    getSvgViewBoxBySign() {
      return store.getSvgViewBoxBySign(store.isWinnerExist() ? store.getWinner() : store.getCurrentSign())
    },
    getSvgPathBySign() {
      return store.getSvgPathBySign(store.isWinnerExist() ? store.getWinner() : store.getCurrentSign())
    },
    getStyle() {
      return {
        fill: store.getDefaultColorBySign(store.isWinnerExist() ? store.getWinner() : store.getCurrentSign())
      }
    },
  },
}
</script>

<style scoped>
.game_status_sign {
  margin-left: 1rem;
}
</style>