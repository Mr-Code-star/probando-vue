<script>
import PaymentFormCard from "../components/payment-form-card.component.vue";
import PaymentSummaryCard from "../components/payment-summary-card.component.vue";

export default {
  name: "payment-management",
  components: { PaymentFormCard, PaymentSummaryCard }
}
</script>

<template>
  <div class="payment-container">
    <div class="payment-summary">
      <payment-summary-card></payment-summary-card>
    </div>
    <div class="payment-form">
      <payment-form-card></payment-form-card>
    </div>
  </div>
</template>

<style scoped>
.payment-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

@media (min-width: 768px) {
  .payment-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

/* Opcional: Ajustar el padding en móviles */
@media (max-width: 480px) {
  .payment-container {
    padding: 1rem;
    gap: 1rem;
  }
}
</style>