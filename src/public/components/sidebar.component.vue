<script>
export default {
  name: "Sidebar",
  data() {
    return {
      menuItems: [
        { text: "Inicio", path: "/" },
        { text: "Perfil", path: "/profile" },
        { text: "Configuración", path: "/settings" }
      ]
    };
  }
};
</script>

<template>
  <nav class="sidebar">
    <ul>
      <li v-for="item in menuItems" :key="item.path">
        <router-link :to="item.path">{{ item.text }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  height: 100%;
  padding: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

.sidebar a {
  text-decoration: none;
  color: #333;
}

.sidebar a:hover {
  color: #0066cc;
}
</style>