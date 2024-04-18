<template>
  <svg :viewBox="getViewBox" :width="getWidthOrHeight" :height="getWidthOrHeight">
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
      signsStore: null,
      path: '',
      viewBox: ''
    }
  },
  props: ['sign'],
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
      return store.fieldSize * 56;
    },
  },
  methods: {},
  watch: {},
  mounted() {
    this.store = store
    this.signsStore = signsStore
  },
}
</script>

<style scoped>
</style>