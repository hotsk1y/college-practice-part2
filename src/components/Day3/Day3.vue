<template>
  <div class='card__wrapper'>
    <div class='card'>
      <div class='title'>Населений пункт</div>
      <select v-model='currentCity' @change='getWarehouses'>
        <option value='' selected disabled hidden>Выберете область</option>
        <option
          v-for='(area, index) in allAreas'
          :key='index'
          :value='area.AreasCenter'
        >
          {{ area.Description }}
        </option>
      </select>
      <label v-if='currentCity && warehouses.length > 0'>
        <div class='title'>Поштове вiддiлення</div>
        <select>
          <option
            v-for='(warehouse, index) in warehouses'
            :key='index'
            :value='warehouse.SettlementRef'
          >
            {{ warehouse.Description }}
          </option>
        </select>
      </label>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      key: 'fd5f973e3ea1e069ce8daa40f5192051',
      allAreas: [],
      warehouses: [],
      currentCity: '',
    };
  },
  mounted() {
    axios
      .post('https://api.novaposhta.ua/v2.0/json/', {
        apiKey: this.key,
        modelName: 'Address',
        calledMethod: 'getAreas',
        methodProperties: {},
      })
      .then(res => {
        this.allAreas = res.data.data;
        console.log(res.data.data);
      });
  },

  methods: {
    getWarehouses() {
      if (this.currentCity) {
        axios
          .post('https://api.novaposhta.ua/v2.0/json/', {
            apiKey: this.key,
            modelName: 'AddressGeneral',
            calledMethod: 'getWarehouses',
            methodProperties: {
              CityRef: this.currentCity,
              FindByString: 'Відділення',
            },
          })
          .then(res => {
            this.warehouses = res.data.data;
          });
      }
    },
  },
};
</script>

<style scoped>
.card__wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.card {
  width: 450px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border: 2px solid #000;
  align-items: center;
  justify-content: center;
}

select {
  width: 300px;
  margin-bottom: 40px;
  padding: 5px;
}

.title {
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 700;
}
</style>
