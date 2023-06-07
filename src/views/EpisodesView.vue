<script>
import Residents from "../components/Residents.vue";

export default {
  components: {
    Residents,
  },
  data() {
    return {
      episode: {},
      residents: [],
      episodeId: this.$route.params.id,
    };
  },
  methods: {
    getEpisode(url) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.episode = data;
          this.getResidents(data.characters);
        });
    },
    getResidents(urls) {
      urls.map((url) => {
        fetch(url)
          .then((res) => res.json())
          .then((data) => this.residents.push(data));
      });
    },
  },
  mounted() {
    // const id = this.$route.params.id;
    this.getEpisode(
      `https://rickandmortyapi.com/api/episode/${this.episodeId}`
    );
  },
};
</script>

<template>
  <main>
    <h2 class="title">Episode: {{ episode.name }}</h2>
    <h3>{{ episode.episode }}</h3>
    <Residents :residents="residents" />
  </main>
</template>

<style scoped>
main {
  text-align: center;
  margin: 2rem;
}

h3 {
  color: #fff;
  font-size: 1.5rem;
}
</style>
