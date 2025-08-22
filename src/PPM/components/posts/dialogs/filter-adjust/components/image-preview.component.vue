<template>
  <div class="preview-container">
    <div class="image-preview">
      <img
          :src="imageUrl"
          :alt="'Vista previa con filtros'"
          :class="selectedFilter"
          :style="adjustmentStyle"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePreview',
  props: {
    imageUrl: String,
    selectedFilter: String,
    adjustments: Object
  },
  computed: {
    adjustmentStyle() {
      return {
        filter: `
          brightness(${this.adjustments.brightness}%)
          contrast(${this.adjustments.contrast}%)
          saturate(${this.adjustments.saturation}%)
          opacity(${100 - this.adjustments.fade}%)
        `,
        transform: this.adjustments.warmth > 0
            ? `sepia(${this.adjustments.warmth}%) hue-rotate(-${this.adjustments.warmth/2}deg)`
            : `sepia(${Math.abs(this.adjustments.warmth)}%) hue-rotate(${Math.abs(this.adjustments.warmth)/2}deg)`
      };
    }
  }
};
</script>

<style scoped>
.preview-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.image-preview {
  max-width: 100%;
  max-height: 100%;
}

.image-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

@media (max-width: 991px) {
  .preview-container {
    height: 40vh;
  }
}
</style>