<template>
  <div class="game_status">
    <div class="game_status_text">
      {{ getStatusText }}
    </div>
    <GameStatusSign v-if="!isDraw"/>
  </div>
</template>

<script>
import GameStatusSign from "@/components/GameStatus/GameStatusSign.vue";
import {store} from "@/stores/store.js";

export default {
  components: {GameStatusSign},
  computed: {
    getStatusText() {
      const values = {
        null: 'Ход игрока',
        [store.signEnums.draw.word]: 'Ничья',
        [store.signEnums.cross.word]: 'Победил',
        [store.signEnums.circle.word]: 'Победил',
      }
      return values[store.getWinner()]
    },
    isDraw() {
      return store.getWinner() === store.signEnums.draw.word
    },
  },
}
</script>

<style scoped>
.game_status {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.game_status_text {
  font-size: 2rem;
}
</style>
