<script>
import {Button as PvButton, Card as PvCard} from "primevue";
import {goToCheckout} from "../../shared/services/stripe.service.js";

export default {
  name: 'subscription-item',
  components: {PvCard, PvButton},
  props: {
    plan: {
      type: Object,
      required: true
    }
  },
  computed: {
    translatedFeatures() {
      const planType = this.plan.name.toLowerCase().includes('standard') ? 'standard' : 'premium';
      const features = [];
      let i = 1;

      // Continuar agregando características mientras existan en la traducción
      while (this.$te(`plans.${planType}.features.feature${i}`)) {
        features.push(this.$t(`plans.${planType}.features.feature${i}`));
        i++;
      }

      return features;
    },
    isPopular() {
      return this.plan.name.toLowerCase().includes('premium');
    }
  },
  methods: {
    async onStartNow(){
      try {
        await goToCheckout(this.plan.stripe_price_id);
      } catch (error) {
        console.error('Error during checkout:', error);
        this.$toast.add({
          severity: 'error',
          summary: this.$t('plans.errorTitle'),
          detail: this.$t('plans.errorMessage'),
          life: 3000
        });
      }
    }
  }
}
</script>

<template>
  <pv-card class="plan-card" :class="{'popular-plan': isPopular}">
    <template #header>
      <div class="plan-header">
        <h2 style="text-align: left; margin: 1rem 0 0 0; padding-left: 20px; zoom: 120%">{{ plan.name }}</h2>
        <div v-if="isPopular" class="popular-badge">{{ $t('plans.popular') }}</div>
        <h3 style="text-align: left; color: #4CAF50; margin: 0.5rem 0; padding-left: 24px; zoom: 240% ">$ {{ plan.price.toFixed(2) }} <span style="font-size: 0.5em; vertical-align: super;">{{$t('plans.month')}}</span></h3>
      </div>
    </template>

    <template #content>
      <ul class="features-list">
        <li v-for="(feature, index) in translatedFeatures" :key="index" class="feature-item">
          <i class="pi pi-check"></i>
          <span>{{ feature }}</span>
        </li>
      </ul>
    </template>

    <template #footer>
      <pv-button
          class="b-start"
          @click="onStartNow"
      ><b>{{$t('plans.startNow')}}</b></pv-button>
    </template>
  </pv-card>
</template>

<style scoped>
.plan-card {
  width: 700px;
  margin: 1rem;
  display: inline-block;
  position: relative;
  border: 1px solid #e0e0e0;
}

.plan-card.popular-plan {
  border: 2px solid #4CAF50;
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.2);
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-item i {
  color: #4CAF50;
  margin-right: 0.75rem;
  font-size: 1.1rem;
}

.popular-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #4CAF50;
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.features-list {
  list-style: none;
  padding: 0 1.5rem;
  margin: 1rem 0;
}

.feature-item {
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
}

.plan-card {
  vertical-align: top;
  transition: transform 0.2s;
}
.b-start{
  background-color: #000;
  color: #fff;
  justify-content: center;
  padding: 0.5rem 0rem 0.5rem 0rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  width: 95%;
  transition: 0.43s;
}
.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
@media (max-width: 768px) {
  .plan-card {
    width: 100%;
    margin: 1rem 0;
  }
  .feature-item {
    font-size: 1rem;
    padding: 0.8rem 0;
  }

  h3 {
    zoom: 180% !important;
  }
}
@media (max-width: 480px) {
  .feature-item {
    font-size: 0.95rem;
    padding: 0.6rem 0;
  }

  .popular-badge {
    font-size: 0.65rem;
    padding: 0.2rem 0.8rem;
  }

  h3 {
    zoom: 150% !important;
  }
}
</style>