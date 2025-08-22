<template>
  <div class="adjustments-panel">
    <div class="adjustment-control" v-for="adjustment in adjustments" :key="adjustment.name">
      <label>{{ adjustment.label }}: {{ currentValues[adjustment.name] }}</label>
      <input
          type="range"
          :min="adjustment.min"
          :max="adjustment.max"
          :step="adjustment.step"
          :value="currentValues[adjustment.name]"
          @input="$emit('update-adjustment', adjustment.name, $event.target.value)"
          class="adjustment-slider"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdjustmentsTab',
  props: {
    adjustments: Array,
    currentValues: Object
  },
  emits: ['update-adjustment']
};
</script>

<style scoped>
.adjustments-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.adjustment-control {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.adjustment-control label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #495057;
}

.adjustment-slider {
  width: 100%;
}
</style>