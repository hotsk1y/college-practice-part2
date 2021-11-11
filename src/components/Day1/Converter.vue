<template>
  <div class="app">
    <div class="card">
      <h1>Converter</h1>
      <input type="number" class="input" v-model="amount">
      <div>
        <p>From: </p>
        <select class="select" @change="fromChange($event)">
          <option value="" selected disabled hidden>Choose here</option>
          <option v-for="i in currencyOptions" :key="i">{{ i }}</option>
        </select>
      </div>
      <div>
        <p>To: </p>
        <select class="select" @change="toChange($event)">
          <option value="" selected disabled hidden>Choose here</option>
          <option v-for="i in currencyOptions" :key="i">{{ i }}</option>
        </select>
      </div>
      <button class="resultBtn" @click="getResult">Result</button>
      <p v-if="result"><b>{{ amount }} {{ fromCurrency }} = {{ result }} {{ toCurrency }}</b></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=a81764e73179ea4d318dee852692a38b&format=1'

export default {
  data() {
    return {
      currencyOptions: [],
      currencyData: {},
      amount: 1,
      fromCurrency: '',
      toCurrency: '',
      result: '',
    }
  },
  mounted() {
    axios.get(`${BASE_URL}`)
      .then((res) => {
        console.log(res.data)
        this.currencyData = res.data.rates
        this.currencyOptions = [res.data.base, ...Object.keys(res.data.rates)]
      })
  },
  methods: {
    fromChange(e) {
      this.fromCurrency = e.target.value
      console.log(e.target.value)
    },
    toChange(e) {
      this.toCurrency = e.target.value
      console.log(e.target.value)
    },
    getResult() {
      if(this.fromCurrency && this.toCurrency) {
        this.result = (this.amount * this.currencyData[this.toCurrency] / this.currencyData[this.fromCurrency]).toFixed(2)
      }
    }
  },
  watch: {
    amount() {
      this.getResult()
    }
  }
}
</script>

<style scoped>
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 300px;
  height: 500px;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

h1, p {
  text-align: center;
  margin-bottom: 15px;
}
p {
  margin-bottom: 2px;
}

.input, .select {
  padding: 5px;
  margin-bottom: 15px;
  width: 150px;
}
.select {
  text-align: center;
}

.resultBtn {
  margin-bottom: 15px;
  padding: 10px;
  cursor: pointer;
}

</style>
