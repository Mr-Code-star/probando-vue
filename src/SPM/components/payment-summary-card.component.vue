<script>
import {Card as PvCard} from "primevue";

export default {
  name: "payment-summary-card",
  components: {PvCard}
}
</script>

<template>
  <pv-card class="payment-summary-card">
    <template #title>
      <h3 class="section-title">Resumen de Pago</h3>
    </template>
  </pv-card>
</template>

<style scoped>
.payment-summary-card {
  border: none;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.section-title {
  margin: 0;
  font-size: 1.25rem;
  text-align: center;
}

@media (max-width: 768px) {
  .payment-summary-card {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.1rem;
  }
}
</style>