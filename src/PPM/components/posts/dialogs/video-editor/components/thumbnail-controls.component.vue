<template>
  <div class="control-group">
    <label>Seleccionar miniatura</label>
    <div class="thumbnail-controls">
      <p>Selecciona un frame para la miniatura:</p>
      <input
          type="range"
          :value="thumbnailTime"
          @input="$emit('update:thumbnailTime', parseFloat($event.target.value))"
          :min="0"
          :max="duration"
          step="0.1"
          class="thumbnail-slider"
      />
      <div class="thumbnail-actions">
        <button @click="$emit('capture-current')" class="control-btn">
          <i class="pi pi-camera"></i> Usar frame actual
        </button>
        <button @click="triggerFileInput" class="control-btn">
          <i class="pi pi-upload"></i> Subir imagen personalizada
        </button>
        <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            accept="image/*"
            style="display: none"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThumbnailControls',
  props: {
    thumbnailTime: Number,
    duration: Number
  },
  emits: ['update:thumbnailTime', 'capture-current', 'upload-thumbnail'],
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Verificar que sea una imagen
        if (!file.type.startsWith('image/')) {
          alert('Por favor, selecciona un archivo de imagen válido.');
          return;
        }

        // Crear URL para la vista previa
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$emit('upload-thumbnail', {
            file: file,
            previewUrl: e.target.result
          });
        };
        reader.readAsDataURL(file);

        // Resetear el input para permitir subir la misma imagen otra vez
        event.target.value = '';
      }
    }
  }
};
</script>

<style scoped>
.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 500;
  color: #212529;
  font-size: 0.9rem;
}

.thumbnail-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.thumbnail-controls p {
  margin: 0;
  font-size: 0.9rem;
  color: #495057;
}

.thumbnail-slider {
  -webkit-appearance: none;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  outline: none;
  width: 100%;
}

.thumbnail-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4263eb;
  cursor: pointer;
  transition: all 0.3s ease;
}

.thumbnail-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4263eb;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.thumbnail-actions {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-btn {
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 1px solid #dee2e6;
  color: #495057;
}

.control-btn:hover {
  background: #f8f9fa;
  border-color: #adb5bd;
}
</style>