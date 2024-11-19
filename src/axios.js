import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 환경 변수에서 URL을 가져옵니다
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
