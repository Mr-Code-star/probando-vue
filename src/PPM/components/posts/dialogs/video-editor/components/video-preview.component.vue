<template>
  <div class="video-preview-container">
    <video
        ref="videoPlayer"
        :src="videoUrl"
        controls
        class="video-preview"
        @loadedmetadata="$emit('loaded')"
        @timeupdate="$emit('timeupdate', $event.target.currentTime)"
    ></video>

    <!-- Vista previa de la miniatura seleccionada -->
    <div v-if="thumbnailPreview" class="thumbnail-preview">
      <h4>Miniatura seleccionada:</h4>
      <img :src="thumbnailPreview" alt="Miniatura del video" class="thumbnail-image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoPreview',
  props: {
    videoUrl: String,
    thumbnailPreview: String
  },
  emits: ['loaded', 'timeupdate'],
  methods: {
    setCurrentTime(time) {
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.currentTime = time;
      }
    },
    getVideoElement() {
      return this.$refs.videoPlayer;
    }
  }
};
</script>

<style scoped>
.video-preview-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  padding: 1rem;
  gap: 1rem; /* Añadimos espacio entre elementos */
}

.video-preview {
  width: 100%;
  flex: 1;
  border-radius: 8px;
  background: black;
  min-height: 200px; /* Altura mínima para evitar colapso */
}

.thumbnail-preview {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  width: 100%;
  box-sizing: border-box;
}

.thumbnail-preview h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #212529;
}

.thumbnail-image {
  width: 100%;
  max-width: 200px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

/* Estilos específicos para desktop */
@media (min-width: 576px) {
  .thumbnail-preview {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .thumbnail-preview h4 {
    margin: 0;
    min-width: 150px;
    text-align: left;
  }

  .thumbnail-image {
    max-width: 150px;
    margin: 0; /* Eliminar márgenes que puedan ocultar la imagen */
  }
}

/* Asegurar que el contenedor principal se adapte bien */
@media (max-width: 575px) {
  .video-preview-container {
    padding: 0.5rem;
  }

  .thumbnail-preview {
    padding: 0.75rem;
  }
}
</style>