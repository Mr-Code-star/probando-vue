<script>
export default {
  name: "language-switcher",
  data() {
    return {
      languages: []
    }
  },
  created() {
    this.languages = this.$i18n.availableLocales;
  }
}
</script>

<template>
  <div class="language-switcher-container">
    <pv-select-button v-model="$i18n.locale" :options="languages">
      <template #option="slotProps">
        {{ slotProps.option.toUpperCase() }}
      </template>
    </pv-select-button>
  </div>
</template>

<style scoped>
.language-switcher-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

</style>