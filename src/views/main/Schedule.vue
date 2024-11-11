<!-- src/views/main/Schedule.vue -->
<template>
  <div class="schedule-page">
    <h1>편성표</h1>
    
    <!-- 날짜별 편성표 -->
    <div v-for="(schedules, date) in groupedSchedules" :key="date" class="date-group">
      <h2 class="date-header">{{ formatDateHeader(date) }}</h2>
      
      <div class="schedule-list">
        <div v-for="schedule in schedules" :key="schedule.id" class="schedule-card">
          <div class="thumbnail">
            <img :src="schedule.thumbnail" :alt="schedule.productName" />
            <span class="broadcast-time">{{ schedule.time }}</span>
          </div>
          
          <div class="schedule-info">
            <h3 class="product-name">{{ schedule.productName }}</h3>
            <p class="company-name">{{ schedule.company }}</p>
            <p class="price">{{ formatPrice(schedule.price) }}원</p>
            <p class="description">{{ schedule.description }}</p>
            <button @click="goToProduct(schedule.productId)" class="product-button">
              상품 보러가기
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="Object.keys(groupedSchedules).length === 0" class="no-schedules">
      <p>예정된 라이브 방송이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import odungImage from '@/assets/image/오둥이하트.png';

export default {
  name: 'Schedule',
  setup() {
    const schedules = ref([
      {
        id: 1,
        date: '2024-03-20',
        time: '14:00',
        productId: 101,
        productName: '스마트 공기청정기 2024',
        company: '클린에어테크',
        price: 299000,
        description: '신개념 AI 탑재 공기청정기 런칭 방송',
        thumbnail: odungImage
      },
      {
        id: 2,
        date: '2024-03-20',
        time: '16:00',
        productId: 102,
        productName: '무선 로봇청소기 MAX',
        company: '스마트클린',
        price: 459000,
        description: '신제품 첫 공개 특별 할인 방송',
        thumbnail: odungImage
      },
      {
        id: 3,
        date: '2024-03-21',
        time: '13:00',
        productId: 103,
        productName: '스마트 와인셀러',
        company: '와인테크',
        price: 890000,
        description: '프리미엄 와인셀러 론칭 특가',
        thumbnail: odungImage
      },
      {
        id: 4,
        date: '2024-03-21',
        time: '19:00',
        productId: 104,
        productName: '접이식 전기자전거',
        company: '모빌리티플러스',
        price: 1290000,
        description: '차세대 전기자전거 사전예약',
        thumbnail: odungImage
      },
      {
        id: 5,
        date: '2024-03-22',
        time: '15:00',
        productId: 105,
        productName: '스마트 도어락 PRO',
        company: '세이프홈',
        price: 259000,
        description: '새로운 보안시스템 첫 공개',
        thumbnail: odungImage
      },
      {
        id: 6,
        date: '2024-03-22',
        time: '20:00',
        productId: 106,
        productName: '올인원 PC 모니터',
        company: '테크비전',
        price: 549000,
        description: '신제품 출시 기념 특별 방송',
        thumbnail: odungImage
      },
      {
        id: 7,
        date: '2024-03-23',
        time: '14:00',
        productId: 107,
        productName: '무선 게이밍 헤드셋',
        company: '사운드프로',
        price: 189000,
        description: '프로게이머 추천 신제품',
        thumbnail: odungImage
      },
      {
        id: 8,
        date: '2024-03-23',
        time: '17:00',
        productId: 108,
        productName: '스마트 커피머신',
        company: '홈카페',
        price: 399000,
        description: '신제품 론칭 특별 할인',
        thumbnail: odungImage
      },
      {
        id: 9,
        date: '2024-03-24',
        time: '13:00',
        productId: 109,
        productName: '프리미엄 안마의자',
        company: '헬스케어텍',
        price: 2290000,
        description: '2024년형 신제품 공개',
        thumbnail: odungImage
      },
      {
        id: 10,
        date: '2024-03-24',
        time: '18:00',
        productId: 110,
        productName: '스마트 인덕션',
        company: '키친플러스',
        price: 729000,
        description: '신기술 탑재 신제품 특가',
        thumbnail: odungImage
      }
    ]);

    const groupedSchedules = computed(() => {
      const grouped = {};
      schedules.value.forEach(schedule => {
        if (!grouped[schedule.date]) {
          grouped[schedule.date] = [];
        }
        grouped[schedule.date].push(schedule);
      });
      return grouped;
    });

    const formatPrice = (price) => {
      return new Intl.NumberFormat('ko-KR').format(price);
    };

    const formatDateHeader = (dateStr) => {
      const date = new Date(dateStr);
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return date.toLocaleDateString('ko-KR', options);
    };

    const goToProduct = (productId) => {
      this.$router.push(`/product/${productId}`);
    };

    return {
      groupedSchedules,
      formatPrice,
      formatDateHeader,
      goToProduct
    };
  }
};
</script>

<style scoped>
.schedule-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.date-group {
  margin-bottom: 3rem;
}

.date-header {
  font-size: 1.2rem;
  color: #333;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  border-bottom: 2px solid #eee;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.schedule-card {
  display: flex;
  gap: 1.5rem;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.schedule-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.thumbnail {
  position: relative;
  width: 200px;
  height: 150px;
  flex-shrink: 0;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.broadcast-time {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.schedule-info {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.company-name {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.price {
  font-weight: bold;
  color: #ff4b4b;
  margin-bottom: 0.5rem;
}

.description {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.product-button {
  align-self: flex-start;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.product-button:hover {
  background-color: #0056b3;
}

.no-schedules {
  text-align: center;
  padding: 3rem;
  color: #666;
}

@media (max-width: 768px) {
  .schedule-card {
    flex-direction: column;
  }

  .thumbnail {
    width: 100%;
    height: 200px;
  }

  .schedule-info {
    padding: 1rem;
  }

  .product-button {
    width: 100%;
    text-align: center;
  }
}
</style>