<template>
  <div class="flex flex-col w-full p-6">
    <header class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl text-white italic">Hello, User</h2>
        <span class="text-white">{{ currentDate }}</span>
      </div>
      <hr class="border-gray-300">
    </header>
    <main class="flex-grow bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 class="text-white text-2xl font-bold mb-4">Dashboard</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-gray-800 rounded-lg shadow-md p-4">
          <h4 class="text-white text-lg font-semibold mb-2">Total Users</h4>
          <p class="text-white">1</p>
        </div>
        <div class="bg-gray-800 rounded-lg shadow-md p-4">
          <h4 class="text-white text-lg font-semibold mb-2">Total Users</h4>
          <p class="text-white">1</p>
        </div>
        <div class="bg-gray-800 rounded-lg shadow-md p-4">
          <h4 class="text-white text-lg font-semibold mb-2">Total Users</h4>
          <p class="text-white">1</p>
        </div>
      </div>
      <!-- Table -->
      <div class="overflow-x-auto relative rounded-xl drop-shadow-md mt-8">
        <table class="w-full text-sm text-left text-gray-400">
          <thead class="text-xs text-white uppercase bg-gray-800">
            <tr>
              <th scope="col" class="py-3 px-6">Username</th>
              <th scope="col" class="py-3 px-6">Quiz</th>
              <th scope="col" class="py-3 px-6">Tanggal</th>
              <th scope="col" class="py-3 px-6">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="loading">
              <tr class="animate-pulse">
                <td colspan="4" class="py-4 px-6 bg-gray-700 text-center">Ditunggu ya mas...</td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="activity in recentActivities" :key="activity.id" class="bg-gray-800 border-b border-gray-800">
                <td class="py-4 px-6">{{ activity.username }}</td>
                <td class="py-4 px-6">{{ activity.quizName }}</td>
                <td class="py-4 px-6">{{ activity.date }}</td>
                <td class="py-4 px-6">{{ activity.status }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!-- Table -->
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
      recentActivities: [],
      loading: true
    };
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
          const activities = [];
          for (const userId in rawData) {
            const user = rawData[userId];
            if (user.quiz_history && user.quiz_history.length > 0) {
              const latestQuiz = user.quiz_history[user.quiz_history.length - 1];
              activities.push({
                id: userId + latestQuiz.date,
                username: user.username,
                quizName: latestQuiz.name,
                date: latestQuiz.tanggal,
                status: 'Selesai'
              });
            }
          }
          this.recentActivities = activities.sort((a, b) => new Date(b.date) - new Date(a.date));
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
