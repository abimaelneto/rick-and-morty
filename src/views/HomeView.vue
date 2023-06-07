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
  <main class="center">
    <input class="search" v-model="search" placeholder="Search Character..." />

    <div class="container">
      <div
        class="character"
        v-for="character in filtered()"
        :key="character.id"
      >
        <img :src="`${character.image}`" alt="" />
        <div class="charInfo">
          <h2 class="charName">{{ character.name }}</h2>
          <p class="info italic">{{ character.species }}</p>
          <h3 :class="['status', handleStatus(character.status)]">
            {{ character.status }}
          </h3>
          <p class="italic info">Last Seen</p>
          <RouterLink
            :to="`/LocationDetails/${character.location.url.split('/')[5]}`"
          >
            <h3 class="charLocation">{{ character.location.name }}</h3>
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="item error" v-if="this.search && !filtered().length">
      <p>No results found!</p>
    </div>

    <div class="moreCharacters">
      <button @click="prev" class="more prev">
        <span class="material-symbols-rounded center">arrow_back_ios_new</span>
      </button>
      <button @click="next" class="more next">
        <span class="material-symbols-rounded center">arrow_forward_ios</span>
      </button>
    </div>
  </main>
</template>

<style scoped>
main {
  flex-direction: column;
}

.search {
  background-color: #1e1e1e;
  margin-top: 2rem;
  border-radius: 5px;
  border: 1px solid #00ff56;
  padding: 1rem 2rem;
  color: #00ff56;
}
.more {
  border: 1px solid #00ff55;
  cursor: pointer;
  margin: 0 1rem 2rem 1rem;
  font-weight: bold;
  color: #00ff55;
  padding: 1rem;
  font-size: 2rem;
  transition: all ease 0.3s;
}

.more:hover {
  background-color: #00ff55;
  color: #1e1e1e;

}
.more span {
  background: transparent;
}
</style>
