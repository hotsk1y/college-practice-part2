<template>
  <div class="container">

    <div class="newStudent card">
      <p class="card__item"><b>Добавить нового студента</b></p>
      <input v-model="newStudName" class="card__item" placeholder="Student name..." type="text">

      <div class="card__item">
        <span>Сдал(a) / Не сдал(a)</span>
        <input v-model="newIsDonePr" type="checkbox">
      </div>

      <div class="card__item">
        <span class="group">Группа</span>
        <input v-model="newStudGroup" placeholder="Student group..." type="text">
      </div>

      <button @click="addStud">Добавить</button>
    </div>

    <input v-model="search" class="search" placeholder="Student name..." type="text"/>
    <div v-for="st in searchStud()" :key="st._id" class="card">
      <p :class="search && 'bold'">{{ st.name }}</p>
      <p>{{ st.group }}</p>
      <div class="doneCheck">
        <input v-model="st.isDonePr" type="checkbox"/>
        <span>{{ st.isDonePr ? 'Сдал(а)' : 'Не сдал(а)' }}</span>
      </div>
      <button @click="deleteStud(st._id)">Удалить</button>
    </div>
    <p v-if="searchStud().length == 0" class="bold">Результатов не найдено</p>

  </div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      search: '',
      students: [],
      newStudName: '',
      newStudGroup: '',
      newIsDonePr: false,
    }
  },
  mounted() {
    axios.get('http://46.101.212.195:3000/students')
      .then(res => {
        this.students = res.data
      })
  },
  methods: {
    deleteStud(id) {
      this.students = this.students.filter((student) => student._id !== id)
      this.search = ''
    },
    searchStud() {
      if (this.search) {
        return this.students.filter((student) =>
          student.name.toLowerCase()
            .includes(this.search.toLowerCase()),
        )
      }
      return this.students
    },
    addStud() {
      if (this.newStudName.length > 0 && this.newStudGroup.length > 0) {
        const newStudent = {
          _id: Date.now(),
          name: this.newStudName,
          group: this.newStudGroup,
          isDonePr: this.newIsDonePr,
        }
        this.students.push(newStudent)
        this.newStudName = ''
        this.newStudGroup = ''
        this.newIsDonePr = false
      }
    },
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}

.container {
  padding: 20px;
}

.bold {
  font-weight: 900;
}

.search{
  margin-left: 10px;
}

.card {
  border: 2px solid #ccc;
  padding: 10px;
  margin: 10px;
}

.newStudent {
  border: 2px solid red;
  margin: 0 auto;
  width: 500px;
}

.card__item {
  margin-bottom: 10px;
}

.card__item .group {
  margin-right: 10px;
}
</style>
