<template>
  <div class="sub_cell m-1" :class="classes">
    <Sign @click="setSign" ref="signRef" @setClass="setClass"/>
  </div>

</template>

<script>
import Sign from "@/components/icons/Sign.vue";

export default {
  components: {Sign},
  data() {
    return {
      classes: {}
    }
  },
  methods: {
    setSign() {
      this.$refs.signRef.setSign();
    },
    setClass() {
      this.classes.signed = true
    }
  },
  mounted() {
  },
  computed: {},
}
</script>

<style scoped>
.sub_cell {
  height: 60px;
  width: 60px;
  background-color: rgb(67, 65, 65);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(.signed):hover {
    background-color: #fff !important;
    cursor: pointer;
  }
}
</style>
