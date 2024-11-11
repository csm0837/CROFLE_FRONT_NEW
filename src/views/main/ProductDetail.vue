<!-- src/views/main/ProductDetail.vue -->
<template>
  <div>
    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="loading-spinner">
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
      <span>로딩 중...</span>
    </div>

    <!-- 에러 메시지 -->
    <div v-else-if="error" class="error-message">
      <span>상품을 찾을 수 없습니다.</span>
    </div>

    <!-- 제품 상세 내용 -->
    <div v-else-if="product" class="product-detail-page">
      <div class="product-detail-container">
        <!-- 좌측: 제품 이미지 섹션 -->
        <div class="product-image-section">
          <!-- 이미지 슬라이더 -->
          <div class="image-slider" v-if="hasMultipleImages">
            <!-- 이전 버튼 -->
            <button 
              @click.stop="prevImage" 
              class="slider-button prev-button" 
              aria-label="이전 이미지"
            >
              &#10094;
            </button>
            
            <!-- 현재 이미지 -->
            <img 
              :src="currentImage" 
              :alt="`${product.name} 이미지 ${currentImageIndex + 1}`" 
              class="product-main-image" 
            />
            
            <!-- 다음 버튼 -->
            <button 
              @click.stop="nextImage" 
              class="slider-button next-button" 
              aria-label="다음 이미지"
            >
              &#10095;
            </button>
          </div>
          
          <!-- 단일 이미지 표시 -->
          <div v-else class="single-image">
            <img 
              :src="product.image" 
              :alt="product.name" 
              class="product-main-image" 
            />
          </div>
        </div>

        <!-- 우측: 제품 정보 섹션 -->
        <div class="product-info-section">
          <!-- 상단: 펀딩 %, 카테고리, 알림, 공유 아이콘 -->
          <div class="top-info">
            <!-- 펀딩 달성률 -->
            <div class="funding-percentage">
              <span>{{ product.achievement }}% 펀딩 달성</span>
            </div>

            <!-- 카테고리 -->
            <div class="category">
              <span>카테고리: {{ product.category }}</span>
            </div>

            <!-- 알림 및 공유 아이콘 -->
            <div class="icons">
              <button @click="handleNotification" aria-label="알림" class="icon-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 24c1.104 0 2-.896 2-2h-4c0 1.104.896 2 2 2zm6.364-6v-5c0-3.07-1.639-5.64-4.5-6.32V6c0-.828-.672-1.5-1.5-1.5S10.364 5.172 10.364 6v.68C7.504 7.36 5.865 9.93 5.865 13v5l-1.364 1.364V20h16v-.636L18.364 18z" />
                </svg>
              </button>

              <button @click="handleShare" aria-label="공유" class="icon-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77l-7.12-4.06a3.003 3.003 0 000-1.46l7.12-4.06c.52.47 1.2.77 1.96.77 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .56.19 1.09.52 1.5L8.81 9.58a1.99 1.99 0 01-2.52 0 2.005 2.005 0 010-2.82l7.12-4.06a4.005 4.005 0 00-5.08-3.06 4.005 4.005 0 00-1.16 5.94l7.12 4.06c-.33.41-.52.94-.52 1.5 0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- 상품명 -->
          <h1 class="product-name">{{ product.name }}</h1>

          <!-- 상품 간단 설명 -->
          <p class="product-description">{{ product.shortDescription }}</p>

          <!-- 펀딩 정보 -->
          <div class="funding-info">
  <div class="price-info">
    <span class="funding-price">{{ product.price.toLocaleString() }}원</span>
  </div>
  <div class="funding-stats">
    <span class="funding-amount">모인 금액: {{ product.fundingAmount.toLocaleString() }}원</span>
    <span class="funding-participants">참여 인원: {{ product.participants }}명</span>
    <span class="funding-days-left">{{ daysLeft }}일 남음</span>
  </div>
</div>

          <hr class="divider" />


          <!-- 액션 버튼-->
          <div class="action-buttons">
            <button 
              @click="toggleWishlist" 
              class="btn wishlist-btn" 
              :class="{ active: isWishlisted }" 
              aria-label="찜하기"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                :fill="isWishlisted ? '#ff4b4b' : 'none'"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              찜하기
            </button>

            <template v-if="product.isLive || product.isVod">
              <button 
                class="btn live-btn" 
                :class="{'live': product.isLive, 'vod': product.isVod}"
              >
                <span v-if="product.isLive">LIVE</span>
                <span v-else>VOD</span>
              </button>
              <button @click="goToPayment" class="btn fund-btn">
                펀딩하기
              </button>
            </template>

            <button 
              v-else
              @click="goToPayment" 
              class="btn fund-btn fund-btn-full"
            >
              펀딩하기
            </button>
          </div>
        </div>
      </div>


      <!-- 상세 설명 이미지 -->
      <div v-if="product.detailImage" class="detailed-image-section">
        <img 
          :src="product.detailImage" 
          :alt="`${product.name} 상세 이미지`" 
          class="product-detail-image" 
        />
      </div>


      <!-- 많이 본 상품 -->
      <div class="most-viewed-section" v-if="mostViewedProducts.length">
        <h2>많이 본 상품</h2>
        <div class="product-list">
          <ProductItem
            v-for="product in mostViewedProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ProductItem from '@/components/ProductItem.vue';
import odungImage from '@/assets/image/오둥이하트.png';
import 더미 from '@/assets/image/logo.png';
import 내용 from '@/assets/image/세로로 긴 이미지.jpg';

export default {
  name: 'ProductDetail',
  components: {
    ProductItem,
  },
  data() {
    return {
      product: null,
      daysLeft: 0,
      isWishlisted: false,
      mostViewedProducts: [],
      isLoading: true,
      error: false,
      currentImageIndex: 0,
    };
  },
  computed: {
    hasMultipleImages() {
      return this.product && this.product.images && this.product.images.length > 1;
    },
    currentImage() {
      if (this.hasMultipleImages) {
        return this.product.images[this.currentImageIndex];
      }
      return this.product.image;
    },
  },
  created() {
    this.fetchProductDetail();
    this.fetchMostViewedProducts();
  },
  methods: {
    fetchProductDetail() {
      const productId = this.$route.params.productId;
      const allProducts = [
        { 
          id: 1,
          image: odungImage,
          detailImage: 내용,
          images: [odungImage, 더미, odungImage],
          achievement: 75,
          endDate: "2024-12-31",
          name: "라이브 상품",
          company: "회사A",
          price: 100000,
          shortDescription: "현재 라이브 방송 중인 상품입니다.",
          fundingAmount: 7500000,
          participants: 150,
          isLive: true,
          isVod: false,
          category: "생활 가전"
        },
        {
          id: 2,
          image: odungImage,
          detailImage: 내용,
          images: [odungImage, 더미, odungImage],
          achievement: 85,
          endDate: "2024-12-31",
          name: "VOD 상품",
          company: "회사B",
          price: 150000,
          shortDescription: "지난 라이브 방송을 다시 보실 수 있습니다.",
          fundingAmount: 8500000,
          participants: 180,
          isLive: false,
          isVod: true,
          category: "주방 가전"
        },
        {
          id: 3,
          image: odungImage,
          detailImage: 내용,
          images: [odungImage, 더미, odungImage],
          achievement: 60,
          endDate: "2024-12-31",
          name: "일반 상품",
          company: "회사C",
          price: 200000,
          shortDescription: "일반 펀딩 상품입니다.",
          fundingAmount: 6000000,
          participants: 120,
          isLive: false,
          isVod: false,
          category: "스마트 가전"
        }
      ];

      const foundProduct = allProducts.find(p => p.id === parseInt(productId));

      if (foundProduct) {
        this.product = foundProduct;
        const endDate = new Date(this.product.endDate);
        const today = new Date();
        const diffTime = endDate - today;
        this.daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const wishlisted = localStorage.getItem(`wishlist_${this.product.id}`);
        this.isWishlisted = wishlisted === 'true';
        this.isLoading = false;
      } else {
        this.error = true;
        this.isLoading = false;
      }
    },
    fetchMostViewedProducts() {
      this.mostViewedProducts = Array(5).fill().map((_, index) => ({
        id: 100 + index,
        image: odungImage,
        name: `많이 본 상품 ${index + 1}`,
        company: `회사${String.fromCharCode(65 + index)}`,
        price: 150000 + (index * 50000),
        shortDescription: `많이 본 상품 ${index + 1}의 설명입니다.`,
        achievement: 60 + (index * 5),
        endDate: "2024-12-31",
        isLive: index % 2 === 0
      }));
    },
    toggleWishlist() {
      this.isWishlisted = !this.isWishlisted;
      localStorage.setItem(`wishlist_${this.product.id}`, this.isWishlisted);
    },
    handleNotification() {
      alert('알림 설정 기능은 아직 구현되지 않았습니다.');
    },
    handleShare() {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('상품 URL이 클립보드에 복사되었습니다.');
        })
        .catch(err => {
          console.error('클립보드 복사 실패:', err);
        });
    },
    goToPayment() {
      this.$router.push({ name: 'Payment', query: { productId: this.product.id } });
    },
    nextImage() {
      if (this.hasMultipleImages) {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
      }
    },
    prevImage() {
      if (this.hasMultipleImages) {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
      }
    },
  },
};
</script>
<style scoped>
.product-detail-page {
 max-width: 1200px;
 margin: 0 auto;
 padding: 2rem;
 padding-bottom: 60px;
}

.product-detail-container {
 display: flex;
 flex-wrap: wrap;
 gap: 2rem;
 margin-top: 1rem;
}

.product-image-section {
 flex: 1;
 min-width: 300px;
 position: relative;
}

.image-slider {
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center; 
}.image-slider {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%; 
  overflow: hidden;
}

.product-main-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; 
  background-color: #f8f9fa; 
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 60px;
  width: 30px;
  background-color: rgba(0,0,0,0.3);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  z-index: 2;
}

.prev-button {
  left: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.next-button {
  right: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.slider-button:hover {
  background-color: rgba(0,0,0,0.5);
}

.single-image {
 display: flex;
 justify-content: center;
}

.detailed-image-section {
 margin-top: 2rem;
}

.product-detail-image {
 width: 100%;
 height: auto;
 border-radius: 8px;
 object-fit: cover;
 box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-info-section {
 flex: 1;
 min-width: 300px;
 display: flex;
 flex-direction: column;
}

.top-info {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 1rem;
}

.funding-percentage span {
 background-color: #28a745;
 color: white;
 padding: 4px 8px;
 border-radius: 4px;
 font-weight: bold;
}

.category span {
 font-size: 0.9rem;
 color: #555;
}

.icons {
 display: flex;
 gap: 0.5rem;
}

.icon-button {
 background: none;
 border: none;
 cursor: pointer;
 padding: 4px;
 border-radius: 4px;
 transition: background-color 0.3s ease;
}

.icon-button:hover {
 background-color: rgba(0, 0, 0, 0.05);
}

.icon {
 width: 20px;
 height: 20px;
}

.product-name {
 font-size: 2rem;
 margin: 0.5rem 0;
 color: #333;
}

.product-description {
 font-size: 1rem;
 color: #666;
 margin-bottom: 1rem;
}

.funding-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.price-info {
  margin-bottom: 0.5rem;
}

.funding-price {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.funding-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: #666;
}

.funding-amount,
.funding-participants,
.funding-days-left {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
}


.divider {
 border: none;
 border-top: 1px solid #ddd;
 margin: 1rem 0;
}

.action-buttons {
  display: flex; 
  gap: 1rem;
  min-height: 48px; 
  flex-wrap: nowrap; 
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: fit-content; 
}

.wishlist-btn {
  background-color: white;
  border: 2px solid #ff4b4b;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0; 
}

.wishlist-btn svg {
 width: 20px;
 height: 20px;
 stroke: #333;
 fill: none;
 stroke-width: 2;
}

.wishlist-btn.active {
 background-color: #ff4b4b;
 color: white;
}

.wishlist-btn.active svg {
 stroke: white;
 fill: #ff4b4b;
}

.live-btn {
 background-color: #dc3545;
 color: white;
}

.live-btn, .vod-btn {
  flex-shrink: 0; 
}

.fund-btn {
  background-color: #007bff;
  color: white;
  flex: 1; 
}


.fund-btn-full {
  flex: 1;
}

.btn:hover {
 opacity: 0.9;
}

.most-viewed-section {
 margin-top: 3rem;
}

.most-viewed-section h2 {
 margin-bottom: 1rem;
 color: var(--primary-color);
}

.product-list {
 display: flex;
 gap: 1rem;
 overflow-x: auto;
 padding-bottom: 1rem;
}

.product-list::-webkit-scrollbar {
 height: 8px;
}

.product-list::-webkit-scrollbar-thumb {
 background-color: rgba(0, 0, 0, 0.2);
 border-radius: 4px;
}


@media (max-width: 768px) {
 .product-detail-container {
   flex-direction: column;
   align-items: center;
 }

 .product-info-section {
   width: 100%;
 }

 .product-list {
   flex-wrap: nowrap;
 }

 .category-icons {
   flex-direction: column;
   align-items: flex-start;
 }
 .action-buttons {
    min-height: 40px; 
    gap: 0.5rem; 
  }

  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem; 
  }
}


.loading-spinner {
 display: flex;
 flex-direction: column;
 align-items: center;
 margin: 2rem 0;
}

.spinner {
 animation: rotate 2s linear infinite;
 width: 50px;
 height: 50px;
}

.path {
 stroke: #007bff;
 stroke-linecap: round;
 animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
 100% {
   transform: rotate(360deg);
 }
}

@keyframes dash {
 0% {
   stroke-dasharray: 1, 150;
   stroke-dashoffset: 0;
 }
 50% {
   stroke-dasharray: 90, 150;
   stroke-dashoffset: -35;
 }
 100% {
   stroke-dasharray: 90, 150;
   stroke-dashoffset: -124;
 }
}


.error-message {
 color: red;
 text-align: center;
 margin: 2rem 0;
}
</style>