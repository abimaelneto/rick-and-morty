<script>
import { RouterLink, RouterView } from "vue-router";
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
  <header>
    <RouterLink to="/"
      ><img
        class="logo"
        src="../src/assets/images/rick-and-morty.png"
        alt="Logo"
    /></RouterLink>
  </header>

  <RouterView :characters="characters" @prev="prev" @next="next" />
</template>

<style scoped></style>
