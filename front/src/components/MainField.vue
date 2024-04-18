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
import SubField from "@/components/SubField.vue";
import {store} from "@/stores/store.js";

export default {
  components: {SubField},
  data() {
    return {
      field: [],
    }
  },
  methods: {
    fillStartField() {
      this.field = Array(store.fieldSize * store.fieldSize).fill([])
    }
  },
  mounted() {
    this.fillStartField()
  },
  computed: {
    mainFieldStyle() {
      return {
        display:'grid',
        gridTemplateColumns: `repeat(${store.fieldSize}, 2fr)`
      };
    },
  },
}
</script>

<style scoped>
</style>
