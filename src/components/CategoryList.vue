<template>
  <div class="category-list">
    <h2>카테고리</h2>
    <ul class="categories">
      <li
        v-for="category in categories"
        :key="category.name"
        class="category-item"
        @click="selectCategory(category.name)"
      >
        <div class="category-logo">
          <img src="../assets/image/오둥이하트.png" :alt="`${category.name} 로고`" />
        </div>
        <span class="category-name">{{ category.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data() {
    return {
      categories: [
        { name: '생활 가전' },
        { name: '주방 가전' },
        { name: '스마트 가전' },
        { name: 'DIY' },
        { name: '엔터테인먼트' },
        { name: '웨어러블' },
        { name: '주변 기기' },
      ],
    };
  },
  methods: {
    selectCategory(categoryName) {
      this.$router.push({ name: 'SearchResults', query: { q: categoryName, type: 'category' } });
    },
  },
};
</script>

<style scoped>
.category-list {
  text-align: center;
  margin: 2rem auto;
  max-width: 1200px;
  padding: 0 20px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
  gap: 1rem;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.category-item:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-5px);
}

.category-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.category-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-name {
  font-size: 0.9rem;
  font-weight: bold;
}
</style>