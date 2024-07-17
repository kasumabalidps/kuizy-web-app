<template>
  <div class="flex min-h-screen">
    <div class="bg-gray-800 text-white w-64 p-6 flex flex-col rounded-r-lg shadow-lg">

      <h1 class="text-2xl font-bold mb-6 text-center mt-0 flex items-center">
        <img src="/assets/logo.png" alt="KUIZY Logo" class="mr-2 h-20 w-auto inline-block align-middle">
        KUIZY
      </h1>

      <div class="flex flex-col items-start mb-6 mt-6">
        <p class="text-xs text-gray-400 mb-2 ml-2 font-bold">Halaman</p>
        <ul class="mb-6 w-full">
          <li class="mb-2">
            <nuxt-link to="/dashboard" class="py-2 px-4 rounded-lg mb-2 flex items-center hover:bg-gray-600 font-bold" :class="{ active: $route.path === '/dashboard' }">
              <img src="/assets/dashboard.png" alt="Dashboard Icon" class="ml-2 h-4 w-4">
              <span class="ml-2 font-bold">Dashboard</span>
            </nuxt-link>
          </li>

          <li class="mb-2">
            <nuxt-link to="/editKuis" class="py-2 px-4 rounded-lg mb-2 flex items-center hover:bg-gray-700 font-bold" :class="{ active: $route.path === '/editKuis' }">
              <img src="/assets/editKuis.png" alt="Edit Kuis Icon" class="ml-2 h-4 w-4">
              <span class="ml-2 font-bold">Edit Kuis</span>
            </nuxt-link>
          </li>

          <li class="mb-2">
            <nuxt-link to="/halamanUser" class="py-2 px-4 rounded-lg mb-2 flex items-center hover:bg-gray-700 font-bold" :class="{ active: $route.path === '/halamanUser' }">
              <img src="/assets/halamanUser.png" alt="Halaman User Icon" class="ml-2 h-4 w-4">
              <span class="ml-2 font-bold">Halaman User</span>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <div class="mt-auto">
        <button class="py-2 px-4 rounded-lg mb-2 flex items-center hover:bg-gray-700 font-bold">
          <img src="/assets/logout.png" alt="Logout Icon" class="ml-2 h-4 w-4">
          <span class="ml-2 font-bold">Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
.active {
  background-color: gray-700; 
}
</style>