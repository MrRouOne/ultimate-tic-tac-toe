<template>
  <div :style="mainFieldStyle">
    <SubField
        v-for="(cell, index) in singleField"
        :key="index"
        :index="index"
    />
  </div>
</template>

<script>
import SubField from "@/components/SubField.vue";
import {store} from "@/stores/store.js";

export default {
  components: {SubField},
  data() {
    return {}
  },
  computed: {
    singleField() {
      return store?.singleField
    },
    mainFieldStyle() {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${store.fieldSize}, 2fr)`
      };
    },
  },
}
</script>

<style scoped>
</style>
