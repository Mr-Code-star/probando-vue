<template>
  <div>
    <media-upload-dialog
        v-if="showMediaUpload"
        :visible="showMediaUpload"
        @close="closeDialog"
        @process-files="handleFilesProcessed"
    />

    <image-editor-dialog
        v-if="showImageEditor"
        :visible="showImageEditor"
        :uploaded-images="uploadedImages"
        :current-image-index="currentImageIndex"
        @close="closeDialog"
        @go-back="goBackToUpload"
        @accept-image="handleImageAccepted"
    />

    <filter-adjust-dialog
        v-if="showFilterEditor"
        :visible="showFilterEditor"
        :edited-image-data="editedImageData"
        @close="closeDialog"
        @go-back="goBackToImageEditor"
    />
  </div>
</template>

<script>
import MediaUploadDialog from './dialogs/media-upload/media-upload.component.vue';
import ImageEditorDialog from './dialogs/image-editor/image-editor.componet.vue';
import FilterAdjustDialog from "./dialogs/filter-adjust/filter-adjust.component.vue";

// Constantes para los estados del componente
const COMPONENT_STATES = {
  MEDIA_UPLOAD: 'MEDIA_UPLOAD',
  IMAGE_EDITOR: 'IMAGE_EDITOR',
  FILTER_EDITOR: 'FILTER_EDITOR',
  CLOSED: 'CLOSED'
};

export default {
  name: 'PostComposer',
  components: {
    MediaUploadDialog,
    ImageEditorDialog,
    FilterAdjustDialog
  },
  data() {
    return {
      currentState: COMPONENT_STATES.MEDIA_UPLOAD,
      uploadedImages: [],
      currentImageIndex: 0,
      editedImageData: null
    };
  },
  computed: {
    showMediaUpload() {
      return this.currentState === COMPONENT_STATES.MEDIA_UPLOAD;
    },
    showImageEditor() {
      return this.currentState === COMPONENT_STATES.IMAGE_EDITOR;
    },
    showFilterEditor(){
      return this.currentState === COMPONENT_STATES.FILTER_EDITOR;
    }
  },
  methods: {
    /**
     * Procesa los archivos seleccionados y cambia al editor de imágenes
     * @param {File[]} files - Archivos a procesar
     */
    handleFilesProcessed(files) {
      // Crear objetos de imagen con URLs para previsualización
      this.uploadedImages = files.map(file => ({
        file,
        url: URL.createObjectURL(file),
        name: file.name
      }));

      this.changeState(COMPONENT_STATES.IMAGE_EDITOR);
    },

    /**
     * Maneja la imagen aceptada del editor
     * @param {Object} imageData - Datos de la imagen editada
     */
    handleImageAccepted(imageData) {
      this.editedImageData = imageData;
      this.changeState(COMPONENT_STATES.FILTER_EDITOR);
    },

    /**
     * Cambia el estado del componente
     * @param {string} newState - Nuevo estado
     */
    changeState(newState) {
      this.currentState = newState;
    },

    /**
     * Cierra el diálogo actual y limpia los recursos
     */
    closeDialog() {
      // Liberar URLs creadas para evitar fugas de memoria
      this.cleanupImageUrls();
      this.changeState(COMPONENT_STATES.CLOSED);
      this.$emit('close');
    },

    /**
     * Vuelve al diálogo de subida de medios
     */
    goBackToUpload() {
      this.changeState(COMPONENT_STATES.MEDIA_UPLOAD);
    },

    /**
     * Vuelve al editor de imágenes desde el editor de filtros
     */
    goBackToImageEditor() {
      this.changeState(COMPONENT_STATES.IMAGE_EDITOR);
    },

    /**
     * Libera las URLs de objeto creadas para las imágenes
     */
    cleanupImageUrls() {
      this.uploadedImages.forEach(image => {
        if (image.url && image.url.startsWith('blob:')) {
          URL.revokeObjectURL(image.url);
        }
      });
      this.uploadedImages = [];
    }
  },

  // Limpiar recursos cuando el componente se destruye
  beforeUnmount() {
    this.cleanupImageUrls();
  }
};
</script>