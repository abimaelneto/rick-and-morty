<script>
import Episodes from "../components/Episodes.vue";

export default {
  props: {
    characters: Object,
  },
  components: {
    Episodes,
  },
  data() {
    return {
      character: {},
      episodes: [],
      location: [],
      characterId: this.$route.params.id,
    };
  },
  methods: {
    async getCharacter(url) {
      const res = await fetch(url);
      const data = await res.json();
      this.getEpisodes(data.episode);

      const { id, name, status, species, gender, location } = data;
      this.character = {
        Name: name,
        Status: status,
        Species: species,
        Gender: gender,
        Location: location.name,
        locationId: location.url.split("/")[5],
      };
    },
    getEpisodes(urls) {
      urls.map((url) => {
        fetch(url)
          .then((res) => res.json())
          .then((data) => this.episodes.push(data));
      });
    },
  },
  mounted() {
    this.getCharacter(
      `https://rickandmortyapi.com/api/character/${this.characterId}`
    );
  },
};
</script>

<template>
  <div class="center">
    <img
      class="c-image"
      :src="`https://rickandmortyapi.com/api/character/avatar/${this.characterId}.jpeg`"
      alt=""
    />
    <table class="table">
      <tr>
        <th>Name</th>
        <td>{{ character.Name }}</td>
      </tr>
      <tr>
        <th>Status</th>
        <td>{{ character.Status }}</td>
      </tr>
      <tr>
        <th>Species</th>
        <td>{{ character.Species }}</td>
      </tr>
      <tr>
        <th>Gender</th>
        <td>{{ character.Gender }}</td>
      </tr>

      <tr>
        <th>Last Seen</th>
        <td>
          <RouterLink :to="`/LocationDetails/${character.locationId}`">
            {{ character.Location }}
          </RouterLink>
        </td>
      </tr>
      <tr>
        <th>Episodes</th>
        <td>
          <Episodes :episodes="episodes" />
        </td>
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
