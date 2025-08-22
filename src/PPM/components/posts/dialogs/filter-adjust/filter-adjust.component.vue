<template>
  <pv-dialog
      :visible="visible"
      :modal="true"
      :closable="true"
      :style="{ width: '80rem', maxWidth: '95vw' }"
      :breakpoints="{ '1199px': '90vw', '575px': '95vw' }"
      @update:visible="$emit('close')"
  >
    <template #header>
      <div class="dialog-header">
        <h3>Editar imagen</h3>
      </div>
    </template>

    <div class="filter-adjust-content">
      <!-- Componente ImagePreview -->
      <ImagePreview
          :imageUrl="imageUrl"
          :selectedFilter="selectedFilter"
          :adjustments="currentAdjustments"
          :editorSettings="initialSettings?.editorSettings || {}"
          :key="previewKey"
      />

      <div class="controls-container">
        <div class="controls-tabs">
          <button
              :class="['tab-button', { active: activeTab === 'filters' }]"
              @click="activeTab = 'filters'"
          >
            Filtros
          </button>
          <button
              :class="['tab-button', { active: activeTab === 'adjustments' }]"
              @click="activeTab = 'adjustments'"
          >
            Ajustes
          </button>
        </div>

        <div class="controls-content">
          <!-- Componente FilterTab -->
          <FilterTab
              v-if="activeTab === 'filters'"
              :imageUrl="imageUrl"
              :filters="filters"
              :selectedFilter="selectedFilter"
              @select-filter="selectFilter"
              :key="filterTabKey"
          />

          <!-- Componente AdjustmentsTab -->
          <AdjustmentsTab
              v-if="activeTab === 'adjustments'"
              :adjustments="adjustments"
              :currentValues="currentAdjustments"
              @update-adjustment="updateAdjustment"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="editor-footer">
        <pv-button
            label="Volver"
            class="p-button-text"
            @click="goBackToEditor"
            icon="pi pi-arrow-left"
        />

        <div class="right-buttons">
          <pv-button
              label="Restablecer"
              class="p-button-text"
              @click="resetAdjustments"
              icon="pi pi-refresh"
          />
          <pv-button
              label="Aplicar"
              @click="applyChanges"
              icon="pi pi-check"
          />
        </div>
      </div>
    </template>
  </pv-dialog>
</template>

<script>
import AdjustmentsTab from '../filter-adjust/components/adjustments-tab.component.vue';
import FilterTab from '../filter-adjust/components/filter-tab.component.vue';
import ImagePreview from '../filter-adjust/components/image-preview.component.vue';

export default {
  name: 'FilterAdjustDialog',
  components: {
    AdjustmentsTab,
    FilterTab,
    ImagePreview
  },
  props: {
    visible: Boolean,
    imageUrl: String,
    initialSettings: Object
  },
  data() {
    return {
      activeTab: 'filters',
      selectedFilter: 'normal',
      currentAdjustments: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        fade: 0,
        warmth: 0,
        vignette: 0
      },
      filters: [
        { name: 'Normal', class: 'normal' },
        { name: 'Aden', class: 'filter-aden' },
        { name: 'Clarendon', class: 'filter-clarendon' },
        { name: 'Crema', class: 'filter-crema' },
        { name: 'Gingham', class: 'filter-gingham' },
        { name: 'Juno', class: 'filter-juno' },
        { name: 'Lark', class: 'filter-lark' }
      ],
      adjustments: [
        { name: 'brightness', label: 'Brillo', min: 0, max: 200, step: 1 },
        { name: 'contrast', label: 'Contraste', min: 0, max: 200, step: 1 },
        { name: 'saturation', label: 'Saturación', min: 0, max: 200, step: 1 },
        { name: 'fade', label: 'Atenuar', min: 0, max: 100, step: 1 },
        { name: 'warmth', label: 'Temperatura', min: -100, max: 100, step: 1 },
        { name: 'vignette', label: 'Viñeta', min: 0, max: 100, step: 1 }
      ],
      previewKey: 0, // Key para forzar re-render de ImagePreview
      filterTabKey: 0, // Key para forzar re-render de FilterTab
      editorSettings: {} // Nuevo: almacenar ajustes del editor
    };
  },
  computed: {
    combinedAdjustments() {
      return {
        ...this.currentAdjustments,
        editorSettings: this.initialSettings?.editorSettings || {}
      };
    }
  },
  watch: {
    visible(newVal) {
      if (newVal && this.initialSettings) {
        // Cargar ajustes iniciales si existen
        if (this.initialSettings.filter) {
          this.selectedFilter = this.initialSettings.filter;
        }
        if (this.initialSettings.adjustments) {
          this.currentAdjustments = { ...this.initialSettings.adjustments };
        }
        // Forzar re-render para mostrar los ajustes correctos
        this.previewKey += 1;
      }
    }
  },
  methods: {
    selectFilter(filterClass) {
      this.selectedFilter = filterClass;
    },
    updateAdjustment(name, value) {
      this.currentAdjustments[name] = Number(value);
    },
    resetAdjustments() {
      // Resetear valores
      this.selectedFilter = 'normal';
      this.currentAdjustments = {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        fade: 0,
        warmth: 0,
        vignette: 0
      };

      // Forzar re-render de los componentes
      this.previewKey += 1;
      this.filterTabKey += 1;

      // Si estamos en la pestaña de ajustes, también necesitamos actualizar los sliders
      if (this.activeTab === 'adjustments') {
        // Forzar re-render de AdjustmentsTab también
        this.$nextTick(() => {
          // Esto asegurará que los sliders se actualicen visualmente
          this.activeTab = 'filters';
          this.$nextTick(() => {
            this.activeTab = 'adjustments';
          });
        });
      }
    },
    applyChanges() {
      // Combinar ajustes del editor con los filtros - CORREGIDO
      const finalSettings = {
        editorSettings: this.initialSettings?.editorSettings || {}, // Usar initialSettings
        filter: this.selectedFilter,
        adjustments: { ...this.currentAdjustments }
      };

      this.$emit('apply-changes', finalSettings);
    },

    // Nuevo método para volver al editor
    goBackToEditor() {
      // Guardar los ajustes actuales antes de volver
      const currentSettings = {
        editorSettings: this.initialSettings?.editorSettings || {}, // Incluir editorSettings
        filter: this.selectedFilter,
        adjustments: { ...this.currentAdjustments }
      };

      this.$emit('go-back', currentSettings);
    },
  }
};
</script>

<style scoped>
.filter-adjust-content {
  display: flex;
  height: 70vh;
  max-height: 600px;
}

.controls-container {
  width: 320px;
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
}

.controls-tabs {
  display: flex;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 1rem;
}

@media (max-width: 991px) {
  .filter-adjust-content {
    flex-direction: column;
    height: auto;
    max-height: 80vh;
    overflow-y: auto;
  }

  .controls-container {
    width: 100%;
    margin-left: 0;
    margin-top: 1.5rem;
  }

  .controls-tabs {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .filter-adjust-content {
    padding: 0.5rem;
  }

  .controls-tabs {
    flex-wrap: wrap;
  }

  .tab-button {
    flex: 1 0 50%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .editor-footer {
    flex-direction: column;
    gap: 1rem;
  }

  .right-buttons {
    width: 100%;
    justify-content: space-between;
  }
}

.tab-button {
  flex: 1;
  padding: 0.75rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-weight: 500;
  color: #6c757d;
}

.tab-button.active {
  color: #4263eb;
  border-bottom-color: #4263eb;
}

.editor-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.right-buttons {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 991px) {
  .filter-adjust-content {
    flex-direction: column;
    height: auto;
  }

  .controls-container {
    width: 100%;
    margin-left: 0;
    margin-top: 1.5rem;
  }
}
</style>