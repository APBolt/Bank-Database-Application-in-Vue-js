<template>
  <div class="container-fluid" id="favorite-container">
    <h1 class="text-center text-white p-2">
      List of Favorited Banks with their IFSC Codes
    </h1>
    <h3 v-for="item in favorite_banks" class="text-center favorite-text my-3">
      {{ item }}
    </h3>
  </div>
</template>

<script>
  export default {
    name: 'FavoriteBanks',
    data() {
      return {
        favorite_banks: ''
      }
    },
    created() {
      this.favorite_banks = localStorage.getItem('banks');
      this.favorite_banks = JSON.parse(this.favorite_banks);

    }
  }
</script>

<style scoped>
  #favorite-container {
    background-image: url('../images/red.jpg');
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .favorite-text {
    color: lightcyan;
    font-family: "Open Sans", sans-serif;
    font-weight: 700;
  }
</style>
