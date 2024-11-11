<!-- src/layouts/MyPageLayout.vue -->
<template>
  <div class="mypage-layout">
    <Header /> 
    <div class="mypage-container">
      <MypageSidebar />
      <div class="mypage-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MypageSidebar from '../components/MypageSidebar.vue';
import Header from '@/components/Header.vue'; 

export default {
  name: 'MyPageLayout',
  components: {
    MypageSidebar,
    Header, 
  },
};
</script>

<style scoped>
.mypage-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.mypage-container {
  display: flex;
  flex: 1;
  background-color: fff;
}

.mypage-content {
  flex: 1;
  padding: 2rem;
  background-color: #fff;
}
</style>
