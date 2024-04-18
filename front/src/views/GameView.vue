<template>
  <div class="d-flex flex-column">
    <MoveBar/>
    <MainField/>
  </div>

</template>

<script>
import MainField from "@/components/MainField.vue";
import MoveBar from "@/components/MoveBar.vue";

export default {
  components: {MainField, MoveBar},
}
</script>