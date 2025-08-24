<template>
  <div>
    <!-- Selector de proporción de aspecto -->
    <div class="control-group">
      <pv-float-label>Proporción de aspecto</pv-float-label>
      <div class="aspect-ratio-selector">
        <select
            :value="aspectRatio"
            @change="$emit('update:aspectRatio', $event.target.value)"
            class="ratio-select"
        >
          <option value="original">Original</option>
          <option value="1:1">1:1 (Cuadrado)</option>
          <option value="4:5">4:5 (Vertical)</option>
          <option value="16:9">16:9 (Panorámico)</option>
        </select>
      </div>
    </div>

    <!-- Controles de zoom -->
    <div class="control-group">
      <pv-float-label>Zoom: {{ zoomLevel }}%</pv-float-label>
      <div class="slider-container">
        <button @click="$emit('adjust-zoom', -10)" class="control-btn">-</button>
        <input
            type="range"
            :value="zoomLevel"
            @input="$emit('update:zoomLevel', Number($event.target.value))"
            min="100"
            max="300"
            step="5"
            class="zoom-slider"
        />
        <button @click="$emit('adjust-zoom', 10)" class="control-btn">+</button>
      </div>
    </div>

  </div>
</template>

<script>
import {FloatLabel as PvFloatLabel} from "primevue";

export default {
  name: 'EditorControls',
  components: {PvFloatLabel},
  props: {
    zoomLevel: Number,
    aspectRatio: {
      type: String,
      default: 'original'
    }
  },
  emits: [
    'update:zoomLevel',
    'update:aspectRatio',
    'adjust-zoom',
  ]
};
</script>

<style scoped>
.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.control-group label {
  font-weight: 500;
  color: #212529;
  font-size: 0.9rem;
}

.aspect-ratio-selector {
  width: 100%;
}

.ratio-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: white;
  font-size: 0.9rem;
  color: #212529;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #dee2e6;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.control-btn:hover {
  background: #f8f9fa;
  border-color: #adb5bd;
}

.zoom-slider {
  flex: 1;
  -webkit-appearance: none;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  outline: none;
}

.zoom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4263eb;
  cursor: pointer;
  transition: all 0.3s ease;
}

.zoom-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4263eb;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}
</style>