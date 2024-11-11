<template>
  <header class="header">
    <div class="container">


      <!-- 로고 -->
      <div class="logo">
        <router-link to="/">
          <img src="../assets/image/logo.png" alt="logo" class="logo-image" />
        </router-link>
      </div>


      <!-- 메뉴 항목 및 검색창 -->
      <nav class="navigation">
        <ul class="nav-center">
          <li><router-link to="/live" class="nav-item">라이브</router-link></li>
          <li><router-link to="/schedule" class="nav-item">편성표</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/mypage/wishlist" class="nav-item">찜</router-link></li>
        </ul>
        <div class="search-bar">
          <input
            type="text"
            placeholder="검색어 입력"
            class="search-input"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />
          <button @click="handleSearch" class="search-button">검색</button>
        </div>
      </nav>


      <!-- 로그인 프로필 아이콘 -->
      <div class="user-info">
        <div
          v-if="isLoggedIn"
          class="profile-container"
          @mouseenter="showDropdown"
          @mouseleave="hideDropdown"
        >
          <img src="../assets/image/오둥이하트.png" alt="User Profile" class="profile-img" />


          <!-- 드롭다운 메뉴 -->
          <div
            v-if="dropdownVisible"
            class="dropdown-menu"
            @mouseenter="showDropdown"
            @mouseleave="hideDropdown"
          >
            <div class="profile-info">
              <img src="../assets/image/오둥이하트.png" alt="User Profile" class="profile-thumbnail" />
              <span class="username">{{ userName }}</span>
            </div>
            <router-link to="/mypage" class="dropdown-item">마이페이지</router-link>
            <router-link to="/mypage/wishlist" class="dropdown-item">찜목록</router-link>
            <router-link to="/" class="dropdown-item" @click.native="logout">로그아웃</router-link>
          </div>
        </div>
        <router-link v-else to="/auth/login" class="login-button">로그인</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false,
      searchQuery: '',
      dropdownVisible: false,
      userName: '', 
      userType: '', 
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userType');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');

      this.isLoggedIn = false;
      this.dropdownVisible = false;
      this.userName = '';
      this.userType = '';

      this.$router.push('/');
    },
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ path: '/search', query: { q: this.searchQuery, type: 'search' } });
      }
    },
    showDropdown() {
      this.dropdownVisible = true;
    },
    hideDropdown() {
      this.dropdownVisible = false;
    },
    loadUserInfo() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userName = localStorage.getItem('userName') || '';
      const userType = localStorage.getItem('userType') || '';

      this.isLoggedIn = isLoggedIn;
      this.userName = userName;
      this.userType = userType;
    },
  },
  mounted() {
    this.loadUserInfo();
    window.addEventListener('storage', this.loadUserInfo);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.loadUserInfo);
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  position: relative;
  z-index: 2;
  width: 100%;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  white-space: nowrap; 
}

.logo {
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 100px; 
}

.logo-image {
  width: 100px;
}

.navigation {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px; 
}

.nav-center {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0 1rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.nav-item.router-link-active {
  text-decoration: underline;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 0.5rem;
  width: 200px;
}

.search-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.user-info {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 100px;
}

.login-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
}

.profile-container {
  position: relative;
  display: inline-block;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  object-fit: cover;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 160px;
  text-align: center;
  z-index: 3;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.profile-thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  object-fit: cover;
}

.username {
  font-weight: bold;
}

.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  color: black;
  text-decoration: none;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: var(--primary-color);
  color: white;
}
</style>