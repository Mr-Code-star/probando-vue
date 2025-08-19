<script>
import LanguageSwitcher from "./language-switcher.component.vue";

export default {
  name: "Toolbar",
  components: {
    LanguageSwitcher
  },
  data() {
    return {
      menuItems: [
        { text: "Inicio", path: "/home" },
        { text: "Perfil", path: "/profile" },
        { text: "Configuración", path: "/settings" }
      ]
    };
  },
  computed: {
    shouldShowFullToolbar() {
      const hiddenRoutes = [
        "setup-profile",
        "checkout-simulator",
        "login",
        "payment-management",
        "subscription-plan-management",
        "not-found",
        "register"
      ];
      return !hiddenRoutes.includes(this.$route.name);
    }
  }
};
</script>

<template>
  <pv-toolbar class="toolbar" v-if="shouldShowFullToolbar">
    <template #start>
      <div class="menu-items">
        <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="menu-link"
        >
          {{ item.text }}
        </router-link>
      </div>
    </template>
    <template #end>
      <language-switcher />
    </template>
  </pv-toolbar>
  <div v-else class="language-switcher-only">
    <language-switcher />
  </div>
</template>

<style scoped>
.toolbar {
  background-color: white;
  border-bottom: 1px solid #ddd;
  padding: 0 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
}

.menu-items {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.language-switcher-only {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
}
</style>