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
  emits: ['setValueToSubField'],
  props: ['index', 'isWin'],
  methods: {
    setSign() {
      if (this.isWin) return
      this.$refs.signRef.setSign();
      this.$emit('setValueToSubField', this.index)
    },
    setClass() {
      this.classes.signed = true
    }
  },
  mounted() {
  },
  watch: {
    isWin() {
      this.classes.blocked = true
    }
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

  &:not(.signed,.blocked):hover {
    background-color: #fff !important;
    cursor: pointer;
  }
}
</style>
