<script>
import ListPlanCard from "../components/list-plan-card.component.vue";
export default {
  name: 'subscription-and-plan-management',
  components: {
    ListPlanCard,
  }
}
</script>

<template>
  <div class="page-container">
    <ListPlanCard />
  </div>
</template>

<style scoped>
.page-container {
  padding: 20px;
}
</style>