<script>
import { SubscriptionPlanService } from '../services/subscription-plan.service.js';
import { SubscriptionPlanAssembler } from '../services/subscription-plan.assembler.js';
import PlanCard from './plan-card.component.vue';

export default {
  name: "list-plan-card.component",
  components: {
    PlanCard
  },
  data() {
    return {
      plans: []
    }
  },
  async created() {
    this.isLoading = true;
    this.error = null;

    try {
      // Create an instance of the service
      const service = new SubscriptionPlanService();
      // Call the getAll method on the instance
      const response = await service.getAll();
      this.plans = SubscriptionPlanAssembler.toEntityList(response.data);
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      this.error = "Failed to load subscription plans. Please try again later.";
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<template>
  <div class="plans-container">
    <h2>Available Subscription Plans</h2>
    <div class="plans-grid">
      <PlanCard
          v-for="plan in plans"
          :key="plan.id"
          :plan="plan"
      />
    </div>
  </div>
</template>

<style scoped>
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