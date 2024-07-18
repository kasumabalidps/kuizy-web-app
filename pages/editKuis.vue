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
          <p class="text-xl text-white mb-2 ml-2 font-bold">Pilihan Kuis</p>
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
                  <ul v-if="dropdownOpen === index" class="absolute bg-gray-800 rounded-lg mt-2 shadow-md py-1 w-32 z-10">
                    <li @click="openModal(quiz.name)" class="text-white px-4 py-2 cursor-pointer hover:bg-gray-700">Tambah Kuis</li>
                    <li class="text-white px-4 py-2 cursor-pointer hover:bg-gray-700">Hapus Kuis</li>
                </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="isModalOpen" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div class="bg-gray-800 rounded-lg p-6 w-1/2">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-white">{{ currentQuiz }}</h3>
              <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-3xl">
                &times;
              </button>
            </div>
            <div class="mb-4">
              <input type="text" class="w-full p-2 border border-gray-500 rounded mt-2 bg-gray-700 text-white" placeholder="Masukkan Soal">
            </div>
            <div class="mb-2">
              <div class="flex flex-col space-y-2">
                <label class="flex items-center">
                  <input type="radio" class="mr-2" name="answer" value="1">
                  <input type="text" class="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white" placeholder="Opsi 1">
                </label>
                <label class="flex items-center">
                  <input type="radio" class="mr-2" name="answer" value="2">
                  <input type="text" class="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white" placeholder="Opsi 2">
                </label>
                <label class="flex items-center">
                  <input type="radio" class="mr-2" name="answer" value="3">
                  <input type="text" class="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white" placeholder="Opsi 3">
                </label>
                <label class="flex items-center">
                  <input type="radio" class="mr-2" name="answer" value="4">
                  <input type="text" class="w-full p-2 border border-gray-500 rounded bg-gray-700 text-white" placeholder="Opsi 4">
                </label>
                <p class="flex mr-2 text-gray-400 text-sm">Note: Check radio button untuk memilih mana jawaban yang benar</p>
              </div>
            </div>
            <div class="flex justify-between items-center mt-4">
              <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Tambah Soal</button>
              <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Upload Kuis</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentDate: '',
        isModalOpen: false,
        currentQuiz: '', 
        dropdownOpen: -1, 
        quizzes: [
          { name: 'Matematika', logo: 'matematika.png', numQuizzes: 1, numQuestions: 10 },
          { name: 'Ilmu Pengetahuan Alam', logo: 'ipa.png', numQuizzes: 1, numQuestions: 10 },
          { name: 'Ilmu Pengetahuan Sosial', logo: 'ips.png', numQuizzes: 1, numQuestions: 10 },
          { name: 'Pendidikan Kewarnegaraan', logo: 'pkn.png', numQuizzes: 1, numQuestions: 10 },
        ],
      };
    },
    methods: {
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
    },
    mounted() {
      this.getCurrentDate();
    }
  };
</script>

