<template>
  <pv-dialog
      :visible="visible"
      :modal="true"
      :closable="true"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      @update:visible="$emit('close')"
  >
    <template #header>
      <h3>Crear nueva publicación</h3>
    </template>

    <div class="media-upload-content">
      <div
          class="upload-area"
          @dragover.prevent="dragOver = true"
          @dragleave="dragOver = false"
          @drop="handleDrop"
          :class="{ 'drag-over': dragOver }"
      >
        <div class="upload-icon">
          <i class="pi pi-image" style="font-size: 3rem"></i>
        </div>
        <p>Arrastra las fotos y los videos aquí</p>
        <pv-file-upload
            mode="basic"
            name="media[]"
            :multiple="true"
            customUpload auto severity="secondary"
            :maxFileSize="10000000"
            accept="image/*,video/*"
            chooseLabel="Seleccionar de la computadora"
            @select="handleFileSelect"
            class="upload-btn"
            :showUploadButton="false"
            :showCancelButton="false"
        />
      </div>

    </div>
  </pv-dialog>
</template>

<script>
export default {
  name: 'MediaUploadDialog',
  props: {
    visible: Boolean,
    selectedMedia: Array
  },
  data() {
    return {
      dragOver: false
    };
  },
  methods: {
    handleDrop(e) {
      this.dragOver = false;
      const files = Array.from(e.dataTransfer.files);
      this.$emit('process-files', files);
    },
    handleFileSelect(e) {
      const files = Array.from(e.files);
      this.$emit('process-files', files);
    }
  }
};
</script>

<style>
.media-upload-content {
  padding: 1.5rem;
}

.upload-area {
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
}

.upload-area.drag-over {
  border-color: #4263eb;
  background: rgba(66, 99, 235, 0.05);
}

.upload-icon {
  color: #adb5bd;
  margin-bottom: 1rem;
}

.upload-area p {
  margin-bottom: 1.5rem;
  color: #6c757d;
  font-size: 1.1rem;
}

.upload-btn {
  margin: 0 auto;
}



.separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  color: #6c757d;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #dee2e6;
}

.separator span {
  padding: 0 1rem;
}



@media (max-width: 575px) {
  .media-upload-content {
    padding: 1rem;
  }

  .upload-area {
    padding: 2rem 1rem;
  }
}
</style>