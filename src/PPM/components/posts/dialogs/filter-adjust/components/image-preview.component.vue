<template>
  <div class="preview-container">
    <div class="image-preview" :style="containerStyle">
      <img
          :src="imageUrl"
          :alt="'Vista previa con filtros'"
          :style="computedStyles"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePreview',
  props: {
    imageUrl: String,
    selectedFilter: String,
    adjustments: Object,
    editorSettings: Object  // Esta prop debe estar definida
  },
  computed: {
    containerStyle() {
      // Aplicar relación de aspecto al contenedor si existe
      if (this.editorSettings?.aspectRatio && this.editorSettings.aspectRatio !== 'original') {
        let aspectRatioValue;

        switch(this.editorSettings.aspectRatio) {
          case '1:1':
            aspectRatioValue = '1/1';
            break;
          case '4:5':
            aspectRatioValue = '4/5';
            break;
          case '16:9':
            aspectRatioValue = '16/9';
            break;
          default:
            return {};
        }

        return {
          aspectRatio: aspectRatioValue,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        };
      }

      return {};
    },
    computedFilterStyle() {
      // Primero aplicar el filtro base seleccionado
      let baseFilter = '';

      switch(this.selectedFilter) {
        case 'filter-aden':
          baseFilter = 'sepia(0.2) brightness(1.15) saturate(1.4)';
          break;
        case 'filter-clarendon':
          baseFilter = 'contrast(1.2) saturate(1.35)';
          break;
        case 'filter-crema':
          baseFilter = 'sepia(0.5) contrast(1.25) brightness(1.15) saturate(0.9)';
          break;
        case 'filter-gingham':
          baseFilter = 'brightness(1.05) contrast(1.1)';
          break;
        case 'filter-juno':
          baseFilter = 'sepia(0.35) contrast(1.15) brightness(1.15) saturate(1.8)';
          break;
        case 'filter-lark':
          baseFilter = 'contrast(0.9) brightness(1.1) saturate(1.1)';
          break;
        case 'normal':
        default:
          baseFilter = '';
      }

      // Calcular los ajustes manuales (convertir a valores decimales)
      const brightnessValue = this.adjustments.brightness / 100;
      const contrastValue = this.adjustments.contrast / 100;
      const saturationValue = this.adjustments.saturation / 100;
      const opacityValue = (100 - this.adjustments.fade) / 100;

      // Combinar filtro base con ajustes manuales
      const manualAdjustments = `
        brightness(${brightnessValue})
        contrast(${contrastValue})
        saturate(${saturationValue})
        opacity(${opacityValue})
      `;

      return {
        filter: `${baseFilter} ${manualAdjustments}`.trim(),
        transform: this.adjustments.warmth !== 0
            ? this.adjustments.warmth > 0
                ? `sepia(${this.adjustments.warmth}%) hue-rotate(-${this.adjustments.warmth/2}deg)`
                : `sepia(${Math.abs(this.adjustments.warmth)}%) hue-rotate(${Math.abs(this.adjustments.warmth)/2}deg)`
            : 'none'
      };
    },
    computedTransform() {
      if (!this.editorSettings) return '';

      let transform = '';

      // Aplicar zoom
      if (this.editorSettings.zoomLevel) {
        transform += `scale(${this.editorSettings.zoomLevel / 100}) `;
      }

      // Aplicar rotación
      if (this.editorSettings.rotation) {
        transform += `rotate(${this.editorSettings.rotation}deg) `;
      }

      return transform.trim();
    },
    computedStyles() {
      const styles = {
        filter: this.computedFilterStyle.filter,
        transform: this.computedTransform || this.computedFilterStyle.transform,
        objectFit: 'contain',
        maxWidth: '100%',
        maxHeight: '100%'
      };

      // Si hay una relación de aspecto específica, forzar el recorte
      if (this.editorSettings?.aspectRatio && this.editorSettings.aspectRatio !== 'original') {
        styles.objectFit = 'cover';
        styles.width = '100%';
        styles.height = '100%';
      }

      return styles;
    },
  }
};
</script>

<style scoped>
.preview-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 8px;
  overflow: hidden;
  max-height: 100%;
}

.image-preview {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  width: auto;
  height: auto;
}

/* Media query para dispositivos móviles */
@media (max-width: 991px) {
  .preview-container {
    height: 40vh;
    min-height: 300px;
  }
}
</style>