<script>
export default {
  data() {
    return {
      characters: [],
      search: "",
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
    filtered() {
      if (!this.search) return this.characters;

      const filter = [];
      for (const character of this.characters) {
        if (character.name.toLowerCase().includes(this.search.toLowerCase())) {
          filter.push(character);
        }
      }
      return filter;
    },
  },
  mounted() {
    this.getCharacters("https://rickandmortyapi.com/api/character");
  },
};
</script>

<template>
  <main>
    <input v-model="search" placeholder="Search Character..." />

    <div class="character" v-for="character in filtered()" :key="character.id">
      <img :src="`${character.image}`" alt="" />
      <h2>{{ character.name }}</h2>

      <h3>{{ character.species }}</h3>

      <h3>{{ character.status }}</h3>

      <p>Last Seen</p>
      <RouterLink
        :to="`/LocationDetails/${character.location.url.split('/')[5]}`"
      >
        <h3>{{ character.location.name }}</h3>
      </RouterLink>
    </div>
    <div class="item error" v-if="this.search && !filtered().length">
      <p>No results found!</p>
    </div>

    <div class="moreCharacters">
      <button @click="prev">
        <span class="material-symbols-rounded more prev"> chevron_left </span>
      </button>
      <button @click="next">
        <span class="material-symbols-rounded more next"> chevron_right </span>
      </button>
    </div>
  </main>
</template>

<style scoped></style>
