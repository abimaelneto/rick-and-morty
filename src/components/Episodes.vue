<script>
import { RouterLink } from "vue-router";

export default {
  props: {
    episodes: Array,
  },
  components: { RouterLink },
};
</script>

<template>
  <div class="episodes" v-for="episode in episodes" :key="episode.id">
    <RouterLink :to="`/episode/${episode.id}`">
      <h3>{{ episode.name }}</h3>
    </RouterLink>
  </div>
</template>

<style scoped>

h3:hover {
  color: #00ff55;
}
</style>
