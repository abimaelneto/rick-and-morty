<script>
export default {
  props: {
    characters: Object,
  },
  data() {
    return {
      character: {},
      episodes: {},
    };
  },
  methods: {
    async getCharacter(url) {
      const res = await fetch(url);
      const data = await res.json();

      const { id, name, status, species, gender, location, episode } = data;
      this.character = {
        Id: id,
        Name: name,
        Status: status,
        Species: species,
        Gender: gender,
        "Last Seen": location.name,
        // Episodes: episode,
      };
    },
    getEpisodes(urls) {
      const promise = fetch(urls);

      promise.all
        .then((res) => res.json())
        .then((data) => {
          const { name, episode, characters } = data.episodes;
          this.person = {
            "Episode name": name,
            "Episode code": episode,
            "Episode characters": characters,
          };
          console.log(data.episodes)
        });
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.getCharacter(`https://rickandmortyapi.com/api/character/${id}`);
  },
};
</script>

<template>
  <div class="center">
    <img
      class="c-image"
      :src="`https://rickandmortyapi.com/api/character/avatar/${character.Id}.jpeg`"
      alt=""
    />
    <table class="table">
      <tr v-for="(value, label) in character" :key="label">
        <th>{{ label }}</th>
        <td>{{ value }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.table {
  margin-top: 50px;
  min-width: 50vw;
  max-width: 90vw;
}

th {
  border-bottom: 1px solid green;
  font-weight: 700;
  text-align: left;
  width: 20vw;
  height: 5vh;
  padding-left: 10px;
  color: rgb(24, 150, 150);
}

td {
  border-bottom: 1px solid green;

  font-weight: 500;
  text-align: left;
  padding-left: 10px;
}
</style>
