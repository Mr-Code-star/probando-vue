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
            @click="$emit('go-back')"
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
      ]
    };
  },
  watch: {
    visible(newVal) {
      if (newVal && this.initialSettings) {
        this.loadInitialSettings();
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
      this.selectedFilter = 'normal';
      this.currentAdjustments = {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        fade: 0,
        warmth: 0,
        vignette: 0
      };
    },
    applyChanges() {
      this.$emit('apply-changes', {
        filter: this.selectedFilter,
        adjustments: { ...this.currentAdjustments }
      });
    },
    loadInitialSettings() {
      if (this.initialSettings.filter) {
        this.selectedFilter = this.initialSettings.filter;
      }
      if (this.initialSettings.adjustments) {
        this.currentAdjustments = { ...this.currentAdjustments, ...this.initialSettings.adjustments };
      }
    }
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

/* Estilos CSS para los filtros */
.filter-aden {
  filter: sepia(0.2) brightness(1.15) saturate(1.4);
}

.filter-clarendon {
  filter: contrast(1.2) saturate(1.35);
}

.filter-crema {
  filter: sepia(0.5) contrast(1.25) brightness(1.15) saturate(0.9);
}

.filter-gingham {
  filter: brightness(1.05) contrast(1.1);
}

.filter-juno {
  filter: sepia(0.35) contrast(1.15) brightness(1.15) saturate(1.8);
}

.filter-lark {
  filter: contrast(0.9) brightness(1.1) saturate(1.1);
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