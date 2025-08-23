<template>
  <div class="crop-overlay" :class="aspectRatioClass">
    <div class="overlay-container">
      <div class="overlay-mask">
        <div class="crop-area" :style="cropAreaStyle">
          <img
              :src="imageUrl"
              :alt="'Vista previa de recorte'"
              :style="imageStyle"
              class="cropped-preview"
          />
        </div>
      </div>
      <div class="ratio-indicator">
        {{ aspectRatioText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CropOverlay',
  props: {
    imageUrl: String,
    aspectRatio: {
      type: String,
      default: 'original'
    },
    zoomLevel: {
      type: Number,
      default: 100
    },
    rotation: {
      type: Number,
      default: 0
    }
  },
  computed: {
    aspectRatioClass() {
      // Convertir la relación de aspecto a un nombre de clase válido
      return `ratio-${this.aspectRatio.replace(':', '-')}`;
    },

    aspectRatioText() {
      switch(this.aspectRatio) {
        case '1:1': return '1:1';
        case '4:5': return '4:5';
        case '16:9': return '16:9';
        default: return 'Original';
      }
    },

    cropAreaStyle() {
      // Establecer las dimensiones según la relación de aspecto
      const styles = {};

      switch(this.aspectRatio) {
        case '1:1':
          styles.aspectRatio = '1/1';
          styles.width = '70%';
          break;
        case '4:5':
          styles.aspectRatio = '4/5';
          styles.width = '70%';
          break;
        case '16:9':
          styles.aspectRatio = '16/9';
          styles.width = '90%';
          break;
        default:
          // Para relación original, usar el 80% del contenedor
          styles.width = '80%';
          styles.height = '80%';
      }

      return styles;
    },

    imageStyle() {
      return {
        transform: `scale(${this.zoomLevel / 100}) rotate(${this.rotation}deg)`,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
      };
    }
  }
};
</script>

<style scoped>
.crop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
  background-color: transparent; /* Fondo transparente en lugar de gris */
}

.overlay-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-mask {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.crop-area {
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5); /* Más transparente */
  border: 2px dashed rgba(255, 255, 255, 0.8); /* Borde punteado más sutil */
}

.cropped-preview {
  transition: transform 0.3s ease;
}

.ratio-indicator {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 12px;
  border-radius: 4px;
}

/* Animación de entrada */
.crop-overlay {
  animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 575px) {
  .ratio-indicator {
    font-size: 1rem;
    bottom: -25px;
  }
}
</style>