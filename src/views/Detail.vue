<script>
import EpisodesList from "../components/EpisodesList.vue";

export default {
  props: {
    characters: Object,
  },
  components: {
    EpisodesList,
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
      `${import.meta.env.VITE_API_BASE_URL}/character/${this.characterId}`
    );
  },
};
</script>

<template>
  <div class="contentChar">
    <img
      class="char-image"
      :src="`https://rickandmortyapi.com/api/character/avatar/${this.characterId}.jpeg`"
      alt=""
    />
    <table class="table tabContent">
      <tr>
        <th>Name</th>
        <td class="nameChar">{{ character.Name }}</td>
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
          <RouterLink
            class="tabContent charLocation"
            :to="`/location-details/${character.locationId}`"
          >
            {{ character.Location }}
          </RouterLink>
        </td>
      </tr>

      <tr>
        <th>Episodes</th>
        <div class="line">
          <td class="episodes">
            <EpisodesList :episodes="episodes" />
          </td>
        </div>
      </tr>
    </table>
  </div>
</template>

<style scoped>
th {
  font-weight: 500;
  text-align: left;
  width: 20vw;
  height: 5vh;
  padding-left: 10px;
  font-style: italic;
  color: #888888;
  font-size: 1.2rem;
}

td {
  font-weight: 700;
  text-align: left;
  padding-left: 10px;
  font-size: 1.3rem;
}
</style>
