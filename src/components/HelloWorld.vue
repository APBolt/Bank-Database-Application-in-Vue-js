<template>
  <div class="container-fluid">
    <h1 class="text-center text-primary">
      Bank Search Application
    </h1>

    <div class="container" id="bank-search-container">
      <h3 class="text-danger m-2">
        Search Form
      </h3>

      <div class="row my-3">
        <div class="col-sm-6 row">
          <div class="form-group col-sm-6">
            <label for="city">Select City</label>
            <select v-model="city_name" class="form-control" id="city">
              <option>MUMBAI</option>
              <option>PUNE</option>
              <option>NEW DELHI</option>
              <option>BANGALORE</option>
              <option>NAGPUR</option>
              <option>LUCKNOW</option>
            </select>
          </div>

          <div class="col-sm-6 text-center my-4">
            <button class="btn btn-warning" @click="getOrLoadBankData">
              Update City
            </button>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="form-group">
            <label for="pagination_size">Number of Results per Page</label>
            <select v-model="pages" class="form-control" id="pagination_size">
              <option>10</option>
              <option>25</option>
              <option>40</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
        </div>

      </div>
      <div class="container">

        <div v-if="saved_banks_local" class="container p-2 bg-danger rounded text-white m-3">
          <h3 class="text-center">
            You have {{ saved_banks_local.length }} Favorite Banks.
          </h3>
          <router-link to="/favorite" tag="h5" class="favorite-link">
            View Favorite Banks
          </router-link>
        </div>

        <h3 v-else class="text-center text-warning">
          No banks Favorited Just yet
        </h3>
      </div>
      <div class="container text-center my-4 p-2" id="search_box_container">
        <div class="form-row">
          <div class="col-sm-2">
            <label for="search_text">Search here</label>
          </div>
          <div class="col-sm-8">
            <input type="text" v-model="search_text" class="form-control" id="search_text" placeholder="Search..">
          </div>
        </div>

        <div class="container-fluid my-5" id="table-container">
          <table class="table table-striped">
            <thead>
            <tr>
              <th>IFSC</th>
              <th>Bank Name</th>
              <th>City</th>
              <th>District</th>
              <th>Address</th>
              <th>Favorite</th>
              <th>View Details</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="each_result in bankResults">
              <td>{{ each_result.ifsc }}</td>
              <td>{{ each_result.bank_name }}</td>
              <td>{{ each_result.city }}</td>
              <td>{{ each_result.district }}</td>
              <td>{{ each_result.address }}</td>
              <td>
                <button v-if="saved_banks_local && saved_banks_local.includes(each_result.ifsc)"
                        class="btn btn-danger m-1" @click="localRemoveBank(each_result.ifsc, each_result.bank_name)">
                  Remove
                </button>

                <button v-else class="btn-success btn m-1 " @click="localSaveBank(each_result.ifsc)">
                  Favorite
                </button>
              </td>
              <td>
                <button class="btn-warning btn" @click="showDetail(each_result)">
                  Details
                </button>
              </td>
            </tr>
            </tbody>
          </table>

          <div v-if="results.length > 0" class="container m-2 p-2 text-center">
            <paginate
              :page-count="20"
              :page-range="3"
              :margin-pages="2"
              :click-handler="nextPage"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :container-class="'pagination'"
              :page-class="'page-item'">
            </paginate>
          </div>
          <div v-else class="container text-center mb-4">
            <ring-loader
              loading="loading" size="200px" color="#000" class="ring">

            </ring-loader>
          </div>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
import RingLoader from 'vue-spinner/src/RingLoader'
import Paginate from 'vuejs-paginate'
import axios from 'axios';
import BankDetailComponent from './BankDetail';

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      results: [],
      pages: 10,
      search_text: '',
      city_name: 'MUMBAI',
      current_index: 0,
      saved_banks_local: [],
    }
  },
  computed: {
    bankResults() {
      return this.results.slice(this.current_index, this.current_index + this.pages)
        .filter((value) => {
        return (value.address.match(this.search_text.toUpperCase()) ||
                value.bank_name.match(this.search_text.toUpperCase()) ||
                value.ifsc.match(this.search_text.toUpperCase()));
      })
    },
    isSaved(ifsc_code) {
      if(this.saved_banks_local.includes(ifsc_code))
        return 'Remove';
      else
        return 'Favorite';
    }
  },
  components: {
    BankDetailComponent,
    Paginate,
    RingLoader,
  },
  methods: {
    getOrLoadBankData() {
      const cached_data = localStorage.getItem('api_data');
      const cached_url = localStorage.getItem('cached_url');

      const current_url = 'https://vast-shore-74260.herokuapp.com/banks?city=' + this.city_name;

      // Loading data from the url to be cached for the first time
      if(current_url !== cached_url)
      {
        localStorage.setItem('cached_url', current_url);
        axios.get(current_url)
          .then((response) => {
            this.results = response.data;
            localStorage.setItem('api_data', JSON.stringify(response.data));
          })
      }
      else {
        const api_Data = localStorage.getItem('api_data');
        this.results = JSON.parse(api_Data);
      }

    },
    showDetail(bank) {
      this.$router.push({name: 'detail', params: { passed_bank: bank, ifscCode: bank.ifsc  }});
    },
    prevPage() {

    },
    nextPage(page_no) {
      console.log('Next page method called..', page_no);
      this.current_index += this.pages;
    },
    saveBank(bank_ifsc) {

    },
    localSaveBank(bank_ifsc, bank_name) {
      if(this.saved_banks_local)
      {
        if(!(this.saved_banks_local.includes(bank_ifsc)))
          this.saved_banks_local.push(bank_ifsc);
      }
      else {
        this.saved_banks_local = [];
        this.saved_banks_local.push(bank_ifsc);
        localStorage.setItem('banks', JSON.stringify(this.saved_banks_local));
      }
    },
    localRemoveBank(bank_ifsc) {
      if(this.saved_banks_local)
      {
        let remove_index = this.saved_banks_local.indexOf(bank_ifsc);
        this.saved_banks_local.splice(remove_index, 1);
      }
    },
    fun() {
      console.log('Pagination method launched..');
    }
  },
  filters: {

  },
  destroyed() {

  },
  mounted() {
    this.getOrLoadBankData();
    this.saved_banks_local = JSON.parse(localStorage.getItem('banks'));
  },
  updated() {
    localStorage.setItem('banks', JSON.stringify(this.saved_banks_local));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  #table-container {
    width: 100%;
    background-color: mintcream;

    border-radius: 1.5rem;
  }

  .table-striped {
  }

  .detail-link:hover {
    color: darkred;
    cursor: pointer;
  }

  .favorite-link {
    color: lightcyan;
    font-family: "Segoe UI Black";
    font-size: 1.5rem;
    transition: all 0.4s ease-out;
  }

  .favorite-link:hover {
    cursor: pointer;
    color: coral;
    font-size: 2rem;
    transition: all 0.4s ease-in;
  }

  .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
  }
  .pagination > li {
    display: inline;
  }
  .pagination > li > a,
  .pagination > li > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: azure;
    text-decoration: none;
    background-color: #f44242;
    border: 2px solid #ddd;
  }

  .ring {
    margin-left: 40%;
  }

</style>
