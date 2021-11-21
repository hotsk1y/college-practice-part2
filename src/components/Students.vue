<template>
  <div class='container' :class="getTheme === 'dark' ? 'dark' : 'standart'">

    <div>
      <input
        type="radio"
        name="theme"
        :checked="getTheme === 'default'"
        @change="setTheme('default')"
      />Стандартная
      <input
        type="radio"
        name="theme"
        :checked="getTheme === 'dark'"
        @change="setTheme('dark')"
      />Тёмная
    </div>

    <div class='newStudent card'>
      <p v-if='!isEditing' class='card__item'><b>Добавить нового студента</b></p>
      <p v-if='isEditing' class='card__item'><b>Обновить студента</b></p>
      <input v-model='newStudName' class='card__item' placeholder='Student name...' type='text'>

      <div class='card__item'>
        <span>Сдал(a) / Не сдал(a)</span>
        <input v-model='newIsDonePr' type='checkbox'>
      </div>

      <div class='card__item'>
        <span class='group'>Группа</span>
        <input v-model='newStudGroup' placeholder='Student group...' type='text'>
      </div>

      <button v-if='!isEditing' @click='addStud'>Добавить</button>
      <button v-if='isEditing' @click='updateStudent'>Применить</button>
    </div>

    <input v-model='search' class='search' placeholder='Student name...' type='text' />
    <div v-for='st in searchStud()' :key='st._id' class='card'>
      <router-link :to="`/student-info/${st._id}`">
        <p>{{ st.name }}</p>
      </router-link>
      <p>{{ st.group }}</p>
      <div class='doneCheck'>
        <input v-model='st.isDonePr' type='checkbox' />
        <span>{{ st.isDonePr ? 'Сдал(а)' : 'Не сдал(а)' }}</span>
      </div>
      <button @click='deleteStud(st._id)' class='editBtn' >
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/OOjs_UI_icon_trash.svg/1200px-OOjs_UI_icon_trash.svg.png' alt=''>
      </button>
      <button @click='updateForm(st)' class='editBtn'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Black_pencil.svg/600px-Black_pencil.svg.png' alt=''>
      </button>
    </div>
    <p v-if='searchStud().length == 0' class='bold'>Результатов не найдено</p>

    <p>Всего студентов: {{ studentsCount }}</p>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      search: '',
      students: [],
      newStudName: '',
      newStudGroup: '',
      newIsDonePr: false,
      studId: null,
      isEditing: false,
    };
  },
  mounted() {
    axios.get('http://46.101.212.195:3000/students')
        .then(res => {
          this.students = res.data;
        })
        .then(() => this.$store.commit("setCount", this.students.length));
  },
  methods: {
    deleteStud(id) {
      axios
          .delete(`http://46.101.212.195:3000/students/${id}`)
          .then(() => {
            this.students = this.students.filter(student => student._id !== id);
          });
    },
    searchStud() {
      if (this.search) {
        return this.students.filter((student) =>
            student.name.toLowerCase()
                .includes(this.search.toLowerCase()),
        );
      }
      return this.students;
    },
    addStud() {
      if (this.newStudName.length > 0 && this.newStudGroup.length > 0) {
        const newStudent = {
          name: this.newStudName,
          group: this.newStudGroup,
          isDonePr: this.newIsDonePr,
        };
        axios
            .post('http://46.101.212.195:3000/students', newStudent)
            .then(({ data }) => this.students.push(data));
        this.newStudName = '';
        this.newStudGroup = '';
        this.newIsDonePr = false;
      }
    },
    updateForm(student) {
      this.studId = student._id;
      this.newStudName = student.name;
      this.newStudGroup = student.group;
      this.newIsDonePr = student.isDonePr;
      this.isEditing = true;
      scrollTo(0, 0);
    },
    updateStudent() {
      const updatedStudent = {
        _id: this.studId,
        name: this.newStudName,
        group: this.newStudGroup,
        isDonePr: this.newIsDonePr,
      };
      axios
          .put(`http://46.101.212.195:3000/students/${this.studId}`, updatedStudent)
          .then(() => {
            this.students = this.students.map((student) =>
                this.studId === student._id ? updatedStudent : student,
            );
          });
      this.newStudName = '';
      this.newStudGroup = '';
      this.newIsDonePr = false;
      this.isEditing = false;
    },

    setTheme (theme) {
      this.$store.commit("setTheme", theme);
    },
  },

  computed: {
    studentsCount () {
      return this.$store.getters.getCount;
    },

    getTheme () {
      return this.$store.getters.getTheme;
    },

    getCurrentUser() {
      return this.$store.getters.getUser;
    },
  }
};
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
.search {
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
.editBtn {
  cursor: pointer;
  margin-right: 5px;
}
.editBtn img {
  width: 20px;
  height: 20px;
}

.dark {
  background: #333;
  color: #fff;
}
.dark a {
  color: #fff;
}

.standart {
  background: #fff;
}
</style>
