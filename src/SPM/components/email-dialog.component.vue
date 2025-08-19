<template>
  <pv-dialog
      v-model:visible="visible"
      modal
      header="Correo electrónico requerido"
      :style="{ width: '450px' }"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
  >
    <div class="p-fluid">
      <div class="field">
        <label class="label" for="email">Ingrese su correo para continuar con el pago:</label>
        <pv-input-text
            id="email"
            v-model="email"
            type="email"
            placeholder="ejemplo@correo.com"
            :class="{ 'p-invalid': error }"
            @keyup.enter="handleSubmit"
        />
        <small v-if="error" class="p-error">{{ error }}</small>
      </div>
    </div>

    <template #footer>
      <pv-button
          label="Cancelar"
          icon="pi pi-times"
          @click="handleClose"
          class="p-button-text"
      />
      <pv-button
          label="Continuar"
          icon="pi pi-check"
          @click="handleSubmit"
          autofocus
      />
    </template>
  </pv-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'email-dialog',
  emits: ['submit', 'close'],
  setup(props, { emit }) {
    const visible = ref(false);
    const email = ref('');
    const error = ref('');

    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value || !emailRegex.test(email.value)) {
        error.value = "Ingrese un correo válido";
        return false;
      }
      error.value = "";
      return true;
    };

    const handleSubmit = () => {
      if (validateEmail()) {
        emit('submit', email.value);
        visible.value = false;
        email.value = '';
      }
    };

    const handleClose = () => {
      emit('close');
      visible.value = false;
      email.value = '';
      error.value = '';
    };

    const open = () => {
      visible.value = true;
    };

    return {
      visible,
      email,
      error,
      handleSubmit,
      handleClose,
      open
    };
  }
};
</script>

<style scoped>
.p-dialog .p-inputtext {
  width: 100%;
}

.label {
  display: block;
  margin-bottom: 0.5rem; /* Añade espacio debajo del label */
}
.p-error {
  color: #f44336;
  font-size: 0.875rem;
}
</style>