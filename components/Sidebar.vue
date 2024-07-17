<template>
  <div class="flex min-h-screen bg-gray-900">
    <div class="bg-gray-800 text-white w-64 p-6 flex flex-col rounded-r-lg shadow-lg">

      <h1 class="text-2xl font-bold mb-6 text-center mt-0 flex items-center">
        <img src="/assets/logo.png" alt="KUIZY Logo" class="mr-2 h-20 w-auto inline-block align-middle">
        KUIZY
      </h1>

      
      <div class="flex flex-col items-start mb-6 mt-6">
        
        <p class="text-xs text-gray-400 mb-2 ml-2 font-bold">Halaman</p>
        <ul class="mb-6 w-full">
          
          <li class="mb-2">
            <a href="#dashboard" class="block py-2 px-4 rounded-lg mb-2 flex items-center hover:bg-gray-600">
              <img src="/assets/dashboard.png" alt="Dashboard Icon" class="ml-2 h-4 w-4">
              <span class="ml-2 font-bold">Dashboard</span>
            </a>
          </li>
          
          <li class="mb-2">
            <a href="#edit-quiz" class="block py-2 px-4 rounded-lg mb-2 flex items-center hover:bg-gray-700 font-bold">
              <img src="/assets/editKuis.png" alt="Edit Kuis Icon" class="ml-2 h-4 w-4">
              <span class="ml-2 font-bold">Edit Kuis</span>
            </a>
          </li>
          
          <li class="mb-2">
            <a href="#total-user" class="block py-2 px-4 rounded-lg mb-2 flex items-center hover:bg-gray-700 font-bold">
              <img src="/assets/halamanUser.png" alt="Total User Icon" class="ml-2 h-4 w-4">
              <span class="ml-2 font-bold">Halaman User</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="mt-auto">
        <button @click="logout" class="block py-2 px-4 roundedrounded-lg mb-2 flex items-center hover:bg-gray-700 font-bold">
          <img src="/assets/logout.png" alt="Logout Icon" class="ml-2 h-4 w-4">
              <span class="ml-2 font-bold">Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>