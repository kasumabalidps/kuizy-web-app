<template>
  <div class="flex flex-col w-full p-6">
    <header class="mb-4 pt-4">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl font-bold text-white">Halaman Users</h2>
        <span class="text-white">{{ currentDate }}</span>
      </div>
      <hr class="border-gray-300">
    </header>
    <main class="flex-grow bg-gray-900 p-6 shadow-lg">
      <div class="overflow-x-auto relative rounded-xl drop-shadow-md">
        <table class="w-full text-sm text-left text-gray-400">
          <thead class="text-xs text-white uppercase bg-gray-800">
            <tr>
              <th scope="col" class="py-3 px-6">Username</th>
              <th scope="col" class="py-3 px-6">Point</th>
              <th scope="col" class="py-3 px-6">Level</th>
              <th scope="col" class="py-3 px-6">Soal Selesai</th>
              <th scope="col" class="py-3 px-6">XP</th>
              <th scope="col" class="py-3 px-6">Tanggal History Terakhir</th>
              <th scope="col" class="py-3 px-6">Quiz Terakhir</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="loading">
              <tr class="animate-pulse">
                <td colspan="7" class="py-4 px-6 bg-gray-700 text-center">Ditunggu ya mas...</td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="user in paginatedUsers" :key="user.username" class="bg-gray-800 border-b border-gray-800">
                <td class="py-4 px-6">{{ user.username }}</td>
                <td class="py-4 px-6">{{ user.point }}</td>
                <td class="py-4 px-6">{{ user.level }}</td>
                <td class="py-4 px-6">{{ user.total_soal }}</td>
                <td class="py-4 px-6">{{ user.xp }}</td>
                <td class="py-4 px-6">{{ user.latestDate }}</td>
                <td class="py-4 px-6">{{ user.lastquiz }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="pagination mt-4 flex justify-center">
        <button
          v-if="currentPage > 1"
          @click="currentPage--"
          class="mx-1 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Previous
        </button>
        <span class="text-white mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          v-if="currentPage < totalPages"
          @click="currentPage++"
          class="mx-1 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import { database } from '../utils/firebaseConfig';
import { ref, get } from 'firebase/database';

export default {
  data() {
    return {
      currentDate: '',
      users: [],
      loading: true,
      currentPage: 1,
      pageSize: 10,
      totalPages: 0
    };
  },
  computed: {
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.users.slice(start, end);
    }
  },
  methods: {
    getCurrentDate() {
      const date = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      this.currentDate = date.toLocaleDateString('id-ID', options);
    },
    fetchUsers() {
      this.loading = true;
      const usersRef = ref(database, 'users');
      get(usersRef).then(snapshot => {
        if (snapshot.exists()) {
          const rawData = snapshot.val();
          this.users = Object.values(rawData).map(user => ({
            username: user.username,
            level: user.level,
            point: user.point,
            total_soal: user.total_soal,
            xp: user.xp,
            latestDate: user.quiz_history[user.quiz_history.length - 1]?.tanggal || 'N/A',
            lastquiz: user.quiz_history[user.quiz_history.length - 1]?.name,
          }));
          this.totalPages = Math.ceil(this.users.length / this.pageSize);
          setTimeout(() => {
            this.loading = false;
          }, 1000); 
        } else {
          this.loading = false;
        }
      }).catch(error => {
        console.error('Error fetching user data:', error);
        this.loading = false;
      });
    }
  },
  mounted() {
    this.getCurrentDate();
    this.fetchUsers();
  }
};
</script>

