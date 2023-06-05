<script>
export default {
  data() {
    return {
      character: {},
    };
  },
  methods: {
    async getCharacter(url) {
      const res = await fetch(url);
      const data = await res.json();

      const { name, status, species, gender, origin, episode } = data;
      this.character = {
        Name: name,
        Status: status,
        Espécie: species,
        Genero: gender,
        "Local de Origem": origin,
        Episódio: episode,
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
  <table>
    <tr v-for="(value, label) in character" :key="label">
      <th>{{ label }}</th>
      <td>{{ value }}</td>
    </tr>
  </table>
</template>
