<script>
import { defineComponent } from "vue";
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import ToolbarComponent from "./public/components/toolbar.component.vue";

export default defineComponent({
  name: 'App',
  components: { LanguageSwitcher, Toolbar: ToolbarComponent },
  data() {
    return {
      showHeader: true,
    }
  },
})
</script>

<template>
  <div class="app-container">
    <toolbar v-if="showHeader" class="app-header"></toolbar>
    <div class="app-layout">
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style>
.app-container {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  width: 100%;

}

.app-layout {
  display: flex;
  flex: 1;
}

main {
  flex: 1;
  padding: 20px;
}

</style>