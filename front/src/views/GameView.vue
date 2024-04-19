<template>
  <div class="d-flex flex-column">
    <GameStatus/>
    <MainField/>
  </div>

</template>

<script>
import MainField from "@/components/MainField.vue";
import GameStatus from "@/components/GameStatus.vue";

export default {
  components: {MainField, GameStatus},
}
</script>