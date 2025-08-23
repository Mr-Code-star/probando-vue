<template>
  <div class="media-preview">
    <img
        v-if="isImage"
        :src="currentMediaUrl"
        alt="Preview"
        class="preview-image"
        :style="imageStyle"
    >
    <video
        v-else-if="isVideo"
        :src="currentMediaUrl"
        controls
        class="preview-video"
    ></video>
  </div>
</template>

<script>
export default {
  name: 'MediaPreview',
  props: {
    mediaFiles: Array,
    currentMediaIndex: Number,
    filterSettings: Object
  },
  computed: {

    currentMedia() {
      return this.mediaFiles[this.currentMediaIndex] || null;
    },
    currentMediaUrl() {
      return this.currentMedia ? URL.createObjectURL(this.currentMedia) : '';
    },
    isImage() {
      return this.currentMedia && this.currentMedia.type.startsWith('image/');
    },
    isVideo() {
      return this.currentMedia && this.currentMedia.type.startsWith('video/');
    },

    imageStyle() {
      if (!this.filterSettings || !this.isImage) return {};

      const style = {};

      // Aplicar filtros CSS
      if (this.filterSettings.filter && this.filterSettings.filter !== 'normal') {
        style.filter = this.getFilterStyle(this.filterSettings.filter);
      }

      // Aplicar ajustes
      const adjustments = this.filterSettings.adjustments || {};
      if (Object.keys(adjustments).length > 0) {
        style.filter = style.filter ? style.filter + ' ' : '';
        style.filter += this.getAdjustmentsStyle(adjustments);
      }

      return style;
    }
  },
  methods: {
    getFilterStyle(filterClass) {
      // Mapear nombres de filtro a valores CSS
      const filterMap = {
        'filter-aden': 'sepia(0.2) brightness(1.15) saturate(1.4)',
        'filter-clarendon': 'contrast(1.2) saturate(1.35)',
        'filter-crema': 'sepia(0.5) contrast(1.25) brightness(1.15) saturate(0.9)',
        'filter-gingham': 'brightness(1.05) hue-rotate(350deg)',
        'filter-juno': 'sepia(0.35) contrast(1.15) brightness(1.15) saturate(1.8)',
        'filter-lark': 'contrast(0.9) brightness(1.1) saturate(1.1)'
      };

      return filterMap[filterClass] || 'none';
    },

    getAdjustmentsStyle(adjustments) {
      const styles = [];

      if (adjustments.brightness !== 100) {
        styles.push(`brightness(${adjustments.brightness / 100})`);
      }
      if (adjustments.contrast !== 100) {
        styles.push(`contrast(${adjustments.contrast / 100})`);
      }
      if (adjustments.saturation !== 100) {
        styles.push(`saturate(${adjustments.saturation / 100})`);
      }

      return styles.join(' ');
    }
  }
};
</script>

<style scoped>
.media-preview {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
}

.preview-image, .preview-video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

@media (max-width: 768px) {
  .media-preview {
    height: 300px;
  }
}
</style>