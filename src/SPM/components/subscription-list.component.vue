<script>

import SubscriptionItem from "./subscription-item.component.vue";

export default {
  name: "subscription-list",
  components: {SubscriptionItem},
  props:{
    subscriptions: {
      type: Array,
      required: true
    }
  }

}
</script>

<template>
<div class = "plans-container">
  <h2>Available Subscription Plans</h2>
  <div v-if="subscriptions.length > 0" class="plans-grid">
    <subscription-item
        v-for="plan in subscriptions"
        :key="plan.id"
        :plan="plan"
    />
  </div>
  <p v-else>No subscription plans available.</p>
</div>
</template>

<style>
.plans-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.plans-container h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.plans-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

@media (max-width: 768px) {
  .plans-grid {
    flex-direction: column;
    align-items: center;
  }
}
</style>