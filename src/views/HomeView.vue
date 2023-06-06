<script>
export default {
  props: {
    characters: Object,
  },
  data() {
    return {
      characterId: this.$props.characters.id,
    };
  },
  methods: {
    prev() {
      this.$emit("prev");
    },
    next() {
      this.$emit("next");
    },
  },
};
</script>

<template>
  <main>
    <div class="characters" v-for="character in characters">
      <img :src="`${character.image}`" alt="" />
      <h2>{{ character.name }}</h2>

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
