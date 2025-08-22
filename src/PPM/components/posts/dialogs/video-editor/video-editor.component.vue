<!-- src/PPM/components/posts/dialogs/video-editor-dialog.vue -->
<template>
  <pv-dialog
      :visible="visible"
      :modal="true"
      :closable="true"
      :style="{ width: '70rem', maxWidth: '95vw' }"
      :breakpoints="{ '1199px': '80vw', '575px': '95vw' }"
      @update:visible="$emit('close')"
  >
    <template #header>
      <h3>Editar video</h3>
    </template>

    <div class="video-editor-content">
      <div class="editor-container">
        <VideoPreview
            :video-url="videoUrl"
            :thumbnail-preview="thumbnailPreview"
            @loaded="onVideoLoaded"
            @timeupdate="onTimeUpdate"
            ref="videoPreview"
        />

        <div class="editor-controls">
          <!-- Controles de recorte -->
          <TrimControls
              :start="trimStart"
              :end="trimEnd"
              :duration="videoDuration"
              @update:start="trimStart = $event"
              @update:end="trimEnd = $event"
          />

          <!-- Controles de miniatura -->
          <ThumbnailControls
              :thumbnail-time="thumbnailTime"
              :duration="videoDuration"
              @update:thumbnailTime="updateThumbnailTime"
              @capture-current="captureCurrentFrame"
              @upload-thumbnail="handleUploadedThumbnail"
          />

          <!-- Botones de acción -->
          <EditorActions
              @reset="resetSettings"
              @apply="applyChanges"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="editor-footer">
        <pv-button
            label="volver"
            class="p-button-text"
            @click="$emit('go-back')"
            icon="pi pi-arrow-left"
        />

        <pv-button
            label="Siguiente"
            @click="$emit('proceed')"
            icon="pi pi-arrow-right"
        />
      </div>
    </template>
  </pv-dialog>
</template>

<script>
import VideoPreview from '../video-editor/components/video-preview.component.vue';
import TrimControls from '../video-editor/components/trim-controls.component.vue';
import ThumbnailControls from '../video-editor/components/thumbnail-controls.component.vue';
import EditorActions from '../video-editor/components/editor-actions.component.vue';

export default {
  name: 'VideoEditorDialog',
  components: {
    VideoPreview,
    TrimControls,
    ThumbnailControls,
    EditorActions
  },
  props: {
    visible: Boolean,
    videoUrl: String
  },
  data() {
    return {
      videoDuration: 0,
      trimStart: 0,
      trimEnd: 0,
      thumbnailTime: 0,
      thumbnailPreview: null,
      customThumbnailFile: null // Almacenar el archivo de miniatura personalizada
    };
  },
  watch: {
    trimStart(newVal) {
      if (newVal > this.trimEnd) {
        this.trimEnd = newVal;
      }
    },
    trimEnd(newVal) {
      if (newVal < this.trimStart) {
        this.trimStart = newVal;
      }
    }
  },
  methods: {
    onVideoLoaded() {
      this.videoDuration = this.$refs.videoPreview.getVideoElement().duration;
      this.trimEnd = this.videoDuration;
    },
    onTimeUpdate(currentTime) {
      this.thumbnailTime = currentTime;
    },
    updateThumbnailTime(time) {
      this.thumbnailTime = time;
      this.$refs.videoPreview.setCurrentTime(time);
      this.captureThumbnail();
    },
    captureCurrentFrame() {
      this.thumbnailTime = this.$refs.videoPreview.getVideoElement().currentTime;
      this.captureThumbnail();
    },
    captureThumbnail() {
      const video = this.$refs.videoPreview.getVideoElement();
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.thumbnailPreview = canvas.toDataURL('image/jpeg');
      this.customThumbnailFile = null; // Resetear miniatura personalizada al capturar del video
    },
    // Manejar la miniatura subida por el usuario
    handleUploadedThumbnail(uploadData) {
      this.thumbnailPreview = uploadData.previewUrl;
      this.customThumbnailFile = uploadData.file;
    },
    resetSettings() {
      this.trimStart = 0;
      this.trimEnd = this.videoDuration;
      this.thumbnailTime = 0;
      this.thumbnailPreview = null;
      this.customThumbnailFile = null;
      if (this.$refs.videoPreview) {
        this.$refs.videoPreview.setCurrentTime(0);
      }
    },
    applyChanges() {
      this.$emit('apply-changes', {
        trimStart: this.trimStart,
        trimEnd: this.trimEnd,
        thumbnail: this.thumbnailPreview,
        thumbnailFile: this.customThumbnailFile // Incluir el archivo de miniatura personalizada
      });
    }
  }
};
</script>

<style scoped>
.video-editor-content {
  padding: 1.5rem;
}

.editor-container {
  display: flex;
  gap: 1.5rem;
  height: 60vh;
  max-height: 500px;
}

.editor-controls {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.editor-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

@media (max-width: 900px) {
  .editor-container {
    flex-direction: column;
    height: auto;
    max-height: none;
  }

  .editor-controls {
    width: 100%;
    max-height: 300px;
  }
}

@media (max-width: 575px) {
  .video-editor-content {
    padding: 1rem;
  }
}
</style>