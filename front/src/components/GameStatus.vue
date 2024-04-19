<template>
  <div class="game_status">
    <div
        class="game_status_text"
        :style="{marginRight: !isDraw ? '1rem' : ''}"
    >{{ getStatusText }}
    </div>
    <GameStatusSign
        v-if="!isDraw"
        :sign="getWinnerSign"
    />
  </div>
</template>

<script>
import GameStatusSign from "@/components/icons/GameStatusSign.vue";
import {store} from "@/stores/store.js";

export default {
  components: {GameStatusSign},
  computed: {
    getStatusText() {
      const values = {
        null: 'Ход игрока',
        [store.defaultDrawSign]: 'Ничья',
        [store.defaultCrossSign]: 'Победил',
        [store.defaultCircleSign]: 'Победил',
      }
      return values[store.winner]
    },
    getWinnerSign() {
      return store.winner === store.defaultDrawSign ? '' : store.winner
    },
    isDraw() {
      return store.winner === store.defaultDrawSign
    }
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
