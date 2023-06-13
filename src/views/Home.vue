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
      textError: "",
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
            this.textError = "CHARACTER NOT FOUND";
            this.loading = false;
            this.error = true;
          }
        });
    },
    paginate(target) {
      this.getCharacters(
        target == "next" ? this.nextCharacters : this.prevCharacters
      );
    },
    handleSearch() {
      this.getCharacters(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/character/?name=${this.search.toLowerCase()}&status=${this.status.toLowerCase()}`
      );
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
        @keyup.enter="handleSearch"
        v-model="search"
        placeholder="Search Character..."
      />
      <span @click="handleSearch" class="material-symbols-rounded">
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

      <button @click="handleSearch" class="btn filterBtn">FILTER</button>
    </div>

    <div v-show="loading">
      <iframe src="https://embed.lottiefiles.com/animation/39133"></iframe>
    </div>

    <Error v-show="error" @close="close" :textError="textError" />

    <div class="moreCharacters">
      <button
        @click="paginate('prev')"
        class="btn prev"
        :disabled="!prevCharacters"
      >
        <span class="material-symbols-rounded center">arrow_back_ios_new</span>
      </button>
      <button
        @click="paginate('next')"
        class="btn next"
        :disabled="!nextCharacters"
      >
        <span class="material-symbols-rounded center">arrow_forward_ios</span>
      </button>
    </div>

    <div id="characters-list" class="container" v-show="!loading">
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
            :to="`/location-details/${character.location.url.split('/')[5]}`"
          >
            <h3 class="charLocation">{{ character.location.name }}</h3>
          </RouterLink>
        </div>
      </div>
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

#characters-list {
  height: 50vh;
  overflow: auto;
  padding: 5rem;
}
</style>
