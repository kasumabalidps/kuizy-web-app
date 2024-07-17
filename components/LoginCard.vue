<template>
  <div class="bg-login-card px-6 py-20 rounded-xl shadow-lg w-full max-w-md drop-shadow-xl relative text-center">
    <!-- alert bang -->
    <transition name="fade">
      <div v-if="errorMessage" class="absolute top-0 left-0 right-0 shadow-lg rounded-md bg-red-500 text-white text-center py-2" style="margin-top: -3rem;">
        {{ errorMessage }}
      </div>
    </transition>
    <h2 class="text-white text-xl sm:text-3xl font-bold mb-2">SELAMAT DATANG</h2>
    <p class="text-white text-md sm:text-md pb-12">Silahkan Pengajar login terlebih dahulu</p>
    <form @submit.prevent="login">
      <div class="mb-6">
        <input type="text" v-model="username" placeholder="Username" class="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div class="mb-10">
        <input type="password" v-model="password" placeholder="Password" class="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <button type="submit" class="w-full bg-button-custom hover:bg-button-hover text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline">Masuk</button>
    </form>
  </div>
</template>

<script>
import { database } from '../firebaseConfig.js';
import { ref, get, update } from "firebase/database";
import { getUsernameFromToken } from '../tokenChecker.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      const sanitizedUsername = this.username.replace(/[.#$[\]]/g, '');
      const userRef = ref(database, 'users/' + sanitizedUsername);
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.password === this.password) {
            const newToken = this.generateToken();
            await update(userRef, { token: newToken, username: sanitizedUsername });
            this.storeToken(newToken);
            this.$router.push('/dashboard');
          } else {
            this.setErrorMessage('Incorrect username or password!');
          }
        } else {
          this.setErrorMessage('Incorrect username or password!');
        }
      } catch (error) {
        this.setErrorMessage('Login failed');
      }
    },
    generateToken() {
      if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        let array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
      } else {
        return 'fallback-token-' + Date.now();
      }
    },
    storeToken(token) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('authToken', token);
      }
    },
    setErrorMessage(message) {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }
  },
  async mounted() {
    const username = await getUsernameFromToken();
    if (username) {
      this.username = username;
      this.$router.push('/dashboard');
    }
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
