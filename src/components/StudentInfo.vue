<template>
  <div>
    <Modal v-if="modalOpen" :img="student.photo" :toggleModal="toggleModal"/>
    <div class="card">
      <div class="card__photo">
        <img :src="student.photo" alt="student-photo" @click="toggleModal"/>
      </div>
      <div class="card__info">
        <p>{{ student.name }}</p>
        <p>Группа: {{ student.group }}</p>
        <p>Сдал ПР: {{ student.isDonePr ? 'Да' : 'Нет' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import axios from "axios";

export default {
  props: {
    id: "",
  },
  components: {
    Modal,
  },
  data() {
    return {
      student: {},
      studentIsDonePr: false,
      modalOpen: false,
    };
  },
  created() {
    axios
        .get(`http://46.101.212.195:3000/students/${this.id}`)
        .then(({data: student}) => {
          this.student = student;
          this.studentIsDonePr = student.isDonePr
        })
        .then(() => {
          this.studentIsDonePr = this.student.isDonePr
        })
  },
  methods: {
    toggleModal() {
      this.modalOpen = !this.modalOpen ? true : false;
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  border: 3px solid #000;
}

.card__photo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border-right: solid 3px #000;
  padding: 10px;
  cursor: pointer;
}

.card__info p {
  font-weight: 900;
  font-size: 21px;
}
</style>