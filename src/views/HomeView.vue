<script>
export default {
  data() {
    return {
      characters: [],
      search: "",
      prevCharacters: null,
      nextCharacters: null,
      isDead: false,
      isUnknown: false,
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
    handleStatus(status) {
      if (status.toLowerCase() == "dead") {
        return "dead";
      } else if (status.toLowerCase() == "unknown") return "unknown";
      else return "status";
    },
  },
  mounted() {
    this.getCharacters("https://rickandmortyapi.com/api/character");
  },
};
</script>

<template>
  <main>
    <input class="search" v-model="search" placeholder="Search Character..." />

    <div class="container">
      <div
        class="character"
        v-for="character in filtered()"
        :key="character.id"
      >
        <img :src="`${character.image}`" alt="" />
        <div class="characterInfo">
          <h2 class="name">{{ character.name }}</h2>
          <p class="info italic">{{ character.species }}</p>
          <h3 :class="['status', handleStatus(character.status)]">
            {{ character.status }}
          </h3>
          <p class="italic info">Last Seen</p>
          <RouterLink
            :to="`/LocationDetails/${character.location.url.split('/')[5]}`"
          >
            <h3>{{ character.location.name }}</h3>
          </RouterLink>
        </div>
      </div>
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

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.search {
  background-color: #1e1e1e;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #00ff56;
  padding: 10px;
  color: #00ff56;
}
</style>
