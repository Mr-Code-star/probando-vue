<template>
  <div class="filter-preview-container">
    <div class="preview-wrapper" :style="wrapperStyle">
      <img
          :src="imageData.imageUrl"
          :alt="'Imagen con filtro'"
          :style="imageStyle"
          class="filter-preview-image"
      />
    </div>

    <div class="filter-info" v-if="imageData">
      <div class="info-item">
        <span class="label">Zoom:</span>
        <span class="value">{{ imageData.zoomLevel }}%</span>
      </div>
      <div class="info-item">
        <span class="label">Rotación:</span>
        <span class="value">{{ imageData.rotation }}°</span>
      </div>
      <div class="info-item">
        <span class="label">Aspecto:</span>
        <span class="value">{{ getAspectRatioText(imageData.aspectRatio) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePreviewOfFilter',
  props: {
    imageData: {
      type: Object,
      default: () => ({
        imageUrl: '',
        zoomLevel: 100,
        rotation: 0,
        aspectRatio: 'original',
        cropData: null
      })
    },
    filterSettings: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    wrapperStyle() {
      return {
        width: '100%',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        marginBottom: '1rem'
      };
    },

    imageStyle() {
      const style = {
        transform: `scale(${this.imageData.zoomLevel / 100}) rotate(${this.imageData.rotation}deg)`,
        transition: 'transform 0.3s ease',
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain'
      };

      // Aplicar relación de aspecto si no es original
      if (this.imageData.aspectRatio !== 'original') {
        style.aspectRatio = this.getAspectRatioValue(this.imageData.aspectRatio);
      }

      // Aplicar filtros CSS si existen
      if (this.filterSettings) {
        const filters = [];
        if (this.filterSettings.brightness !== undefined) {
          filters.push(`brightness(${this.filterSettings.brightness}%)`);
        }
        if (this.filterSettings.contrast !== undefined) {
          filters.push(`contrast(${this.filterSettings.contrast}%)`);
        }
        if (this.filterSettings.saturation !== undefined) {
          filters.push(`saturate(${this.filterSettings.saturation}%)`);
        }
        if (this.filterSettings.hue !== undefined) {
          filters.push(`hue-rotate(${this.filterSettings.hue}deg)`);
        }
        if (this.filterSettings.blur !== undefined) {
          filters.push(`blur(${this.filterSettings.blur}px)`);
        }

        if (filters.length > 0) {
          style.filter = filters.join(' ');
        }
      }

      return style;
    }
  },
  methods: {
    getAspectRatioText(ratio) {
      switch(ratio) {
        case '1:1': return '1:1 (Cuadrado)';
        case '4:5': return '4:5 (Vertical)';
        case '16:9': return '16:9 (Panorámico)';
        default: return 'Original';
      }
    },

    getAspectRatioValue(ratio) {
      switch(ratio) {
        case '1:1': return '1/1';
        case '4:5': return '4/5';
        case '16:9': return '16/9';
        default: return 'auto';
      }
    }
  }
};
</script>

<style scoped>
.filter-preview-container {
  width: 100%;
  padding: 1rem;
}

.preview-wrapper {
  border: 2px solid #e9ecef;
  background: linear-gradient(45deg, #f8f9fa 25%, transparent 25%,
  transparent 75%, #f8f9fa 75%),
  linear-gradient(45deg, #f8f9fa 25%, transparent 25%,
      transparent 75%, #f8f9fa 75%);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}

.filter-preview-image {
  display: block;
  transition: all 0.3s ease;
}

.filter-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.85rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  font-weight: 600;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.value {
  color: #495057;
  font-weight: 500;
}

@media (max-width: 768px) {
  .preview-wrapper {
    height: 250px;
  }

  .filter-info {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .preview-wrapper {
    height: 200px;
  }

  .filter-info {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>