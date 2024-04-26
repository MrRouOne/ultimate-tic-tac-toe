<template>
  <div class="game">
    <GameStatus/>
    <MainField/>
  </div>

</template>

<script>
import MainField from "@/components/MainField.vue";
import GameStatus from "@/components/GameStatus.vue";
import {store} from "@/stores/store.js";

export default {
  components: {MainField, GameStatus},
  mounted() {
    store.setFieldSize()
  }
}
</script>
<style scoped>
.game {
  margin: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>