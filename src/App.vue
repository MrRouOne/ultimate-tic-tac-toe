<template>
  <div class="main_app">
    <HeaderView/>
    <GameView/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@/assets/base.css';
import GameView from "@/views/GameView.vue";
import HeaderView from "@/views/HeaderView.vue";

export default {
  components: {HeaderView, GameView},
}
</script>

<style scoped>
.main_app {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
