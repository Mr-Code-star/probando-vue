<template>
  <div class="additional-options">
    <div class="option-item" @click="$emit('toggle-location')">
      <i class="pi pi-map-marker"></i>
      <span>{{ location || 'Agregar ubicación' }}</span>
    </div>

    <div class="option-item" @click="$emit('toggle-collaborators')">
      <i class="pi pi-users"></i>
      <span>Agregar colaboradores</span>
    </div>

    <div class="option-item" @click="$emit('toggle-share-options')">
      <i class="pi pi-share-alt"></i>
      <span>Compartir en</span>
    </div>

    <div class="option-item" @click="$emit('toggle-accessibility')">
      <i class="pi pi-eye"></i>
      <span>Accesibilidad</span>
    </div>

    <div class="option-item" @click="$emit('toggle-advanced-settings')">
      <i class="pi pi-cog"></i>
      <span>Configuración avanzada</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdditionalOptions',
  props: {
    location: String
  },
  emits: [
    'toggle-location',
    'toggle-collaborators',
    'toggle-share-options',
    'toggle-accessibility',
    'toggle-advanced-settings'
  ]
};
</script>

<style scoped>
.additional-options {
  padding: 0.5rem 0;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
}

.option-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.option-item i {
  margin-right: 12px;
  font-size: 1.2rem;
}
</style>