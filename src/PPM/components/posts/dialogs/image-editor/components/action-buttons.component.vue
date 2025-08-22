<template>
  <div class="action-buttons">
    <button @click="$emit('reset-settings')" class="reset-btn">Restablecer</button>
    <button @click="$emit('apply-changes')" class="apply-btn">Aplicar cambios</button>
  </div>
</template>

<script>
export default {
  name: 'ActionButtons',
  emits: ['reset-settings', 'apply-changes']
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
}

.reset-btn,
.apply-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.reset-btn {
  background: white;
  border: 1px solid #dee2e6;
  color: #495057;
}

.reset-btn:hover {
  background: #f8f9fa;
}

.apply-btn {
  background: #4263eb;
  border: 1px solid #4263eb;
  color: white;
}

.apply-btn:hover {
  background: #3b5bdb;
}

@media (max-width: 575px) {
  .action-buttons {
    flex-direction: column;
  }
}
</style>