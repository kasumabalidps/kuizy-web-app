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
        <table class="w-full text-sm text-left text-gray-400 ">
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
            <tr class="bg-gray-800 border-b border-gray-800">
              <td class="py-4 px-6">User1</td>
              <td class="py-4 px-6">1500</td>
              <td class="py-4 px-6">5</td>
              <td class="py-4 px-6">50</td>
              <td class="py-4 px-6">2000</td>
              <td class="py-4 px-6">2024-07-16</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
    </div>
  </template>
<script>
export default {
  data() {
    return {
      currentDate: ''
    };
  },
  methods: {
    getCurrentDate() {
      const date = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      this.currentDate = date.toLocaleDateString('id-ID', options);
    }
  },
  mounted() {
    this.getCurrentDate();
  }
};
</script>
