<template>
  <pv-dialog
      :visible="visible"
      :modal="true"
      :closable="true"
      :style="{ width: '40rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      @update:visible="$emit('close')"
  >
    <template #header>
      <h3>Crear publicación de texto</h3>
    </template>

    <div class="text-composer-content">
      <div class="content-input-container">
        <textarea
            v-model="content"
            class="content-input"
            placeholder="¿Qué quieres compartir?"
            rows="5"
        ></textarea>
      </div>

      <div class="composer-actions">
        <pv-button
            label="Cancelar"
            class="p-button-text"
            @click="$emit('close')"
        />
        <pv-button
            label="Publicar"
            :loading="loading"
            @click="$emit('submit', content)"
            icon="pi pi-send"
        />
      </div>
    </div>
  </pv-dialog>
</template>

<script>
export default {
  name: 'TextOnlyDialog',
  props: {
    visible: Boolean,
    initialContent: String,
    loading: Boolean
  },
  data() {
    return {
      content: this.initialContent || ''
    };
  },
  watch: {
    initialContent(newContent) {
      this.content = newContent || '';
    }
  }
};
</script>

<style scoped>
.text-composer-content {
  padding: 1.5rem;
}

.content-input-container {
  margin-bottom: 1.5rem;
}

.content-input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  font-size: 1rem;
  line-height: 1.5;
}

.content-input:focus {
  outline: none;
  border-color: #4263eb;
  box-shadow: 0 0 0 3px rgba(66, 99, 235, 0.15);
}

.content-input::placeholder {
  color: #6c757d;
}

.composer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

@media (max-width: 575px) {
  .text-composer-content {
    padding: 1rem;
  }

  .composer-actions {
    flex-direction: column;
  }

  .composer-actions .p-button {
    width: 100%;
    justify-content: center;
  }
}
</style>