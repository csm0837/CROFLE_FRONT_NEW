<!-- src/views/main/Home.vue -->
<template>
  <div class="home">


    <!-- 배너 슬라이더 -->
    <BannerSlider />


    <!-- 카테고리 리스트 -->
    <CategoryList />


    <!-- 랭킹 상품 섹션 -->
    <section class="ranking-section" v-if="!isLoading && !error">
      <h2>실시간 인기 상품</h2>
      <div class="product-grid">
        <ProductItem
          v-for="(product, index) in rankingProducts"
          :key="product.id"
          :product="product"
          :rank="index + 1"
        />
      </div>
    </section>


    <!-- 라이브 상품 섹션 -->
    <section class="live-section" v-if="!isLoading && !error">
      <h2>라이브 상품</h2>
      <div class="product-grid">
        <ProductItem
          v-for="product in liveProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>


    <!-- AI 추천 상품 섹션 -->
    <section class="ai-recommendation-section" v-if="!isLoading && !error">
      <h2>AI 추천 상품</h2>
      <div class="product-grid">
        <ProductItem
          v-for="product in aiRecommendedProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>


    <!-- 로딩 상태 표시 -->
    <div v-if="isLoading" class="loading">
      로딩 중...
    </div>


    <!-- 에러 상태 표시 -->
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import BannerSlider from '@/components/BannerSlider.vue';
import CategoryList from '@/components/CategoryList.vue';
import ProductItem from '@/components/ProductItem.vue';
import odungImage from '@/assets/image/오둥이하트.png'; 

export default {
  name: 'Home',
  components: {
    BannerSlider,
    CategoryList,
    ProductItem,
  },
  setup() {
    const rankingProducts = ref([]);
    const liveProducts = ref([]);
    const aiRecommendedProducts = ref([]);

    const isLoading = ref(true);
    const error = ref(null);

    const dummyRankingProducts = [
      { id: 31, image: odungImage, achievement: 60, endDate: "2024-12-05", name: "랭킹 상품1", company: "회사EE", price: 110000 },
      { id: 32, image: odungImage, achievement: 75, endDate: "2024-11-10", name: "랭킹 상품2", company: "회사FF", price: 180000 },
      { id: 33, image: odungImage, achievement: 85, endDate: "2024-12-01", name: "랭킹 상품3", company: "회사GG", price: 230000 },
      { id: 34, image: odungImage, achievement: 70, endDate: "2024-10-25", name: "랭킹 상품4", company: "회사HH", price: 160000 },
      { id: 35, image: odungImage, achievement: 90, endDate: "2024-11-15", name: "랭킹 상품5", company: "회사II", price: 300000 },
      { id: 36, image: odungImage, achievement: 68, endDate: "2024-09-30", name: "랭킹 상품6", company: "회사JJ", price: 140000 },
      { id: 37, image: odungImage, achievement: 80, endDate: "2024-12-20", name: "랭킹 상품7", company: "회사KK", price: 250000 },
      { id: 38, image: odungImage, achievement: 72, endDate: "2024-10-18", name: "랭킹 상품8", company: "회사LL", price: 200000 },
      { id: 39, image: odungImage, achievement: 82, endDate: "2024-11-22", name: "랭킹 상품9", company: "회사MM", price: 270000 },
      { id: 40, image: odungImage, achievement: 77, endDate: "2024-09-25", name: "랭킹 상품10", company: "회사NN", price: 220000 },
     
    ];

    const dummyLiveProducts = [
      { id: 1, image: odungImage, achievement: 75, endDate: "2024-12-31", name: "라이브 상품1", company: "회사A", price: 100000, isLive: true },
      { id: 2, image: odungImage, achievement: 60, endDate: "2024-11-30", name: "라이브 상품2", company: "회사B", price: 200000, isLive: true },
      { id: 3, image: odungImage, achievement: 80, endDate: "2024-10-20", name: "라이브 상품3", company: "회사C", price: 250000, isLive: true },
      { id: 4, image: odungImage, achievement: 55, endDate: "2024-09-10", name: "라이브 상품4", company: "회사D", price: 270000, isLive: true },
      { id: 5, image: odungImage, achievement: 90, endDate: "2024-12-15", name: "라이브 상품5", company: "회사E", price: 350000, isLive: true },
      { id: 6, image: odungImage, achievement: 70, endDate: "2024-11-25", name: "라이브 상품6", company: "회사F", price: 150000, isLive: true },
      { id: 7, image: odungImage, achievement: 85, endDate: "2024-10-30", name: "라이브 상품7", company: "회사G", price: 300000, isLive: true },
      { id: 8, image: odungImage, achievement: 65, endDate: "2024-09-20", name: "라이브 상품8", company: "회사H", price: 220000, isLive: true },
      { id: 9, image: odungImage, achievement: 78, endDate: "2024-11-05", name: "라이브 상품9", company: "회사I", price: 180000, isLive: true },
      { id: 10, image: odungImage, achievement: 82, endDate: "2024-12-10", name: "라이브 상품10", company: "회사J", price: 260000, isLive: true },
      { id: 11, image: odungImage, achievement: 68, endDate: "2024-10-15", name: "라이브 상품11", company: "회사K", price: 190000, isLive: true },
      { id: 12, image: odungImage, achievement: 73, endDate: "2024-09-25", name: "라이브 상품12", company: "회사L", price: 210000, isLive: true },
      { id: 13, image: odungImage, achievement: 88, endDate: "2024-11-20", name: "라이브 상품13", company: "회사M", price: 310000, isLive: true },
      { id: 14, image: odungImage, achievement: 59, endDate: "2024-10-05", name: "라이브 상품14", company: "회사N", price: 170000, isLive: true },
      { id: 15, image: odungImage, achievement: 92, endDate: "2024-12-20", name: "라이브 상품15", company: "회사O", price: 400000, isLive: true },
      { id: 16, image: odungImage, achievement: 77, endDate: "2024-11-15", name: "라이브 상품16", company: "회사P", price: 240000, isLive: true },
      { id: 17, image: odungImage, achievement: 69, endDate: "2024-09-30", name: "라이브 상품17", company: "회사Q", price: 200000, isLive: true },
      { id: 18, image: odungImage, achievement: 83, endDate: "2024-10-25", name: "라이브 상품18", company: "회사R", price: 280000, isLive: true },
      { id: 19, image: odungImage, achievement: 74, endDate: "2024-11-05", name: "라이브 상품19", company: "회사S", price: 230000, isLive: true },
      { id: 20, image: odungImage, achievement: 81, endDate: "2024-12-08", name: "라이브 상품20", company: "회사T", price: 290000, isLive: true },
    ];

    const dummyAIRecommendedProducts = [
      { id: 21, image: odungImage, achievement: 85, endDate: "2024-11-10", name: "AI 추천 상품1", company: "회사U", price: 320000 },
      { id: 22, image: odungImage, achievement: 75, endDate: "2024-10-18", name: "AI 추천 상품2", company: "회사V", price: 270000 },
      { id: 23, image: odungImage, achievement: 65, endDate: "2024-11-12", name: "AI 추천 상품3", company: "회사W", price: 230000 },
      { id: 24, image: odungImage, achievement: 80, endDate: "2024-12-01", name: "AI 추천 상품4", company: "회사X", price: 250000 },
      { id: 25, image: odungImage, achievement: 70, endDate: "2024-10-22", name: "AI 추천 상품5", company: "회사Y", price: 210000 },
      { id: 26, image: odungImage, achievement: 90, endDate: "2024-11-30", name: "AI 추천 상품6", company: "회사Z", price: 350000 },
      { id: 27, image: odungImage, achievement: 68, endDate: "2024-09-28", name: "AI 추천 상품7", company: "회사AA", price: 190000 },
      { id: 28, image: odungImage, achievement: 82, endDate: "2024-12-12", name: "AI 추천 상품8", company: "회사BB", price: 280000 },
      { id: 29, image: odungImage, achievement: 77, endDate: "2024-10-10", name: "AI 추천 상품9", company: "회사CC", price: 240000 },
      { id: 30, image: odungImage, achievement: 73, endDate: "2024-11-25", name: "AI 추천 상품10", company: "회사DD", price: 220000 },
      { id: 31, image: odungImage, achievement: 84, endDate: "2024-09-15", name: "AI 추천 상품11", company: "회사EE", price: 260000 },
      { id: 32, image: odungImage, achievement: 66, endDate: "2024-12-20", name: "AI 추천 상품12", company: "회사FF", price: 200000 },
      { id: 33, image: odungImage, achievement: 79, endDate: "2024-10-05", name: "AI 추천 상품13", company: "회사GG", price: 250000 },
      { id: 34, image: odungImage, achievement: 71, endDate: "2024-11-18", name: "AI 추천 상품14", company: "회사HH", price: 230000 },
      { id: 35, image: odungImage, achievement: 88, endDate: "2024-12-25", name: "AI 추천 상품15", company: "회사II", price: 300000 },
      { id: 36, image: odungImage, achievement: 62, endDate: "2024-10-30", name: "AI 추천 상품16", company: "회사JJ", price: 180000 },
      { id: 37, image: odungImage, achievement: 76, endDate: "2024-11-22", name: "AI 추천 상품17", company: "회사KK", price: 240000 },
      { id: 38, image: odungImage, achievement: 69, endDate: "2024-09-20", name: "AI 추천 상품18", company: "회사LL", price: 210000 },
      { id: 39, image: odungImage, achievement: 81, endDate: "2024-12-08", name: "AI 추천 상품19", company: "회사MM", price: 290000 },
      { id: 40, image: odungImage, achievement: 74, endDate: "2024-10-12", name: "AI 추천 상품20", company: "회사NN", price: 220000 },
    ];

    const fetchData = async () => {
      try {

        rankingProducts.value = dummyRankingProducts;
        liveProducts.value = dummyLiveProducts;
        aiRecommendedProducts.value = dummyAIRecommendedProducts;

      } catch (err) {
        error.value = '데이터를 불러오는 중 오류가 발생했습니다.';
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      rankingProducts,
      liveProducts,
      aiRecommendedProducts,
      isLoading,
      error,
    };
  },
};
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

section {
  margin-bottom: 40px;
}

h2 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--primary-color);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.ranking-section .product-grid {
  grid-template-columns: repeat(5, 1fr); 
}

@media (max-width: 1024px) {
  .ranking-section .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .ranking-section .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .ranking-section .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: var(--secondary-color);
  margin-top: 20px;
}

.error {
  text-align: center;
  font-size: 1.2rem;
  color: red;
  margin-top: 20px;
}
</style>
