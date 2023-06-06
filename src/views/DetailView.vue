<script>
export default {
  props: {
    characters: Object,
  },
  data() {
    return {
      character: {},
    };
  },
  methods: {
    async getCharacter(url) {
      const res = await fetch(url);
      const data = await res.json();

      const { name, status, species, gender, location, image, episode } = data;
      this.character = {
        Name: name,
        Status: status,
        Species: species,
        Gender: gender,
        "Last Seen": location,
        Image: image,
        Episode: episode,
      };
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.getCharacter(`https://rickandmortyapi.com/api/character/${id}`);
  },
};
</script>

<template>
  <main>
    <div v-for="character in characters" >
      <p>{{ Name }}</p>
    </div>
  </main>
</template>
