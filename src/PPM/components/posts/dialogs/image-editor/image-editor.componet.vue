<template>
  <pv-dialog
      :visible="visible"
      :modal="true"
      :closable="true"
      :style="{ width: '70rem', maxWidth: '95vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      @update:visible="$emit('close')"
  >
    <template #header>
      <div class="dialog-header">
        <h3>Editar imagen</h3>
        <div class="image-counter" v-if="uploadedImages.length > 1">
          {{ currentImageIndex + 1 }} / {{ uploadedImages.length }}
        </div>
      </div>
    </template>

    <div class="image-editor-content">
      <div class="editor-container">
        <div class="image-container" :style="containerStyle">
          <ImagePreview
              v-if="currentAspectRatio==='original'"
              :current-image-url="currentImageUrl"
              :zoom-level="currentZoomLevel"
              :rotation="currentRotation"
              :aspect-ratio="currentAspectRatio"
          />
          <croop-overlay
              v-else
              :imageUrl="currentImageUrl"
              :aspectRatio="currentAspectRatio"
              :zoomLevel="currentZoomLevel"
              :rotation="currentRotation"
          />

        </div>
      </div>

      <div class="editor-controls">
        <EditControls
            :zoom-level="currentZoomLevel"
            :aspect-ratio="currentAspectRatio"
            @update:zoom-level="updateZoomLevel"
            @update:aspectRatio="updateAspectRatio"
            @adjust-zoom="adjustZoom"
        />
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
            label="Aceptar"
            icon="pi pi-check"
            @click="acceptImage"
        />
      </div>
    </template>
  </pv-dialog>
</template>

<script>
import ImagePreview from "../image-editor/components/image-preview.component.vue";
import EditControls from "../image-editor/components/edit-controls.coponent.vue";
import CroopOverlay from "../image-editor/components/croop-overlay.component.vue";
export default {
  name: 'ImageEditorDialog',
  components: {
    CroopOverlay,
    EditControls,
    ImagePreview,
  },
  props: {
    visible: Boolean,
    uploadedImages: {
      type: Array,
      default: () => []
    },
    currentImageIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentZoomLevel: 100,
      currentAspectRatio: 'original',
      localImageIndex: 0,
      currentRotation: 0,
      cropOverlayRef: null
    };
  },
  computed: {
    currentImageUrl() {
      if (this.uploadedImages.length > 0 && this.localImageIndex >= 0) {
        return this.uploadedImages[this.localImageIndex].url;
      }
      return '';
    },
    containerStyle() {
      return {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'transparent'
      };
    }
  },
  watch: {
    currentImageIndex: {
      immediate: true,
      handler(newIndex) {
        this.localImageIndex = newIndex;
      }
    }
  },
  methods: {
    adjustZoom(amount) {
      this.currentZoomLevel = Math.max(10, Math.min(200, this.currentZoomLevel + amount));
    },

    updateZoomLevel(value) {
      this.currentZoomLevel = value;
    },
    updateAspectRatio(value) {
      this.currentAspectRatio = value;
    },
    getCropData() {
      if (this.currentAspectRatio !== 'original' && this.cropOverlayRef) {
        return {
          position: { ...this.cropOverlayRef.position },
          aspectRatio: this.currentAspectRatio
        };
      }
      return null;
    },
    acceptImage() {
      const editedImageData = {
        imageUrl: this.currentImageUrl,
        zoomLevel: this.currentZoomLevel,
        rotation: this.currentRotation,
        aspectRatio: this.currentAspectRatio,
        cropData: this.getCropData()
      };

      this.$emit('accept-image', editedImageData);
    },
  }
};
</script>

<style scoped>
.image-editor-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.editor-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 50vh;
  max-height: 500px;
}

.image-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: transparent; /* Cambiado de #f8f9fa a transparente */
  border-radius: 8px;
  position: relative;
  border: none; /* Eliminado el borde blanco */
}

.editor-controls {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.editor-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

/* Estilos responsivos mejorados */
@media (min-width: 992px) {
  .image-editor-content {
    flex-direction: row;
  }

  .editor-container {
    flex: 1;
    height: 60vh;
  }

  .editor-controls {
    width: 320px;
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 991px) {
  .editor-container {
    height: 40vh;
  }
}

@media (max-width: 575px) {
  .image-editor-content {
    padding: 1rem;
  }

  .editor-container {
    height: 35vh;
  }
}
</style>