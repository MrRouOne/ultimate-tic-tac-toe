<template>
  <header class="header">
    <div class="container">
      <ul class="nav justify-content-end">
        <li class="nav-link link-secondary" @click="restart">Рестарт</li>
        <li class="dropdown nav-link px-2">
          <div class="link-secondary drop" data-bs-toggle="dropdown">
            Размерность поля ({{ currentFieldSize }})
          </div>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li
                v-for="size in possibleFieldSizes"
                class="dropdown-item"
                @click="setFieldSize(size)"
            >{{ size + 'x' + size }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import {store} from "@/stores/store.js";

export default {
  data() {
    return {
      currentFieldSize: '3x3',
      possibleFieldSizes: [2, 3, 4, 5, 6, 7, 8]
    }
  },
  methods: {
    setFieldSize(val) {
      store.setFieldSize(val)
      this.currentFieldSize = (val + 'x' + val)
    },
    restart() {
      store.swapRestart()
    }
  }
}
</script>

<style scoped>
.drop {
  cursor: pointer;

  &::after {
    content: "\25BC"
  }
}

.header {
  padding: 1rem;
  border-bottom: 1px solid gray;
}

li {
  cursor: pointer;
}
</style>