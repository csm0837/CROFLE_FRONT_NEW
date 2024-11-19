<!-- src/views/auth/Login.vue -->
<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 로고 -->
      <div class="logo">
        <router-link to="/">
          <img
            src="../../assets/image/logo.png"
            alt="logo"
            class="logo-image"
          />
        </router-link>
      </div>

      <!-- 이메일 입력 -->
      <div class="input-group">
        <label for="email">이메일</label>
        <input
          type="text"
          id="email"
          v-model="email"
          @input="validateEmail"
          placeholder="이메일을 입력하세요"
          @keyup.enter="focusPassword"
        />
        <p v-if="emailError" class="error-message">
          유효한 이메일을 입력해주세요.
        </p>
      </div>

      <!-- 비밀번호 입력 -->
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="비밀번호를 입력하세요"
          @keyup.enter="handleLogin" 
          ref="passwordInput"
        />
      </div>

      <!-- 로그인 버튼 -->
      <button @click="handleLogin" class="login-button">이메일로 로그인</button>
      <p v-if="loginError" class="error-message">{{ errorMessage }}</p>

      <!-- 소셜 로그인 버튼들 -->
      <button class="social-login naver-login" @click="handleNaverLogin">
        네이버 간편 로그인
      </button>

      <!-- 아이디/비밀번호 찾기 및 회원가입 -->
      <div class="links">
        <router-link
          :to="{
            name: 'IdPasswordRecovery',
            query: { redirect: previousRoute },
          }"
        >
          아이디/비밀번호 찾기
        </router-link>
        |
        <router-link to="/auth/signup">회원가입</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      emailError: false,
      loginError: false,
      errorMessage: "",
      previousRoute: null,
      // 더미 사용자 데이터
      dummyUsers: [
        {
          email: "seller@test.com",
          password: "1234",
          type: "seller",
          accessToken: "dummy-seller-access-token",
          refreshToken: "dummy-seller-refresh-token",
        },
        {
          email: "buyer@test.com",
          password: "1234",
          type: "buyer",
          accessToken: "dummy-buyer-access-token",
          refreshToken: "dummy-buyer-refresh-token",
        }
      ]
    };
  },
  methods: {
    focusPassword() {
      this.$refs.passwordInput.focus()
    },
    
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = this.email.length > 0 && !emailRegex.test(this.email);
    },

    async handleLogin() {
  console.log("클릭");
  this.validateEmail();
  if (this.emailError) return;

  try {
    // 더미 데이터로 로그인 처리
    const user = this.dummyUsers.find(
      user => user.email === this.email && user.password === this.password
    );

    if (user) {
      // 토큰 저장
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("refreshToken", user.refreshToken);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userType", user.type);
      // 로그인 상태 및 사용자 이름 저장
      localStorage.setItem("isLoggedIn", "true");
      // 이메일에서 사용자 이름 추출 (@ 앞부분)
      const userName = user.email.split('@')[0];
      localStorage.setItem("userName", userName);

      // 홈으로 리다이렉트
      this.$router.push("/");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    this.loginError = true;
    this.errorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
    console.error("Login error:", error);
  }
},

    handleNaverLogin() {
      // 직접 URL 생성 및 리다이렉션
      const clientId = "Rb3vhJIp1oI1q3_oAJiB";
      const redirectUri = encodeURIComponent(
        "http://localhost:8080/login/oauth2/code/naver"
      );
      const state = Math.random().toString(36).substring(7);

      const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

      // 네이버 로그인 페이지로 리다이렉트
      window.location.href = naverLoginUrl;
    },
  },
  mounted() {
    this.previousRoute = this.$route.query.redirect || "/";

    // 로그인 실패 시 에러 메시지 표시
    const error = this.$route.query.error;
    if (error) {
      this.loginError = true;
      this.errorMessage = error;
    }
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  width: 300px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  width: 50%;
  margin: 0 auto 3rem auto; 
  display: block; 
}

.logo-image {
  width: 100%;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.input-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 0.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.social-login {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  color: white;
  font-weight: bold;
  border: none;
}

.kakao-login {
  background-color: #fee500;
  color: #3c1e1e;
}

.naver-login {
  background-color: #03c75a;
}

.links {
  margin-top: 1rem;
  font-size: 0.875rem;
}

.links a {
  color: var(--primary-color);
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}
</style>
