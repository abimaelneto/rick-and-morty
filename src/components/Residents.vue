<script>
export default {
  props: {
    residents: Array,
  },
};
</script>
<template>
  <div class="residents" v-for="resident in residents" :key="resident.id">
    <img :src="`${resident.image}`" :alt="`${resident.name}`" />
    <RouterLink :to="`/character/${resident.id}`">
      <h3>{{ resident.name }}</h3>
    </RouterLink>
  </div>
</template>
