<script>
import Residents from "../components/Residents.vue";

export default {
  components: {
    Residents,
  },
  data() {
    return {
      location: {},
      residents: [],
      locationId: this.$route.params.id,
    };
  },
  methods: {
    getLocations(url) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.getResidents(data.residents);
          this.location = data;
        });
    },
    getResidents(urls) {
      urls.map((url) => {
        fetch(url)
          .then((res) => res.json())
          .then((data) => this.residents.push(data));
      });
    },
  },
  mounted() {
    this.getLocations(
      `https://rickandmortyapi.com/api/location/${this.locationId}`
    );
  },
};
</script>

<template>
  <main>
    <div class="locations">
      <h2>{{ location.name }}</h2>
      <p>Dimension</p>
      <h3>{{ location.dimension }}</h3>
      <h3>Residents</h3>
      <Residents :residents="residents" />
    </div>
  </main>
</template>
