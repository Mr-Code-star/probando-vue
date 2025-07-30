<script>
import {
  Button as PvButton,
  Card as PvCard,
  Checkbox as PvCheckbox,
  Dropdown as PvDropdown,
  FloatLabel as PvFloatLabel,
  InputMask as PvInputMask,
  InputText as PvInputText
} from "primevue";

export default {
  name: "payment-form-card",
  components: {PvButton, PvCheckbox, PvDropdown, PvInputMask, PvFloatLabel, PvInputText, PvCard},
  data() {
    return {
      termsAccepted: false,
      cardName: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      addressLine1: '',
      addressLine2: '',
      district: '',
      postalCode: '',
      selectedCountry: {name: 'Perú', code: 'PE'},
      selectedProvince: null,
      countries: [
        {name: 'Perú', code: 'PE'},
        {name: 'Argentina', code: 'AR'},
        {name: 'Chile', code: 'CL'},
        {name: 'Colombia', code: 'CO'},
        {name: 'México', code: 'MX'}
      ],
      provinces: [
        {name: 'Lima', code: 'LIM'},
        {name: 'Arequipa', code: 'ARE'},
        {name: 'Cusco', code: 'CUS'},
        {name: 'Piura', code: 'PIU'},
        {name: 'La Libertad', code: 'LAL'}
      ]
    }
  },
  computed: {
    isPeruSelected() {
      return this.selectedCountry?.code === 'PE';
    }
  }
}
</script>

<template>
  <pv-card class="payment-card">
    <template #content>
      <div class="grid">
        <div class="col-12">
          <h3 class="section-title">Información de Contacto</h3>
          <div class="field">
            <label for="email" class="input-label">Correo Electrónico</label>
            <pv-input-text
                id="email"
                type="email"
                class="input-field"
                v-model="email"
                placeholder="ejemplo@correo.com"
            />
          </div>
        </div>

        <div class="col-12">
          <h3 class="section-title">Método de Pago</h3>
          <div class="field">
            <label class="input-label">Información de la tarjeta</label>
            <div class="card-inputs">
              <pv-input-mask
                  id="cardNumber"
                  mask="9999 9999 9999 9999"
                  class="input-field card-number"
                  v-model="cardNumber"
                  placeholder="1234 1234 1234 1234"
              />
              <div class="grid card-details">
                <div class="col-6">
                  <pv-input-mask
                      id="expiry"
                      mask="99/99"
                      class="input-field expiry"
                      v-model="expiryDate"
                      placeholder="MM/AA"
                  />
                </div>
                <div class="col-6">
                  <pv-input-mask
                      id="cvc"
                      mask="9999"
                      class="input-field cvc"
                      v-model="cvc"
                      placeholder="CVC"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <label for="cardName" class="input-label">Nombre del titular de la tarjeta</label>
            <pv-input-text
                id="cardName"
                class="input-field"
                v-model="cardName"
                placeholder="Nombre Completo"
            />
          </div>

          <h3 class="section-title">Dirección de Facturación</h3>
          <div class="field">
            <pv-dropdown
                v-model="selectedCountry"
                :options="countries"
                optionLabel="name"
                class="input-field"
            />
          </div>

          <div class="field">
            <pv-input-text
                class="input-field"
                v-model="addressLine1"
                placeholder="Línea 1 de Dirección"
            />
          </div>

          <div class="field">
            <pv-input-text
                class="input-field"
                v-model="addressLine2"
                placeholder="Línea 2 de Dirección"
            />
          </div>

          <div class="grid location-details">
            <div class="col-6" v-if="!isPeruSelected">
              <div class="field">
                <pv-input-text
                    id="district"
                    v-model="district"
                    class="input-field district"
                    placeholder="Ciudad"
                />
              </div>
            </div>
            <div :class="isPeruSelected ? 'col-12' : 'col-6'">
              <div class="field">
                <pv-input-text
                    id="postalCode"
                    v-model="postalCode"
                    class="input-field postalCode"
                    placeholder="Código Postal"
                />
              </div>
            </div>
          </div>

          <div class="field" v-if="isPeruSelected"> <!-- Solo visible para Perú -->
            <pv-dropdown
                v-model="selectedProvince"
                :options="provinces"
                optionLabel="name"
                class="input-field"
                placeholder="Provincia"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="field checkbox-container">
        <pv-checkbox v-model="termsAccepted" :binary="true" class="checkbox"></pv-checkbox>
        <span class="checkbox-label">
              Se te cobrará mensualmente en función de las licencias que tengas hasta que canceles.
              Al suscribirte, aceptas las condiciones comerciales y nos autorizas a almacenar
              tu método de pago para renovaciones y otras compras.
          </span>
      </div>
      <pv-button
          label="Subscribirse"
          severity="success"
          class="submit-button"
          type="submit"
      />
    </template>
  </pv-card>
</template>

<style scoped>
.payment-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: transparent;
}

.section-title {
  margin-bottom: 1.5rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1rem;
}

.checkbox {
  margin-top: 0.2rem;
}

.field {
  margin-bottom: 1.5rem;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background: transparent;
}

.card-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.card-details .col-6 {
  flex: 1;
  min-width: 0;
}

.card-details .field {
  margin-bottom: 0;
}

.card-details .input-field {
  width: 100%;
}

.card-details {
  display: flex;
  gap: 1rem;
}

.location-details {
  display: flex;
  gap: 1rem;
}

.location-details .col-6 {
  flex: 1;
  min-width: 0;
}

.location-details .field {
  margin-bottom: 0;
}

.card-number {
  margin-bottom: 0.5rem;
}

.expiry, .cvc {
  width: 100%;
}

.location-details {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .payment-card {
    padding: 1rem;
  }

  .col-6 {
    width: 100%;
  }

  .card-details,
  .location-details {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>