<template>
  <div class="hamburger-menu">
    <pv-button class="hamburger-button" @click="toggleMenu">
      <i class="fas fa-bars" v-if="!isOpen"></i>
      <i class="fas fa-times" v-else></i>
    </pv-button>

    <transition name="slide">
      <div class="menu-overlay" v-if="isOpen" @click="closeMenu">
        <div class="menu-content" @click.stop>
          <div class="menu-header">
            <h3>Menú</h3>
          </div>
          <nav class="menu-nav">
            <router-link
                v-for="item in menuItems"
                :key="item.path"
                :to="item.path"
                class="menu-link"
                @click="closeMenu"
            >
              <i :class="item.icon"></i>
              <span>{{ item.text }}</span>
            </router-link>
          </nav>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "hamburger-menu",
  props: {
    menuItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    }
  },
  watch: {
    $route() {
      this.closeMenu();
    }
  }
};
</script>

<style scoped>
.hamburger-menu {
  display: none;
}

.hamburger-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.hamburger-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: flex-start;
}

.menu-content {
  width: 70%;
  max-width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

.menu-header {
  padding: 1.5rem;
  background-color: #444444;
  color: white;
}

.menu-nav {
  padding: 1rem 0;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;
  border-left: 4px solid transparent;
}

.menu-link:hover {
  background-color: #f0f5ff;
  border-left-color: #2575fc;
}

.menu-link i {
  margin-right: 0.75rem;
  width: 20px;
  text-align: center;
}

.menu-link.router-link-active {
  background-color: #e6f0ff;
  border-left-color: #2575fc;
  color: #2575fc;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .hamburger-menu {
    display: block;
  }
}
</style>