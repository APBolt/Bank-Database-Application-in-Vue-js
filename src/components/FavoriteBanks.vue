<template>
  <div class="container">
    <h1 class="text-center text-white bg-dark p-2">
      List of Favorited Banks with their IFSC Codes
    </h1>
    <h3 v-for="item in favorite_banks" class="text-center text-danger my-3">
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
