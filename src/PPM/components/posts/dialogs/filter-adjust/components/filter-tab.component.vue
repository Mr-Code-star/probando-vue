<template>
  <div class="filters-container">
    <h4 class="filters-title">Seleccionar filtro</h4>
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
              :style="getFilterStyle(filter.class)"
          >
        </div>
        <span class="filter-name">{{ filter.name }}</span>
      </div>
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
  emits: ['select-filter'],
  methods: {
    getFilterStyle(filterClass) {
      switch(filterClass) {
        case 'filter-aden':
          return { filter: 'sepia(0.2) brightness(1.15) saturate(1.4)' };
        case 'filter-clarendon':
          return { filter: 'contrast(1.2) saturate(1.35)' };
        case 'filter-crema':
          return { filter: 'sepia(0.5) contrast(1.25) brightness(1.15) saturate(0.9)' };
        case 'filter-gingham':
          return { filter: 'brightness(1.05) contrast(1.1)' };
        case 'filter-juno':
          return { filter: 'sepia(0.35) contrast(1.15) brightness(1.15) saturate(1.8)' };
        case 'filter-lark':
          return { filter: 'contrast(0.9) brightness(1.1) saturate(1.1)' };
        case 'normal':
        default:
          return { filter: 'none' };
      }
    }
  }
};
</script>

<style scoped>
.filters-container {
  padding: 0.5rem;
}

.filters-title {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #495057;
  text-align: center;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-items: center;
}

.filter-item {
  cursor: pointer;
  text-align: center;
  width: 100%;
  max-width: 100px;
  transition: transform 0.2s ease;
}

.filter-item:hover {
  transform: translateY(-3px);
}

.filter-item.selected {
  border: 2px solid #4263eb;
  border-radius: 8px;
  padding: 4px;
}

.filter-preview {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 6px;
  margin: 0 auto 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.filter-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.filter-name {
  font-size: 0.8rem;
  color: #495057;
  font-weight: 500;
  display: block;
  text-align: center;
}

/* Media queries para responsividad */
@media (max-width: 768px) {
  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .filter-preview {
    width: 70px;
    height: 70px;
  }
}

@media (max-width: 480px) {
  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .filter-item {
    max-width: 85px;
  }

  .filter-preview {
    width: 60px;
    height: 60px;
  }

  .filter-name {
    font-size: 0.75rem;
  }
}

@media (max-width: 360px) {
  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .filter-item {
    max-width: 75px;
  }

  .filter-preview {
    width: 50px;
    height: 50px;
  }
}
</style>