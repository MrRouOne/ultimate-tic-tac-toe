<template>
  <div :style="mainFieldStyle">
    <SubField
        v-for="(cell, index) in field"
        :key="index"
        :index="index"
    />
  </div>
</template>

<script>
import SubField from "@/components/SubField/SubField.vue";
import {store} from "@/stores/store.js";

export default {
  components: {SubField},
  data() {
    return {}
  },
  computed: {
    field() {
      return store?.getSingleField()
    },
    mainFieldStyle() {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${store.getFieldSize()}, 2fr)`
      };
    },
  },
}
</script>

<style scoped>
</style>
