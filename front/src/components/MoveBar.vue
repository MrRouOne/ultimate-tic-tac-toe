<template>
  <div class="move_bar">
    <div class="move_bar_text">Ход игрока</div>
    <ActiveSign/>
  </div>
</template>

<script>
import ActiveSign from "@/components/icons/ActiveSign.vue";

export default {
  components: {ActiveSign},
}
</script>

<style scoped>
.move_bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}
.move_bar_text {
  margin-right: 1rem;
  font-size: 2rem;
}
</style>
