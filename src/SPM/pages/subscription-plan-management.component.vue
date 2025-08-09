<script>
import SubscriptionList from "../components/subscription-list.component.vue";
import {SubscriptionPlanService} from "../services/subscription-plan.service.js";
import {SubscriptionPlanAssembler} from "../services/subscription-plan.assembler.js";
export default {
  name: 'subscription-plan-management',
  components: {
    SubscriptionList
  },
  data(){
    return{
      subscriptionsPlans:[],
      subscriptionPlanService: null
    };
  },
  created() {
    // Initialization services
    this.subscriptionPlanService = new SubscriptionPlanService();

    // Subscription Plans loading
    this.subscriptionPlanService.getAll().then(response =>{
      this.subscriptionsPlans = SubscriptionPlanAssembler.toEntitiesFromResponse(response);
      console.log('Subscription Plans loaded:', this.subscriptionsPlans);
    }).catch(error => {
      console.error("Plans data loading error: ", error)
    })
  }
}
</script>

<template>
  <subscription-list :subscriptions="subscriptionsPlans" />
</template>

<style>
</style>