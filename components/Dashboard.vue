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
          <h4 class="text-white text-lg font-semibold mb-2">Total user</h4>
          <p class="text-white">TEST TEST TEST TEST TEST </p>
        </div>

        <div class="bg-gray-800 rounded-lg shadow-md p-4">
          <h4 class="text-white text-lg font-semibold mb-2">Total user</h4>
          <p class="text-white">TEST TEST TEST TEST TEST </p>
        </div>

        <div class="bg-gray-800 rounded-lg shadow-md p-4">
          <h4 class="text-white text-lg font-semibold mb-2">Total user</h4>
          <p class="text-white">TEST TEST TEST TEST TEST </p>
        </div>
      </div>
      <div class="mt-8">
        <h4 class="text-white text-lg font-bold mb-2">Aktivitas Terakhir</h4>
        <div class="bg-gray-800 rounded-lg shadow-md p-4">
          <table class="table-auto w-full text-white">
            <thead>
              <tr class="border-b  py-2 px-4">
                <th class="pl-4 text-left">Nama</th>
                <th class="text-left">Kuis</th>
                <th class="text-left">Tanggal</th>
                <th class="text-left">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr class="py-2 px-4">
                <td class="pl-4 text-left">Syumba</td>
                <td class="text-left">Matematika</td>
                <td class="text-left">2 Agustus 2024</td>
                <td class="text-left">Selesai - QUIZI</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentDate: '',
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
    },
    mounted() {
      this.getCurrentDate();
    },
  };
</script>