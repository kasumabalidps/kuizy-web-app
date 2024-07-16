<template>
    <div class="bg-login-card px-16 py-20 rounded-xl shadow-lg w-full max-w-md drop-shadow-xl">
      <h2 class="text-white text-2xl font-bold mb-6 text-center">SELAMAT DATANG</h2>
      <p class="text-white text-sm text-center mb-8">Silahkan login terlebih dahulu</p>
      <form @submit.prevent="login">
        <div class="mb-4">
          <input type="text" v-model="username" placeholder="Username" class="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="mb-8">
          <input type="password" v-model="password" placeholder="Password" class="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline">Masuk</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        console.log('Logging in with:', this.username, this.password);
      }
    }
  }
  </script>
  