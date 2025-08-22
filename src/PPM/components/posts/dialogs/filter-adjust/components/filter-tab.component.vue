<template>
  <div class="filters-grid">
    <div
        v-for="filter in filters"
        :key="filter.name"
        :class="['filter-item', { selected: selectedFilter === filter.class }]"
        @click="$emit('select-filter', filter.class)"
    >
      <div class="filter-preview">
        <img
            :src="imageUrl"
            :alt="filter.name"
            :class="filter.class"
        >
      </div>
      <span class="filter-name">{{ filter.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterTab',
  props: {
    imageUrl: String,
    filters: Array,
    selectedFilter: String
  },
  emits: ['select-filter']
};
</script>

<style scoped>
.filters-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.filter-item {
  cursor: pointer;
  text-align: center;
}

.filter-item.selected {
  border: 2px solid #4263eb;
  border-radius: 6px;
}

.filter-preview {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.filter-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.filter-name {
  font-size: 0.8rem;
  color: #495057;
}

@media (max-width: 575px) {
  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .filter-preview {
    width: 60px;
    height: 60px;
  }
}
</style>