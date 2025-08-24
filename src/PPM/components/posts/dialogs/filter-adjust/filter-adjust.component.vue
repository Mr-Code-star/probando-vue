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
        <h3>Aplicar Filtros</h3>
        <pv-button
            icon="pi pi-arrow-left"
            class="p-button-text p-button-sm"
            @click="$emit('go-back')"
            label="Volver al editor"
        />
      </div>
    </template>

    <div class="filter-adjust-content">
      <!-- Vista previa de la imagen con filtros -->
      <div class="preview-section">
        <image-preview-of-filter
            :image-data="editedImageData"
            :filter-settings="currentFilterSettings"
        />
      </div>

      <!-- Controles de filtros -->
      <div class="controls-container">
        <div class="controls-tabs">
          <button
              :class="['tab-button', { active: activeTab === 'filters' }]"
              @click="activeTab = 'filters'"
          >
            <i class="pi pi-filter" style="margin-right: 8px;"></i>
            Filtros
          </button>
          <button
              :class="['tab-button', { active: activeTab === 'adjustments' }]"
              @click="activeTab = 'adjustments'"
          >
            <i class="pi pi-cog" style="margin-right: 8px;"></i>
            Ajustes
          </button>
        </div>

        <!-- Contenido de pestañas -->
        <div class="tab-content">
          <div v-if="activeTab === 'filters'" class="tab-pane">
            <h4>Filtros Predefinidos</h4>
            <div class="filter-grid">
              <button
                  v-for="filter in presetFilters"
                  :key="filter.name"
                  :class="['filter-preset', { active: currentFilter === filter.name }]"
                  @click="applyPresetFilter(filter)"
              >
                <div class="filter-thumbnail" :style="getFilterThumbnailStyle(filter)"></div>
                <span class="filter-name">{{ filter.name }}</span>
              </button>
            </div>
          </div>

          <div v-else class="tab-pane">
            <h4>Ajustes Manuales</h4>
            <div class="adjustment-controls">
              <div class="control-group">
                <label>Brillo: {{ currentFilterSettings.brightness || 100 }}%</label>
                <input
                    type="range"
                    v-model.number="currentFilterSettings.brightness"
                    min="0"
                    max="200"
                    class="slider"
                />
              </div>

              <div class="control-group">
                <label>Contraste: {{ currentFilterSettings.contrast || 100 }}%</label>
                <input
                    type="range"
                    v-model.number="currentFilterSettings.contrast"
                    min="0"
                    max="200"
                    class="slider"
                />
              </div>

              <div class="control-group">
                <label>Saturación: {{ currentFilterSettings.saturation || 100 }}%</label>
                <input
                    type="range"
                    v-model.number="currentFilterSettings.saturation"
                    min="0"
                    max="200"
                    class="slider"
                />
              </div>

              <div class="control-group">
                <label>Matiz: {{ currentFilterSettings.hue || 0 }}°</label>
                <input
                    type="range"
                    v-model.number="currentFilterSettings.hue"
                    min="-180"
                    max="180"
                    class="slider"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="editor-footer">
        <pv-button
            label="Cancelar"
            class="p-button-text"
            @click="$emit('close')"
            icon="pi pi-times"
        />

        <pv-button
            label="Aplicar Filtro"
            icon="pi pi-check"
            @click="applyFilter"
            class="p-button-primary"
        />
      </div>
    </template>
  </pv-dialog>
</template>

<script>
import { Button as PvButton } from "primevue";
import ImagePreviewOfFilter from "../filter-adjust/components/image-preview-of-filter.vue";

export default {
  name: 'FilterAdjustDialog',
  components: {
    PvButton,
    ImagePreviewOfFilter
  },
  props: {
    visible: Boolean,
    editedImageData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activeTab: 'filters',
      currentFilter: null,
      currentFilterSettings: {},
      presetFilters: [
        { name: 'Normal', brightness: 100, contrast: 100, saturation: 100, hue: 0 },
        { name: 'Claro', brightness: 120, contrast: 90, saturation: 110, hue: 0 },
        { name: 'Oscuro', brightness: 80, contrast: 110, saturation: 90, hue: 0 },
        { name: 'Vivido', brightness: 100, contrast: 100, saturation: 150, hue: 0 },
        { name: 'Sepia', brightness: 100, contrast: 90, saturation: 50, hue: 30 },
        { name: 'BN', brightness: 100, contrast: 110, saturation: 0, hue: 0 }
      ]
    };
  },
  methods: {
    applyPresetFilter(filter) {
      this.currentFilter = filter.name;
      this.currentFilterSettings = { ...filter };
    },

    applyFilter() {
      this.$emit('filter-applied', {
        ...this.editedImageData,
        filterSettings: { ...this.currentFilterSettings }
      });
      this.$emit('close');
    },

    getFilterThumbnailStyle(filter) {
      return {
        filter: `brightness(${filter.brightness}%) contrast(${filter.contrast}%) saturate(${filter.saturation}%) hue-rotate(${filter.hue}deg)`,
        backgroundImage: `url(${this.editedImageData.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
  },

  watch: {
    visible(newVal) {
      if (newVal) {
        // Resetear filtros cuando se abre el diálogo
        this.currentFilter = null;
        this.currentFilterSettings = {};
      }
    }
  }
};
</script>

<style scoped>
.filter-adjust-content {
  display: flex;
  gap: 2rem;
  height: 60vh;
  max-height: 500px;
}

.preview-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls-container {
  width: 300px;
  display: flex;
  flex-direction: column;
}

.controls-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1.5rem;
}

.tab-button {
  flex: 1;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 600;
  color: #6c757d;
  transition: all 0.3s ease;
}

.tab-button:hover {
  color: #495057;
}

.tab-button.active {
  color: #4263eb;
  border-bottom-color: #4263eb;
}

.tab-content {
  flex-grow: 1;
  overflow-y: auto;
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 1rem;
}

.filter-preset {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-preset:hover {
  border-color: #4263eb;
  transform: translateY(-2px);
}

.filter-preset.active {
  border-color: #4263eb;
  background-color: rgba(66, 99, 235, 0.1);
}

.filter-thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  background-size: cover;
  background-position: center;
}

.filter-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: #495057;
}

.adjustment-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e9ecef;
  outline: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4263eb;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4263eb;
  cursor: pointer;
  border: none;
}

.editor-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

@media (max-width: 991px) {
  .filter-adjust-content {
    flex-direction: column;
    height: auto;
    max-height: 70vh;
  }

  .controls-container {
    width: 100%;
    margin-top: 1rem;
  }

  .preview-section {
    min-height: 250px;
  }
}

@media (max-width: 575px) {
  .filter-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .filter-thumbnail {
    width: 50px;
    height: 50px;
  }
}
</style>