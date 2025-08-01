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
  <div class="subscription-container">
    <h1 class="title">{{$t('plans.title')}}</h1>
    <div class="plans-wrapper">
      <subscription-item
          v-for="plan in subscriptions"
          :key="plan.id"
          :plan="plan"
      />
    </div>
  </div>
</template>

<style scoped>
.subscription-container {
  text-align: center;
  padding: 2rem 1rem;
}

.title {
  margin-bottom: 2rem;
  font-size: 2rem;
}

.plans-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  max-width: 1500px;
  margin: 0 auto;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .title {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 1.6rem;
  }

  .plans-wrapper {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.4rem;
  }

  .subscription-container {
    padding: 1.5rem 0.5rem;
  }
}
</style>