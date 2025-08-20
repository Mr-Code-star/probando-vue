<script>
import LanguageSwitcher from "./language-switcher.component.vue";
import HamburgerMenu from "./hamburger-menu.component.vue";

export default {
  name: "Toolbar",
  components: {
    LanguageSwitcher,
    HamburgerMenu
  },
  data() {
    return {
      menuItems: [
        { text: "Inicio", path: "/home", icon: "fas fa-home" },
        { text: "Perfil", path: "/profile", icon: "fas fa-user" },
        { text: "Configuración", path: "/settings", icon: "fas fa-cog" }
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
  <div>
    <pv-toolbar class="toolbar" v-if="shouldShowFullToolbar">
      <template #start>
        <div class="logo">
          <i class="fas fa-globe"></i>
          <span>MiApp</span>
        </div>
        <div class="desktop-menu">
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

    <div v-else class="minimal-toolbar">
      <div class="logo">
        <i class="fas fa-globe"></i>
        <span>MiApp</span>
      </div>
      <language-switcher />
    </div>

    <!-- Menú hamburguesa (solo visible en móviles) -->
    <HamburgerMenu
        v-if="shouldShowFullToolbar"
        :menuItems="menuItems"
        class="mobile-menu"
    />
  </div>
</template>

<style scoped>
.toolbar {
  padding: 0.8rem 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000;
}

.minimal-toolbar {
  padding: 0.8rem 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  margin-right: 2rem;
}

.logo i {
  margin-right: 10px;
}

.desktop-menu {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.menu-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.menu-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.mobile-menu {
  display: none;
}

/* Responsive */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .mobile-menu {
    display: block;
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 1001;
  }

  .toolbar, .minimal-toolbar {
    padding: 0.8rem 1rem;
  }

  .logo {
    margin-left: 3rem;
  }
}
</style>