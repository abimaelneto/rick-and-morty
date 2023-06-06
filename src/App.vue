<script>
import { RouterLink, RouterView } from "vue-router";

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

  <RouterView />
</template>

<style scoped></style>
