<script>
export default {
  props: {
    residents: Array,
  },
};
</script>
<template>
  <div class="container">
    <div class="residents" v-for="resident in residents" :key="resident.id">
      <RouterLink :to="`/character/${resident.id}`">
        <img :src="`${resident.image}`" :alt="`${resident.name}`" />
        <h3>{{ resident.name }}</h3>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.residents {
  margin: 2rem;
}

img {
  border-radius: 50%;
}

h3 {
  margin-top: 1rem;
  font-size: 1.5rem;
  color: white;
  transition: all ease 0.3s;
}

h3:hover {
  color: #00ff55;
}
</style>
