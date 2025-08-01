<script>

import {defineComponent} from "vue";
import LanguageSwitcher from "./public/components/language-switcher.component.vue";

export default defineComponent({
  components: {LanguageSwitcher}
})
</script>

<template>
  <div class="app-container">
    <div class="app-header">
      <language-switcher class="language-switcher-container"></language-switcher>
    </div>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
.app-container {
  position: relative;
}

.app-header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>