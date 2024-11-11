<template>
  <div class="banner-slider">


    <!-- 배너 이미지 슬라이드 -->
    <div class="slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <img
        v-for="(banner, index) in banners"
        :key="index"
        :src="banner"
        alt="Banner Image"
        class="slide-image"
      />
    </div>


    <!-- 내비게이션 화살표 -->
    <button @click="prevSlide" class="arrow left-arrow">&lt;</button>
    <button @click="nextSlide" class="arrow right-arrow">&gt;</button>


    <!-- 슬라이드 인디케이터 -->
    <div class="slide-indicator">
      {{ currentSlide + 1 }} / {{ banners.length }}
    </div>
  </div>
</template>

<script>
import banner1 from '@/assets/image/배너1.jpg';
import banner2 from '@/assets/image/배너2.jpg';
import banner3 from '@/assets/image/배너3.jpg';

export default {
  name: 'BannerSlider',
  data() {
    return {
      banners: [banner1, banner2, banner3],
      currentSlide: 0
    };
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.banners.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.banners.length) % this.banners.length;
    }
  },
  mounted() {
    this.slideInterval = setInterval(this.nextSlide, 3000);
  },
};
</script>

<style scoped>
.banner-slider {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 300px;
  overflow: hidden;
  margin: auto;
}

.slides {
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.left-arrow {
  left: 0;
}

.right-arrow {
  right: 0;
}

.slide-indicator {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>