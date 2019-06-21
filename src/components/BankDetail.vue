<template>
  <div class="container">
    <h1 class="text-success text-center">Details for the Bank with IFSC Code
      <span class="ifsc">{{ passed_bank.ifsc }}</span>
    </h1>

    <div class="container">
      <div class="row m-2">
        <div class="col-sm-4">
          <h5>Branch ID</h5>
        </div>
        <div class="col-sm-8">
          {{ passed_bank.bank_id }}
        </div>
      </div>

      <div class="row m-2">
        <div class="col-sm-4">
          <h5>Bank Name</h5>
        </div>
        <div class="col-sm-8">
          {{ passed_bank.bank_name }}
        </div>
      </div>

      <div class="row m-2">
        <div class="col-sm-4">
          <h5>Branch</h5>
        </div>
        <div class="col-sm-8">
          {{ passed_bank.branch }}
        </div>
      </div>

      <div class="row m-2">
        <div class="col-sm-4">
          <h5>Address</h5>
        </div>
        <div class="col-sm-8">
          {{ passed_bank.address }}
        </div>
      </div>

      <div class="row m-2">
        <div class="col-sm-4">
          <h5>City</h5>
        </div>
        <div class="col-sm-8">
          {{ passed_bank.city }}
        </div>
      </div>

      <div class="row m-2">
        <div class="col-sm-4">
          <h5>District</h5>
        </div>
        <div class="col-sm-8">
          {{ passed_bank.district }}
        </div>
      </div>

      <div class="row m-2">
        <div class="col-sm-4">
          <h5>State</h5>
        </div>
        <div class="col-sm-8">
          {{ passed_bank.state }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BankDetail',
    props: {
      passed_bank: {
        required: true,
        type: Object
      }
    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
  }
</script>

<style scoped>
  .ifsc {
    font-family: "Segoe UI Semibold", sans-serif;
    font-size: 2rem;
    color: crimson;
  }
</style>
