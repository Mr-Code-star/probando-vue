<template>
  <div class="control-group">
    <label>Recorte de video</label>
    <div class="time-controls">
      <div class="time-input">
        <label>Inicio:</label>
        <input
            type="number"
            :value="start"
            @input="$emit('update:start', parseFloat($event.target.value))"
            step="0.1"
            :min="0"
            :max="duration"
        />
        <span>seg</span>
      </div>
      <div class="time-input">
        <label>Fin:</label>
        <input
            type="number"
            :value="end"
            @input="$emit('update:end', parseFloat($event.target.value))"
            step="0.1"
            :min="start"
            :max="duration"
        />
        <span>seg</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrimControls',
  props: {
    start: Number,
    end: Number,
    duration: Number
  },
  emits: ['update:start', 'update:end']
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

.time-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.time-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-input label {
  white-space: nowrap;
  min-width: 50px;
}

.time-input input {
  width: 70px;
  padding: 0.375rem 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 0.9rem;
}

.time-input span {
  font-size: 0.9rem;
}

@media (max-width: 900px) {
  .time-controls {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>