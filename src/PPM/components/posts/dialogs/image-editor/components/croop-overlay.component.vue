<template>
  <div class="crop-overlay" :class="aspectRatioClass">
    <div class="overlay-container" @mousedown="startDrag" @touchstart="startDrag">
      <div class="overlay-mask">
        <div class="crop-area" :style="cropAreaStyle">
          <img
              ref="imageRef"
              :src="imageUrl"
              :alt="'Vista previa de recorte'"
              :style="imageStyle"
              class="cropped-preview"
              @dragstart.prevent
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
  data() {
    return {
      position: { x: 0, y: 0 },
      isDragging: false,
      startX: 0,
      startY: 0,
      startPosition: { x: 0, y: 0 },
      // Para el efecto de rebote
      maxMoveFactor: 1.3, // Permite arrastrar más allá del límite
      resistance: 0.5, // Factor de resistencia al rebote
      isReturning: false // Para animación de retorno
    };
  },
  computed: {
    aspectRatioClass() {
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
      const styles = {};

      switch(this.aspectRatio) {
        case '1:1':
          styles.aspectRatio = '1/1';
          styles.width = '70%';
          break;
        case '4:5':
          styles.aspectRatio = '4/5';
          styles.width = '80%';
          break;
        case '16:9':
          styles.aspectRatio = '16/9';
          styles.width = '90%';
          break;
        default:
          styles.width = '80%';
          styles.height = '80%';
      }

      return styles;
    },

    imageStyle() {
      return {
        transform: `scale(${this.zoomLevel / 100}) rotate(${this.rotation}deg) translate(${this.position.x}px, ${this.position.y}px)`,
        transition: this.isReturning ? 'transform 0.3s ease-out' : (this.isDragging ? 'none' : 'transform 0.2s ease'),
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        willChange: this.isDragging || this.isReturning ? 'transform' : 'auto'
      };
    },

    // Calcular límites basados en el nivel de zoom
    maxMove() {
      return 100 * (this.zoomLevel / 100);
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.onDrag);
    window.addEventListener('touchmove', this.onDrag);
    window.addEventListener('mouseup', this.stopDrag);
    window.addEventListener('touchend', this.stopDrag);
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.onDrag);
    window.removeEventListener('touchmove', this.onDrag);
    window.removeEventListener('mouseup', this.stopDrag);
    window.removeEventListener('touchend', this.stopDrag);
  },
  methods: {
    startDrag(e) {
      if (e.target !== this.$refs.imageRef && !this.$refs.imageRef.contains(e.target)) {
        return;
      }

      e.preventDefault();
      this.isDragging = true;
      this.isReturning = false;

      if (e.type === 'touchstart') {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
      } else {
        this.startX = e.clientX;
        this.startY = e.clientY;
      }

      this.startPosition = { ...this.position };
    },

    onDrag(e) {
      if (!this.isDragging) return;

      let clientX, clientY;

      if (e.type === 'touchmove') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const dx = clientX - this.startX;
      const dy = clientY - this.startY;

      // Calcular nueva posición con efecto de resistencia cuando se excede el límite
      let newX = this.startPosition.x + dx;
      let newY = this.startPosition.y + dy;

      // Aplicar resistencia si se excede el límite (efecto de empuje)
      if (Math.abs(newX) > this.maxMove) {
        const excess = Math.abs(newX) - this.maxMove;
        newX = newX > 0 ?
            this.maxMove + (excess * this.resistance) :
            -this.maxMove - (excess * this.resistance);
      }

      if (Math.abs(newY) > this.maxMove) {
        const excess = Math.abs(newY) - this.maxMove;
        newY = newY > 0 ?
            this.maxMove + (excess * this.resistance) :
            -this.maxMove - (excess * this.resistance);
      }

      this.position.x = newX;
      this.position.y = newY;
    },

    stopDrag() {
      if (!this.isDragging) return;

      this.isDragging = false;

      // Comprobar si estamos fuera de los límites y necesitamos regresar
      const isOutOfBoundsX = Math.abs(this.position.x) > this.maxMove;
      const isOutOfBoundsY = Math.abs(this.position.y) > this.maxMove;

      if (isOutOfBoundsX || isOutOfBoundsY) {
        this.isReturning = true;

        // Calcular la posición final dentro de los límites
        const finalX = this.position.x > 0 ?
            Math.min(this.position.x, this.maxMove) :
            Math.max(this.position.x, -this.maxMove);

        const finalY = this.position.y > 0 ?
            Math.min(this.position.y, this.maxMove) :
            Math.max(this.position.y, -this.maxMove);

        // Animación de retorno suave
        setTimeout(() => {
          this.position.x = finalX;
          this.position.y = finalY;

          // Restablecer después de la animación
          setTimeout(() => {
            this.isReturning = false;
          }, 300);
        }, 10);
      }
    },

    resetPosition() {
      this.position = { x: 0, y: 0 };
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
  background-color: transparent;
}

.overlay-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  cursor: grab;
  touch-action: none; /* Mejora el comportamiento táctil */
}

.overlay-container:active {
  cursor: grabbing;
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
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  border: 2px dashed rgba(255, 255, 255, 0.8);
}

.cropped-preview {
  user-select: none;
  -webkit-user-drag: none;
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
  pointer-events: none;
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