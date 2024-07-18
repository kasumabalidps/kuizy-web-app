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
                    <li @click="openModal(quiz.id, 'add')" class="text-white px-4 py-2 cursor-pointer hover:bg-gray-900 hover:rounded-md">Tambah Kuis</li>
                    <li @click="openModal(quiz.id, 'delete')" class="text-white px-4 py-2 cursor-pointer hover:bg-gray-900 hover:rounded-md">Hapus Kuis</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="isAddModalOpen" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto">
          <transition name="slide-down">
            <div v-if="showError" id="alert-1" class="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 00-2 0v4a1 1 0 002 0V6zm0 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
              </svg>
              {{ errorMessage }}
              <button @click="showError = false" class="ml-3 -mx-1.5 -my-1.5 bg-red-100 text-red-700 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </transition>
          <div class="bg-gray-800 rounded-lg p-6 w-[70%] max-h-[75vh] overflow-y-auto relative flex flex-col">
            <div class="flex-grow">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-white uppercase">{{ currentQuiz }}</h3>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
              </div>
              <input type="text" v-model="newQuizName" class="w-[25%] p-2 border border-gray-500 rounded bg-gray-700 text-white mb-6" placeholder="Nama Quiz">
              <div v-for="(question, index) in questions" :key="index" class="mb-2">
                <input v-model="question.questionText" type="text" class="w-full p-2 border border-gray-500 rounded mt-2 bg-gray-700 text-white" placeholder="Masukkan Soal">
                <div class="flex flex-col space-y-2 mt-2">
                  <label class="flex items-center" v-for="(option, oIndex) in question.options" :key="oIndex">
                    <input type="radio" class="mr-2" :name="'answer-' + index" :value="oIndex" v-model="question.correctAnswer">
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
                  <button @click="uploadQuiz" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Upload Kuis</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Delete Quiz -->
        <div v-if="isDeleteModalOpen" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto">
          <div class="bg-gray-800 rounded-lg p-6 w-[50%] max-h-[50vh] overflow-y-auto relative flex flex-col">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-white">Hapus Kuis</h3>
              <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
            </div>
            <p class="text-white mb-6">Apakah Anda yakin ingin menghapus Kuis <strong>{{ currentQuiz }}</strong>?</p>
            <div>
              <label for="quizSelect" class="block text-white mb-2">Pilih Kuis yang ingin dihapus:</label>
              <select v-model="selectedQuiz" id="quizSelect" class="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white mb-6">
                <option v-for="(quiz, index) in filteredQuizzes" :key="index" :value="quiz.id">{{ quiz.name }}</option>
              </select>
            </div>
            <div class="flex justify-end">
              <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-3">Batal</button>
              <button @click="deleteQuiz" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Hapus</button>
            </div>
          </div>
        </div>
        <!-- Delete Quiz -->
      </main>
    </div>
  </div>
</template>

<script>
import { getUsernameFromToken } from '../utils/tokenChecker';
import { database } from '../utils/firebaseConfig';
import { ref, get, set, remove } from 'firebase/database';

export default {
  data() {
    return {
      currentDate: '',
      newQuizName: '',
      isAddModalOpen: false,
      isDeleteModalOpen: false,
      username: 'User',
      currentQuiz: '',
      dropdownOpen: -1,
      quizzes: [
        { id: "matematika", name: 'Matematika', logo: 'matematika.png', numQuizzes: 0, numQuestions: 0 },
        { id: "ipa", name: 'Ilmu Pengetahuan Alam', logo: 'ipa.png', numQuizzes: 0, numQuestions: 0 },
        { id: "ips", name: 'Ilmu Pengetahuan Sosial', logo: 'ips.png', numQuizzes: 0, numQuestions: 0 },
        { id: "ppkn", name: 'Pendidikan Kewarganegaraan', logo: 'pkn.png', numQuizzes: 0, numQuestions: 0 },
      ],
      quizOptions: [],
      selectedQuiz: '',
      questions: [],
      showError: false,
      errorMessage: '',
      filteredQuizzes: [],
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

              const quizArray = Object.entries(quizzes).map(([id, details]) => ({
                id: `${quiz.id}/quizzes/${id}`,
                name: `${details.name}`
              }));
              this.quizOptions.push(...quizArray);
            }
          });
          console.log('Opsi Kuis:', this.quizOptions);
        }
      }).catch(error => {
        console.error('Kesalahan saat mengambil data kuis:', error);
      });
    },
    async uploadQuiz() {
      try {
        const category = this.currentQuiz;
        const quizRef = ref(database, `quiz/categories/${category}/quizzes`);
        const quizSnapshot = await get(quizRef);
        const quizCount = quizSnapshot.exists() ? Object.keys(quizSnapshot.val()).length + 1 : 1;
        const quizId = `quiz${quizCount}`;
        const quizName = this.newQuizName.trim() || `${category} Kuis ${quizCount}`;

        const newQuiz = {
          name: quizName,
          questions: {}
        };

        this.questions.forEach((question, index) => {
          const questionId = `soal${index + 1}`;
          if (question.correctAnswer >= 0 && question.options[question.correctAnswer]) {
            const correctOption = question.options[question.correctAnswer];
            newQuiz.questions[questionId] = {
              text: question.questionText,
              correctAnswer: correctOption.text,
              option1: question.options[0].text,
              option2: question.options[1].text,
              option3: question.options[2].text,
              option4: question.options[3].text,
            };
          } else {
            throw new Error(`Tidak ada jawaban yang benar dipilih untuk soal ${index + 1}`);
          }
        });

        await set(ref(database, `quiz/categories/${category}/quizzes/${quizId}`), newQuiz);
        console.log(`Kuis ${quizName} berhasil diunggah!`);
        this.closeModal();
      } catch (error) {
        this.errorMessage = error.message;
        this.showError = true;
      }
    },
    async deleteQuiz() {
      try {
        if (!this.selectedQuiz) {
          throw new Error('Pilih kuis yang ingin dihapus');
        }
        const quizRef = ref(database, `quiz/categories/${this.selectedQuiz}`);
        console.log(`Mencoba menghapus kuis di path: ${this.selectedQuiz}`);
        await remove(quizRef);
        console.log(`Kuis berhasil dihapus!`);
        this.closeModal();
        this.fetchQuizzes();
      } catch (error) {
        this.errorMessage = error.message;
        this.showError = true;
        console.error(`Kesalahan saat menghapus kuis: ${error.message}`);
      }
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
    openModal(quizId, type) {
      this.currentQuiz = quizId;
      const category = quizId.split('/')[0];
      this.filteredQuizzes = this.quizOptions.filter(q => q.id.startsWith(category));
      console.log('Kuis yang difilter:', this.filteredQuizzes);
      if (type === 'add') {
        this.isAddModalOpen = true;
        this.isDeleteModalOpen = false;
        this.questions = [];
        this.newQuizName = '';
      } else if (type === 'delete') {
        this.isAddModalOpen = false;
        this.isDeleteModalOpen = true;
        this.selectedQuiz = '';
      }
    },
    closeModal() {
      this.isAddModalOpen = false;
      this.isDeleteModalOpen = false;
      this.showError = false;
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
        options: [{text: ""}, {text: ""}, {text: ""}, {text: ""}],
        correctAnswer: -1
      });
    },
  },
  mounted() {
    this.getCurrentDate();
    this.checkUserLogin();
    this.fetchQuizzes();
  }
};
</script>

<style>
.slide-down-enter-active {
  transition: all 0.3s ease;
}
.slide-down-enter {
  opacity: 0;
}
.slide-down-enter-to {
  opacity: 1;
}
.slide-down-leave-active {
  transition: opacity 0.3s ease;
}
.slide-down-leave-to {
  opacity: 0;
}
</style>
