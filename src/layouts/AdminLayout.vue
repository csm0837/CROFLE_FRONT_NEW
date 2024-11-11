<!-- src/layouts/AdminLayout.vue -->
<template>
    <div class="admin-layout">
      <AdminSidebar />
  
      <div class="admin-content">
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  import AdminSidebar from '../components/AdminSidebar.vue';
  
  export default {
    name: 'AdminLayout',
    components: {
      AdminSidebar,
    },
  };
  </script>
  
  <style scoped>
  .admin-layout {
    display: flex;
    min-height: 100vh;
  }
  
  .admin-content {
    flex: 1;
    padding: 2rem;
  }
  </style>
  