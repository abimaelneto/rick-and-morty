<script>
export default {
  data() {
    return {
      characters: {},
      prevCharacters: null,
      nextCharacters: null,
    };
  },
  methods: {
    getCharacters(url) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.prevCharacters = data.info.prev;
          this.nextCharacters = data.info.next;
          this.characters = data.results;
        });
    },
    prev() {
      this.getCharacters(this.prevCharacters);
    },
    next() {
      this.getCharacters(this.nextCharacters);
    },
  },
  mounted() {
    this.getCharacters("https://rickandmortyapi.com/api/character");
  },
};
</script>

<template>
  <main>
    <div class="characters" v-for="character in characters">
      <img :src="`${character.image}`" alt="" />
      <RouterLink :to="`/character/${character.id}`">{{ character.name }}</RouterLink>
      

      <h3>{{ character.species }}</h3>

      <h3>{{ character.status }}</h3>

      <p>Last Seen</p>
      <h3>{{ character.location.name }}</h3>
    </div>
  </main>
  <div class="moreCharacters">
    <button @click="prev">
      <span class="material-symbols-rounded more prev"> chevron_left </span>
    </button>
    <button @click="next">
      <span class="material-symbols-rounded more next"> chevron_right </span>
    </button>
  </div>
</template>

<style scoped>
main {
  display: flex;
}
</style>
