<template>
  <div class="bg-gray-900 flex">
    <Sidebar />
    <div class="flex flex-col w-full p-6">
      <header class="mb-4 pt-4">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-2xl font-bold text-white">Edit Quiz</h2>
          <span class="text-white">{{ currentDate }}</span>
        </div>
        <hr class="border-gray-300">
      </header>
      <main class="flex-grow bg-gray-900 p-6 rounded-lg shadow-lg">
        <div class="overflow-x-auto relative rounded-xl drop-shadow-md mt-8">
          <p class="text-white text-2xl font-bold mb-4">Pilihan Kuis</p>
          <table class="w-full text-sm text-left text-gray-400">
            <thead class="text-xs text-white uppercase bg-gray-800">
              <tr>
                <th scope="col" class="py-3 px-6">Kuis</th>
                <th scope="col" class="py-3 px-6 text-center">Jumlah Kuis</th>
                <th scope="col" class="py-3 px-6 text-center">Jumlah Soal</th>
                <th scope="col" class="py-3 px-6 text-center">Option</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(quiz, index) in quizzes" :key="index" class="bg-gray-800 border-b border-gray-700">
                <td class="py-3 px-6 flex items-center">
                  <img :src="quiz.logo" :alt="'Logo ' + quiz.name" class="w-8 h-8 mr-3">
                  <span class="text-white font-bold">{{ quiz.name }}</span>
                </td>
                <td class="text-white font-bold py-3 px-6 text-center">{{ quiz.numQuizzes }}</td>
                <td class="text-white font-bold py-3 px-6 text-center">{{ quiz.numQuestions }}</td>
                <td class="py-3 px-6 text-center relative">
                  <button @click="toggleDropdown(index)" class="text-white hover:text-gray-400">
                    &#8942;
                  </button>
                  <ul v-if="dropdownOpen === index" class="absolute bg-gray-800 rounded-lg shadow-md w-32 z-10 drop-shadow-md">
                    <li @click="openModal(quiz.name)" class="text-white px-4 py-2 cursor-pointer hover: hover:bg-gray-900 hover:rounded-md">Tambah Kuis</li>
                    <li class="text-white px-4 py-2 cursor-pointer hover:bg-gray-900 hover:rounded-md">Hapus Kuis</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="isModalOpen" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto">
          <div class="bg-gray-800 rounded-lg p-6 w-[70%] max-h-[75vh] overflow-y-auto relative flex flex-col">
            <div class="flex-grow">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-white">{{ currentQuiz }}</h3>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-3xl">
                  &times;
                </button>
              </div>
              <div v-for="(question, index) in questions" :key="index" class="mb-2">
                <input v-model="question.questionText" type="text" class="w-full p-2 border border-gray-500 rounded mt-2 bg-gray-700 text-white" placeholder="Masukkan Soal">
                <div class="flex flex-col space-y-2 mt-2">
                  <label class="flex items-center" v-for="(option, oIndex) in question.options" :key="oIndex">
                    <input type="radio" class="mr-2" :name="'answer-' + index" :value="oIndex">
                    <input v-model="option.text" type="text" class="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white" :placeholder="'Opsi ' + (oIndex + 1)">
                  </label>
                  <p class="text-gray-400">Note: Check Radio Box untuk memilih jawaban yang benar pada opsi di atas</p>
                </div>
              </div>
            </div>
            <div class="p-6 bg-gray-800"> 
              <div class="flex justify-between items-center">
                <span class="text-white">Jumlah Soal: {{ questions.length }}</span>
                <div>
                  <button @click="addQuestion" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-3">Tambah Soal</button>
                  <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Upload Kuis</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import { getUsernameFromToken } from '../utils/tokenChecker';
import { database } from '../utils/firebaseConfig';
import { ref, get } from 'firebase/database';

export default {
  data() {
    return {
      currentDate: '',
      isModalOpen: false,
      username: 'User',
      currentQuiz: '', 
      dropdownOpen: -1, 
      quizzes: [
        { id: "matematika", name: 'Matematika', logo: 'matematika.png', numQuizzes: 0, numQuestions: 0 },
        { id: "ipa", name: 'Ilmu Pengetahuan Alam', logo: 'ipa.png', numQuizzes: 0, numQuestions: 0 },
        { id: "ips", name: 'Ilmu Pengetahuan Sosial', logo: 'ips.png', numQuizzes: 0, numQuestions: 0 },
        { id: "ppkn", name: 'Pendidikan Kewarnegaraan', logo: 'pkn.png', numQuizzes: 0, numQuestions: 0 },
      ],
      questions: [],
    };
  },
  methods: {
    async checkUserLogin() {
      const username = await getUsernameFromToken();
      if (username) {
        this.username = username;
      } else {
        this.$router.push('/');
      }
    },
    fetchQuizzes() {
      const quizzesRef = ref(database, 'quiz/categories');
      get(quizzesRef).then(snapshot => {
        if (snapshot.exists()) {
          const categories = snapshot.val();
          this.quizzes.forEach(quiz => {
            if (categories[quiz.id] && categories[quiz.id].quizzes) {
              const quizzes = categories[quiz.id].quizzes;
              quiz.numQuizzes = Object.keys(quizzes).length;
              quiz.numQuestions = Object.values(quizzes).reduce((sum, current) => {
                return sum + Object.keys(current.questions).length;
              }, 0);
            }
          });
        }
      }).catch(error => {
        console.error('Error fetching quiz data:', error);
      });
    },
    getCurrentDate() {
      const date = new Date();
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      this.currentDate = date.toLocaleDateString('id-ID', options);
    },
    openModal(quizName) {
      this.isModalOpen = true;
      this.currentQuiz = quizName;
      this.questions = [];
    },
    closeModal() {
      this.isModalOpen = false;
    },
    toggleDropdown(index) {
      if (this.dropdownOpen === index) {
        this.dropdownOpen = -1; 
      } else {
        this.dropdownOpen = index; 
      }
    },
    addQuestion() {
      this.questions.push({
        questionText: "",
        options: [{text: ""}, {text: ""}, {text: ""}, {text: ""}]
      });
    },
  },
  mounted() {
    this.getCurrentDate();
    this.checkUserLogin();
    this.loginCheckInterval = setInterval(this.checkUserLogin, 2500);
    this.fetchQuizzes();
  },
  beforeDestroy() {
    clearInterval(this.loginCheckInterval);
  },
};
</script>
