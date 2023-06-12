<script>
import { ref } from "vue";
import Error from "../components/Error.vue";
export default {
  components: {
    Error,
  },
  data() {
    return {
      characters: [],
      search: "",
      filterStatus: ref(""),
      prevCharacters: null,
      nextCharacters: null,
      isDead: false,
      isUnknown: false,
      loading: false,
      error: false,
    };
  },
  methods: {
    getCharacters(url) {
      this.loading = true;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          try {
            this.prevCharacters = data.info.prev;
            this.nextCharacters = data.info.next;
            this.characters = data.results;
            this.loading = false;
          } catch {
            this.loading = false;
            this.error = true;
          }
        });
    },
    prev() {
      this.getCharacters(this.prevCharacters);
    },
    next() {
      this.getCharacters(this.nextCharacters);
    },
    handleSearch(src, sts) {
      if (!sts) {
        this.getCharacters(
          `https://rickandmortyapi.com/api/character/?name=${src.toLowerCase()}`
        );
      } else if (!src) {
        this.getCharacters(
          `https://rickandmortyapi.com/api/character/?status=${sts.toLowerCase()}`
        );
      } else {
        this.getCharacters(
          `https://rickandmortyapi.com/api/character/?name=${src.toLowerCase()}&status=${sts.toLowerCase()}`
        );
      }
    },
    handleStatus(status) {
      if (status.toLowerCase() == "dead") {
        return "dead";
      } else if (status.toLowerCase() == "unknown") return "unknown";
      else return "status";
    },
    close() {
      this.error = false;
    },
  },
  mounted() {
    this.getCharacters("https://rickandmortyapi.com/api/character");
  },
};
</script>

<template>
  <main class="center">
    <div class="search center">
      <input
        @keyup.enter="handleSearch(search, filterStatus)"
        v-model="search"
        placeholder="Search Character..."
      />
      <span
        @click="handleSearch(search, filterStatus)"
        class="material-symbols-rounded"
      >
        search
      </span>
    </div>

    <div class="filter">
      <p>Choose Character status:</p>

      <select v-model="filterStatus">
        <option disabled value="">Choose...</option>
        <option>Alive</option>
        <option>Dead</option>
        <option>Unknown</option>
      </select>

      <button @click="handleSearch(search, filterStatus)" class="btn filterBtn">
        FILTER
      </button>
    </div>

    <div v-show="loading">
      <iframe src="https://embed.lottiefiles.com/animation/39133"></iframe>
    </div>

    <Error v-show="error" @close="close" />

    <div class="container" v-show="!loading">
      <div
        class="character"
        v-for="character in characters"
        :key="character.id"
      >
        <img :src="`${character.image}`" alt="" />
        <div class="charInfo">
          <RouterLink :to="`/character/${character.id}`">
            <h2 class="charName">{{ character.name }}</h2>
          </RouterLink>
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

    <div class="moreCharacters">
      <button @click="prev" class="btn prev">
        <span class="material-symbols-rounded center">arrow_back_ios_new</span>
      </button>
      <button @click="next" class="btn next">
        <span class="material-symbols-rounded center">arrow_forward_ios</span>
      </button>
    </div>
  </main>
</template>

<style scoped>
main {
  flex-direction: column;
}

.btn span {
  background: transparent;
}
</style>
