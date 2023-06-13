<script>
import { stringifyQuery } from "vue-router";

export default {
  props: {
    error: String,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<template>
  <div class="error center">
    <h2 class="title">{{ error.toUpperCase() }}</h2>
    <iframe src="https://embed.lottiefiles.com/animation/39138"></iframe>

    <button @click="close">
      <span class="material-symbols-rounded btn"> close </span>
    </button>
  </div>
</template>

<style scoped>
.error {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.562);
  color: #00ff55;
  text-align: center;
}
h2 {
  background: transparent;
}

button {
  border: none;
  background: none;
  margin-top: 1rem;
}
</style>
