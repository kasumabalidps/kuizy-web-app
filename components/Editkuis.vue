<template>
    <div class="flex flex-col w-full p-6">
      <header class="mb-4 pt-4">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-2xl font-bold text-white">Edit Quiz</h2>
          <span class="text-white">{{ currentDate }}</span>
        </div>
        <hr class="border-gray-300">
      </header>
      <main class="flex-grow bg-gray-900 p-6 rounded-lg shadow-lg">
        <p class="text-white">Konten edit kuis akan ditampilkan di sini.</p>
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
