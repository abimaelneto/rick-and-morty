<script>
import { ref } from "vue";
import { apiMixin } from "@/mixins/api";
export default {
  mixins: [apiMixin],
  data() {
    return {
      characters: [],
      search: "",
      filterStatus: ref(""),
      isDead: false,
      isUnknown: false,
      loadingSearch: true,
    };
  },
  methods: {
    getCharacters(url) {
      this.myFetch(url, (data) => {
        try {
          console.log(data.banana);
          this.prev = data.info.prev;
          this.next = data.info.next;
          this.characters = data.results;
        } catch (e) {
          console.error(e);
          this.error = "CHARACTER NOT FOUND";
        }
      });
    },

    handleSearch() {
      this.getCharacters(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/character/?name=${this.search.toLowerCase()}&status=${this.filterStatus.toLowerCase()}`
      );
    },
    getStatusClass(status) {
      const value = status.toLowerCase();
      if (value == "dead") return "dead";
      if (value == "unknown") return "unknown";
      return null;
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

    <Loading :show="loading" />

    <Error v-if="error" @close="close" :error="error" />

    <div class="moreCharacters">
      <button
        @click="paginate('prev', getCharacters)"
        class="btn prev"
        :disabled="!prev"
      >
        <span class="material-symbols-rounded center">arrow_back_ios_new</span>
      </button>
      <button
        @click="paginate('next', getCharacters)"
        class="btn next"
        :disabled="!next"
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
          <h3 :class="['status', getStatusClass(character.status)]">
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
