<template>
  <div class="control-group">
    <label>Galería de imágenes</label>
    <div class="image-gallery">
      <div
          v-for="(img, index) in uploadedImages"
          :key="index"
          :class="['thumbnail', { active: currentImageIndex === index }]"
          @click="$emit('image-selected', index)"
      >
        <img :src="img.url" :alt="`Miniatura ${index + 1}`" />
        <!-- Botón de eliminar aparece en TODAS las imágenes cuando hay más de una imagen -->
        <button
            v-if="uploadedImages.length > 1"
            class="delete-btn"
            @click.stop="removeImage(index)"
            aria-label="Eliminar imagen"
        >
          <i class="pi pi-times"></i>
        </button>
      </div>
      <label for="add-image" class="thumbnail add-image-btn">
        <i class="pi pi-plus"></i>
        <input
            type="file"
            id="add-image"
            accept="image/*"
            @change="handleAddImage"
            style="display: none"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageGallery',
  props: {
    uploadedImages: {
      type: Array,
      default: () => []
    },
    currentImageIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleAddImage(event) {
      const files = event.target.files;
      if (files && files[0]) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
          this.$emit('image-added', file);
        }
      }
      event.target.value = ''; // Reset input
    },
    removeImage(index) {
      this.$emit('image-removed', index);
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

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.thumbnail {
  position: relative;
  width: 60px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: border 0.2s;
}
.thumbnail.active {
  border-color: #3b82f6;
}
.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.thumbnail.active {
  border-color: #4263eb;
}

.thumbnail:hover {
  transform: scale(1.05);
}

.delete-btn {
  position: absolute;
  top: 3px;
  right: 3px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  color: white;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.7rem;
  transition: background 0.2s, transform 0.2s;
}

.delete-btn:hover {
  background: rgba(220, 38, 38, 0.9);
  transform: scale(1.1);
}

.add-image-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border: 1px dashed #dee2e6;
  color: #6c757d;
  font-size: 1rem;
}

.add-image-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

@media (max-width: 575px) {
  .image-gallery {
    justify-content: center;
  }

  .thumbnail {
    width: 50px;
    height: 50px;
  }

  .delete-btn {
    width: 16px;
    height: 16px;
    font-size: 0.6rem;
  }
}
</style>