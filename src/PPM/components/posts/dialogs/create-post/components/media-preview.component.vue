<template>
  <div class="media-preview">
    <img v-if="isImage" :src="currentMediaUrl" alt="Preview" class="preview-image">
    <video v-else-if="isVideo" :src="currentMediaUrl" controls class="preview-video"></video>
  </div>
</template>

<script>
export default {
  name: 'MediaPreview',
  props: {
    mediaFiles: Array,
    currentMediaIndex: Number
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