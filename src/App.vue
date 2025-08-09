<script>

import { defineComponent } from "vue";
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import Sidebar from "./public/components/sidebar.component.vue";

export default defineComponent({
  name: 'App',
  components: { LanguageSwitcher, Sidebar },
  data() {
    return {
      showHeader: true, // Siempre mostrar el header (que contiene el language-switcher)
      showSidebar: true // Estado para controlar solo la visibilidad del sidebar
    }
  },
  methods: {
    /**
     * Determines if the sidebar should be shown based on the current route.
     * @returns {boolean} True if the sidebar should be shown, false otherwise.
     */
    shouldShowSidebar() {
      const hiddenRouteNames = [
        'checkout-simulator',
        'login',
        'payment-management',
        'subscription-plan-management',
        'not-found',
        'register'
      ];
      return !hiddenRouteNames.includes(this.$route.name);
    }
  },
  watch: {
    '$route'() {
      // Siempre mostrar el header (language-switcher)
      this.showHeader = true;
      // Controlar solo la visibilidad del sidebar
      this.showSidebar = this.shouldShowSidebar();
    }
  },
  created() {
    // Inicializar visibilidad
    this.showHeader = true;
    this.showSidebar = this.shouldShowSidebar();
  }
})
</script>

<template>
  <div class="app-container">
    <div class="app-header" v-if="showHeader">
      <language-switcher class="language-switcher-container"></language-switcher>
    </div>
    <div class="app-layout">
      <sidebar v-if="showSidebar" class="app-sidebar"></sidebar>
      <main :class="{ 'with-sidebar': showSidebar }">
        <router-view></router-view>
      </main>
    </div>
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

.app-layout {
  display: flex;
  min-height: calc(100vh - 60px); /* Ajusta según la altura del header */
}

.app-sidebar {
  width: 250px; /* Ancho del sidebar */
  background: #f5f5f5;
  border-right: 1px solid #ddd;
}

main {
  flex: 1;
  padding: 20px;
}

main.with-sidebar {
  margin-left: 250px; /* Igual al ancho del sidebar */
}

@media (max-width: 768px) {
  .app-sidebar {
    width: 200px;
  }
  main.with-sidebar {
    margin-left: 200px;
  }
}
</style>