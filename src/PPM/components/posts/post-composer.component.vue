<!-- src/PPM/components/posts/post-composer.component.vue -->
<template>
  <div>
    <!-- Diálogo para subir medios -->
    <media-upload-dialog
        v-if="showMediaUpload"
        :visible="showMediaUpload"
        :selected-media="selectedMedia"
        @close="close"
        @process-files="processFiles"
        @remove-media="removeMedia"
        @publish-text-only="publishTextOnly"
    />

    <!-- Diálogo para editar imagen -->
    <image-editor-dialog
        v-if="showImageEditor"
        :visible="showImageEditor"
        :uploaded-images="uploadedImagesForEditor"
        :current-image-index="currentImageIndex"
        @image-removed="handleImageRemoved"
        @close="closeImageEditor"
        @go-back="goBackToMediaUpload"
        @proceed="proceedToTextComposer"
        @apply-changes="applyImageChanges"
        @image-added="handleImageAddedInEditor"
        @image-selected="handleImageSelectedInEditor"
    />

    <!-- Diálogo para filtros y ajustes -->
    <filter-adjust-dialog
        v-if="showFilterAdjust"
        :visible="showFilterAdjust"
        :image-url="currentImageUrl"
        :initial-settings="currentFilterSettings"
        @close="closeFilterAdjust"
        @go-back="goBackToImageEditor"
        @apply-changes="applyFilterChanges"
    />

    <!-- Diálogo para editar video -->
    <video-editor-dialog
        v-if="showVideoEditor"
        :visible="showVideoEditor"
        :video-url="currentVideoUrl"
        @close="closeVideoEditor"
        @go-back="goBackToMediaUploadFromVideo"
        @apply-changes="applyVideoChanges"
    />

    <!-- Diálogo para publicar solo texto -->
    <text-only-dialog
        v-if="showTextOnlyDialog"
        :visible="showTextOnlyDialog"
        :initial-content="content"
        :loading="loading"
        @close="closeTextOnlyDialog"
    />
  </div>
</template>

<script>
import FilterAdjustDialog from './dialogs/filter-adjust/filter-adjust.component.vue';
import MediaUploadDialog from './dialogs/media-upload/media-upload.component.vue';
import ImageEditorDialog from './dialogs/image-editor/image-editor.component.vue';
import VideoEditorDialog from './dialogs/video-editor/video-editor.component.vue';
import TextOnlyDialog from './dialogs/text-only/text-only.component.vue';

export default {
  name: 'PostComposer',
  components: {
    FilterAdjustDialog,
    MediaUploadDialog,
    ImageEditorDialog,
    VideoEditorDialog,
    TextOnlyDialog
  },
  props: {
    postToEdit: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      content: '',
      loading: false,
      showMediaUpload: true,
      showImageEditor: false,
      showVideoEditor: false,
      showFilterAdjust: false,
      showTextOnlyDialog: false,
      selectedMedia: [],
      currentImageIndex: -1,
      currentImageUrl: '',
      currentVideoIndex: -1,
      currentVideoUrl: '',
      currentFilterSettings: {}
    };
  },
  computed: {
    editing() {
      return !!this.postToEdit;
    },
    uploadedImagesForEditor() {
      return this.selectedMedia
          .filter(file => this.isImage(file))
          .map(file => ({
            url: this.getObjectURL(file),
            file: file
          }));
    }
  },
  watch: {
    postToEdit: {
      immediate: true,
      handler(post) {
        if (post) {
          this.content = post.content;
          this.showMediaUpload = false;
          this.showTextOnlyDialog = true;
        } else {
          this.content = '';
          this.showMediaUpload = true;
          this.showTextOnlyDialog = false;
        }
      }
    }
  },
  methods: {
    proceedToFilterAdjust() {
      this.showImageEditor = false;
      this.showFilterAdjust = true;

      // Guardar la URL de la imagen actual
      if (this.uploadedImagesForEditor.length > 0 && this.currentImageIndex >= 0) {
        this.currentImageUrl = this.uploadedImagesForEditor[this.currentImageIndex].url;
      }
    },
    goBackToImageEditor() {
      this.showFilterAdjust = false;
      this.showImageEditor = true;
    },
    closeFilterAdjust() {
      this.showFilterAdjust = false;
      this.$emit('close');
    },
    applyFilterChanges(settings) {
      console.log('Aplicando filtros y ajustes:', settings);
      // Guardar los ajustes para posible uso posterior
      this.currentFilterSettings = settings;

      // Después de aplicar filtros, proceder al editor de texto
      this.showFilterAdjust = false;
      this.showTextOnlyDialog = true;
    },
    handleImageRemoved(index) {
      // Elimina la imagen del array selectedMedia
      this.selectedMedia.splice(index, 1);

      // Ajusta el índice actual si es necesario
      if (this.currentImageIndex >= index) {
        this.currentImageIndex = Math.max(0, this.currentImageIndex - 1);
      }

      // Si no quedan imágenes, cierra el editor o toma la acción apropiada
      if (this.selectedMedia.filter(file => this.isImage(file)).length === 0) {
        this.showImageEditor = false;
        this.showMediaUpload = true;
      }
    },
    goBackToMediaUpload() {
      this.showImageEditor = false;
      this.showMediaUpload = true;

      // Liberar URLs de objetos para evitar fugas de memoria
      this.uploadedImagesForEditor.forEach(img => {
        if (img.url.startsWith('blob:')) {
          URL.revokeObjectURL(img.url);
        }
      });

      // Limpiar el array de imágenes seleccionadas
      this.selectedMedia = [];
      this.currentImageIndex = -1;
    },
    goBackToMediaUploadFromVideo() {
      this.showVideoEditor = false;
      this.showMediaUpload = true;

      // Liberar URL del video
      if (this.currentVideoUrl && this.currentVideoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(this.currentVideoUrl);
      }

      // Limpiar el array de medios seleccionados
      this.selectedMedia = [];
      this.currentVideoIndex = -1;
      this.currentVideoUrl = '';
    },
    isImage(file) {
      return file.type.startsWith('image/');
    },
    isVideo(file) {
      return file.type.startsWith('video/');
    },
    handleImageAddedInEditor(file) {
      // Agregar la nueva imagen al array selectedMedia
      this.selectedMedia.push(file);
      // Actualizar el índice actual para apuntar a la nueva imagen
      this.currentImageIndex = this.selectedMedia.length - 1;
    },
    getObjectURL(file) {
      return URL.createObjectURL(file);
    },
    handleImageSelectedInEditor(index) {
      // Actualizar el índice actual cuando el usuario selecciona una imagen diferente
      this.currentImageIndex = index;
    },
    processFiles(files) {
      const validFiles = files.filter(file =>
          file.type.startsWith('image/') || file.type.startsWith('video/')
      );

      this.selectedMedia = [...this.selectedMedia, ...validFiles];

      if (validFiles.some(file => this.isImage(file))) {
        const firstImageIndex = this.selectedMedia.findIndex(file => this.isImage(file));
        if (firstImageIndex !== -1) {
          this.editMedia(firstImageIndex);
        }
      } else if (validFiles.some(file => this.isVideo(file))) {
        const firstVideoIndex = this.selectedMedia.findIndex(file => this.isVideo(file));
        if (firstVideoIndex !== -1) {
          this.editMedia(firstVideoIndex);
        }
      }
    },
    removeMedia(index) {
      if (this.getObjectURL(this.selectedMedia[index])) {
        URL.revokeObjectURL(this.getObjectURL(this.selectedMedia[index]));
      }
      this.selectedMedia.splice(index, 1);
    },
    editMedia(index) {
      const file = this.selectedMedia[index];

      if (this.isImage(file)) {
        this.currentImageIndex = index; // Guardar el índice actual
        this.currentImageUrl = this.getObjectURL(file);
        this.showImageEditor = true;
        this.showMediaUpload = false;
      } else if (this.isVideo(file)) {
        this.currentVideoIndex = index;
        this.currentVideoUrl = this.getObjectURL(file);
        this.showVideoEditor = true;
        this.showMediaUpload = false;
      }
    },
    applyImageChanges(settings) {
      console.log('Aplicando cambios a la imagen:', settings);
    },
    applyVideoChanges(settings) {
      console.log('Aplicando cambios al video:', settings);
    },
    proceedToTextComposer() {
      this.showImageEditor = false;
      this.showFilterAdjust = true;
    },
    publishTextOnly() {
      this.showMediaUpload = false;
      this.showTextOnlyDialog = true;
      this.selectedMedia = [];
    },
    closeImageEditor() {
      this.showImageEditor = false;
      this.$emit('close')
    },
    closeVideoEditor() {
      this.showVideoEditor = false;
      this.$emit('close')
    },

    closeTextOnlyDialog() {
      this.showTextOnlyDialog = false;
      this.$emit('close');
    },
    close() {
      // Liberar todas las URLs de objetos
      this.selectedMedia.forEach(file => {
        const url = this.getObjectURL(file);
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });

      // Limpiar el array
      this.selectedMedia = [];
      this.currentImageIndex = -1;
      this.currentVideoIndex = -1;

      this.$emit('close');
    }
  }
};
</script>

<style scoped>
/* Estilos globales del componente principal si son necesarios */
:root {
  --primary-color: #4263eb;
  --primary-hover: #3b5bdb;
  --secondary-color: #f8f9fa;
  --text-color: #212529;
  --border-color: #dee2e6;
  --success-color: #2b8a3e;
  --danger-color: #c92a2a;
  --border-radius: 8px;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* Estilos para el diálogo principal */
.p-dialog .p-dialog-header,
.p-dialog .p-dialog-footer {
  background: var(--secondary-color);
  border: none;
  padding: 1.5rem;
}

.p-dialog .p-dialog-content {
  padding: 0;
  overflow: hidden;
}

.p-dialog .p-dialog-header h3 {
  margin: 0;
  font-weight: 600;
  color: var(--text-color);
}

/* Botones comunes */
.p-button {
  font-weight: 500;
  transition: var(--transition);
}

.p-button:not(.p-button-text):not(.p-button-outlined) {
  background: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.p-button:not(.p-button-text):not(.p-button-outlined):hover {
  background: var(--primary-hover);
  border-color: var(--primary-hover);
}

.p-button-text {
  color: var(--primary-color);
}

.p-button-text:hover {
  background: rgba(66, 99, 235, 0.08);
}

.p-button-outlined {
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.p-button-outlined:hover {
  background: rgba(66, 99, 235, 0.08);
}

@media (max-width: 575px) {
  .p-dialog .p-dialog-header,
  .p-dialog .p-dialog-footer {
    padding: 1rem;
  }
}
</style>