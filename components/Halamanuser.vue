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
            </tr>
          </thead>
          <tbody>
            <tr class="bg-gray-800 border-b border-gray-800" v-for="user in users" :key="user.username">
              <td class="py-4 px-6">{{ user.username }}</td>
              <td class="py-4 px-6">{{ user.point }}</td>
              <td class="py-4 px-6">{{ user.level }}</td>
              <td class="py-4 px-6">{{ user.total_soal }}</td>
              <td class="py-4 px-6">{{ user.xp }}</td>
              <td class="py-4 px-6">{{ user.latestDate }}</td>
            </tr>
          </tbody>
        </table>
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
      users: []
    };
  },
  methods: {
    getCurrentDate() {
      const date = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      this.currentDate = date.toLocaleDateString('id-ID', options);
    },
    fetchUsers() {
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
            latestDate: user.quiz_history[user.quiz_history.length - 1]?.tanggal || 'N/A'
          }));
        }
      }).catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  },
  mounted() {
    this.getCurrentDate();
    this.fetchUsers();
  }
};
</script>
