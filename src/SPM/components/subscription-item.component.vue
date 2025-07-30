<script>
import {Button as PvButton} from "primevue";

export default {
  name: 'subscription-item',
  components: {PvButton},
  props: {
    plan: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class = "plan-item">
    <div class = "plan-header">
      <h3>{{plan.name}}</h3>
      <div class = "plan-details">${{plan.price.toFixed(2)}}</div>
    </div>

    <ul class = "plan-features">
      <li v-for="(feature, index) in plan.features" :key="index">
        {{feature}}
      </li>
    </ul>

    <button class="select-button">Select Plan</button>
  </div>
</template>

<style>
.plan-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 280px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: 0.2s;
}
.plan-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}
.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.plan-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}


.plan-features {
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
}

.plan-features li {
  padding: 8px 0;
  border-bottom: 1px dotted #eee;
}

.plan-features li:last-child {
  border-bottom: none;
}

.select-button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.select-button:hover {
  background-color: #369f6e;
}
</style>