<template>
  <div class="image-preview-container" :style="containerStyle">
    <img
        :src="currentImageUrl"
        :alt="'Imagen en edición'"
        :style="imageStyle"
        class="preview-image"
    />
  </div>
</template>

<script>
export default {
  name: 'ImagePreview',
  props: {
    currentImageUrl: String,
    zoomLevel: Number,
    rotation: Number,
    aspectRatio: String
  },
  computed: {
    containerStyle() {
      return {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      };
    },
    imageStyle() {
      const style = {
        transform: `scale(${this.zoomLevel / 100}) rotate(${this.rotation}deg)`,
        transition: 'transform 0.3s ease',
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain'
      };

      // Aplicar relación de aspecto
      switch (this.aspectRatio) {
        case '1:1':
          style.aspectRatio = '1/1';
          break;
        case '4:5':
          style.aspectRatio = '4/5';
          break;
        case '16:9':
          style.aspectRatio = '16/9';
          break;
        case 'original':
        default:
          // Mantener relación original
          break;
      }

      return style;
    }
  }
};
</script>

<style scoped>
.image-preview-container {
  background: transparent;
}

.preview-image {
  display: block;
}
</style>