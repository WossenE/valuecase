<script setup lang="ts">
import FileUploadExample from "./FileUploadExample.vue";
import {onBeforeUnmount, onMounted, reactive} from "vue";
import axios from "axios";

const state = reactive<{apiAvailable?: boolean, interval?: number}>({})

onMounted(() => {
  axios.get("/api")
      .then(() => { state.apiAvailable = true })
      .catch(() => { state.apiAvailable = false })

  state.interval = setInterval(() => {
    axios.get("/api")
        .then(() => { state.apiAvailable = true })
        .catch(() => { state.apiAvailable = false })
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(state.interval)
})
</script>

<template>
  <div class="centeringContainer">
    <div class="card">
      <img class="logo" src="src/assets/valuecase_logo_plain_back.png"/>
      <div class="welcome">Tech Challenge – Vue 👀</div>
      <hr/>
      <div>API available: {{ state.apiAvailable === undefined ? '⏳' : state.apiAvailable ? '✅' : '❌'}}</div>

      <template v-if="state.apiAvailable">
        <hr>
        <FileUploadExample />
      </template>
    </div>
  </div>
</template>

<style scoped>
.centeringContainer {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.card {
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  background: white;
  min-width: 30rem;
  max-width: 99%;
}

.welcome {
  font-size: 1.3rem;
}

.logo {
  max-height: 2rem;
}
</style>
