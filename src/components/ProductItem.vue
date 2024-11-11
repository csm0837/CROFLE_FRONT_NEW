<!-- src/components/ProductItem.vue -->
<template>
  <router-link :to="{ name: 'ProductDetail', params: { productId: 1 } }" class="product-link">
    <div class="product-item">


      <!-- 라이브 아이콘 -->
      <div v-if="product.isLive" class="live-icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" stroke="red" stroke-width="2" fill="transparent"/>
          <path d="M12 6V12L16 14" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>LIVE</span>
      </div>


      <!-- 상품 이미지 -->
      <img :src="product.image" :alt="product.name" class="product-image" />
  

      <!-- 상품 정보 -->
      <div class="product-info">


        <!-- 랭킹 표시 -->
        <div v-if="rank" class="rank-badge">
          {{ rank }}
        </div>


        <!-- 펀딩 달성률 및 종료 남은 날짜 -->
        <div class="funding-info">
          <span class="achievement">{{ product.achievement }}%</span>
          <span class="end-date">{{ daysLeft }}일 남음</span>
        </div>


        <!-- 상품 이름 -->
        <h3 class="product-name">{{ product.name }}</h3>


        <!-- 제작 회사 이름 -->
        <p class="company-name">{{ product.company }}</p>


        <!-- 가격 정보 추가 -->
        <p class="price">{{ formatPrice(product.price) }}원</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    product: {
      type: Object,
      required: true,
    },
    rank: {
      type: Number,
      default: null,
    },
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString('ko-KR');
    }
  },
  computed: {
    daysLeft() { 
      const endDate = new Date(this.product.endDate);
      const today = new Date();
      const diffTime = endDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    },
  },
};
</script>

<style scoped>
.product-link {
  text-decoration: none;
  color: inherit;
}

.product-item {
  position: relative;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.live-icon {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 2;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.live-icon svg {
  margin-right: 4px;
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.product-info {
  padding: 0.5rem;
  text-align: left;
}

.rank-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: gold;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 2;
}

.funding-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.achievement {
  background-color: #28a745;
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.75rem;
}

.end-date {
  color: #6c757d;
  font-size: 0.75rem;
}

.product-name {
  font-size: 1rem;
  margin: 0.25rem 0;
  color: #333;
}

.company-name {
  font-size: 0.875rem;
  color: #777;
}

.price {
  font-size: 1rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-top: 0.5rem;
}
</style>
