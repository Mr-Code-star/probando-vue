
<!-- image-editor.component.vue -->
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
      </div>
    </template>

    <div class="image-editor-content">
      <div class="editor-container">
        <div class="image-container" :style="containerStyle">
          <ImagePreview
              v-if="currentAspectRatio === 'original'"
              :currentImageUrl="currentImageUrl"
              :zoomLevel="currentZoomLevel"
              :rotation="currentRotation"
              :aspectRatio="currentAspectRatio"
          />

          <CropOverlay
              v-else
              :imageUrl="currentImageUrl"
              :aspectRatio="currentAspectRatio"
              :zoomLevel="currentZoomLevel"
              :rotation="currentRotation"
          />
        </div>
      </div>

      <div class="editor-controls">
        <ImageGallery
            :uploadedImages="uploadedImages"
            :currentImageIndex="currentImageIndex"
            @image-added="handleImageAdded"
            @image-selected="handleImageSelected"
            @image-removed="handleImageRemoved"
        />

        <EditorControls
            :zoomLevel="currentZoomLevel"
            :aspectRatio="currentAspectRatio"
            @update:zoomLevel="updateZoomLevel"
            @update:aspectRatio="updateAspectRatio"
            @adjust-zoom="adjustZoom"
        />

        <ActionButtons
            @reset-settings="resetCurrentSettings"
            @apply-changes="applyChanges"
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
            label="Siguiente"
            @click="$emit('proceed')"
            icon="pi pi-arrow-right"
        />
      </div>
    </template>
  </pv-dialog>
</template>

<script>
import ImagePreview from "./components/imagen-preview.component.vue";
import ImageGallery from "./components/imagen-gallery.component.vue";
import EditorControls from "./components/edit-controls.component.vue";
import ActionButtons from "./components/action-buttons.component.vue";
import CropOverlay from "./components/croop-overlay.vue";

export default {
  name: 'ImageEditorDialog',
  components: {
    ImagePreview,
    ImageGallery,
    CropOverlay,
    EditorControls,
    ActionButtons
  },
  props: {
    visible: Boolean,
    imageUrl: String,
    initialSettings: Object,
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
      // Almacenar ajustes individuales para cada imagen
      imageSettings: {},
      // Ajustes actuales basados en la imagen seleccionada
      currentZoomLevel: 100,
      currentAspectRatio: 'original',
      currentRotation: 0
    };
  },
  computed: {
    currentImageUrl() {
      if (this.uploadedImages.length > 0 && this.currentImageIndex >= 0) {
        return this.uploadedImages[this.currentImageIndex].url;
      }
      return this.imageUrl;
    },

    hasImages() {
      return this.uploadedImages && this.uploadedImages.length > 0;
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
      handler(newIndex, oldIndex) {
        // Guardar ajustes de la imagen anterior
        if (oldIndex >= 0 && this.uploadedImages[oldIndex]) {
          this.saveCurrentSettings(oldIndex);
        }

        // Cargar ajustes de la nueva imagen seleccionada
        this.loadSettingsForImage(newIndex);
      }
    }
  },
  methods: {
    // Guardar ajustes actuales para una imagen específica
    saveCurrentSettings(imageIndex) {
      if (imageIndex >= 0) {
        this.imageSettings[imageIndex] = {
          zoomLevel: this.currentZoomLevel,
          aspectRatio: this.currentAspectRatio,
          rotation: this.currentRotation
        };
      }
    },

    // Cargar ajustes para una imagen específica
    loadSettingsForImage(imageIndex) {
      if (this.imageSettings[imageIndex]) {
        // Usar ajustes guardados
        const settings = this.imageSettings[imageIndex];
        this.currentZoomLevel = settings.zoomLevel;
        this.currentAspectRatio = settings.aspectRatio;
        this.currentRotation = settings.rotation;
      } else {
        // Valores por defecto para nueva imagen
        this.currentZoomLevel = 100;
        this.currentAspectRatio = 'original';
        this.currentRotation = 0;
      }
    },

    adjustZoom(amount) {
      this.currentZoomLevel = Math.max(10, Math.min(200, this.currentZoomLevel + amount));
    },

    updateZoomLevel(value) {
      this.currentZoomLevel = value;
    },

    updateAspectRatio(value) {
      this.currentAspectRatio = value;
    },

    resetCurrentSettings() {
      this.currentZoomLevel = 100;
      this.currentAspectRatio = 'original';
      this.currentRotation = 0;
    },

    applyChanges() {
      // Guardar ajustes actuales antes de aplicar
      this.saveCurrentSettings(this.currentImageIndex);

      this.$emit('apply-changes', {
        zoomLevel: this.currentZoomLevel,
        imageIndex: this.currentImageIndex,
        aspectRatio: this.currentAspectRatio,
        rotation: this.currentRotation
      });
    },

    handleImageAdded(file) {
      // Crear ajustes por defecto para la nueva imagen
      const newIndex = this.uploadedImages.length;
      this.imageSettings[newIndex] = {
        zoomLevel: 100,
        aspectRatio: 'original',
        rotation: 0
      };
      this.$emit('image-added', file);
    },

    handleImageSelected(index) {
      this.$emit('image-selected', index);
    },

    handleImageRemoved(index) {
      // Eliminar ajustes de la imagen removida
      delete this.imageSettings[index];

      // Reindexar ajustes si es necesario
      const newSettings = {};
      Object.keys(this.imageSettings).forEach(key => {
        const numKey = parseInt(key);
        if (numKey > index) {
          newSettings[numKey - 1] = this.imageSettings[numKey];
        } else if (numKey < index) {
          newSettings[numKey] = this.imageSettings[numKey];
        }
      });
      this.imageSettings = newSettings;

      this.$emit('image-removed', index);
    }
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
  background: #f8f9fa;
  border-radius: 8px;
  position: relative;
  border: 1px solid #dee2e6;
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
