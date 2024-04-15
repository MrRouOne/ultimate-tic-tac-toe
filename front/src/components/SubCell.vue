<template>
  <div class="sub_cell m-1">
  </div>

</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  },
  computed: {
  },
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

  &:hover {
    background-color: #fff !important;
    cursor: pointer;
  }
}
</style>
