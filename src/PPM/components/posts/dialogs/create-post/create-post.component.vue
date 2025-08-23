<template>
  <pv-dialog
      :visible="visible"
      :modal="true"
      :closable="false"
      :style="{ width: '80rem', maxWidth: '95vw' }"
      :breakpoints="{ '1199px': '90vw', '575px': '95vw' }"
  >
    <template #header>
      <div class="dialog-header">
        <h3>Crear nueva publicación</h3>
      </div>
    </template>

    <div class="post-creator-dialog">
      <div class="dialog-content">
        <!-- Cambiar MediaPreview por ImagePreview para mostrar la proporción de aspecto -->
        <ImagePreview
            :imageUrl="currentMediaUrl"
            :selectedFilter="filterSettings?.filter || 'normal'"
            :adjustments="filterSettings?.adjustments || {}"
            :editorSettings="editorSettings"
            class="media-preview-content"
        />

        <post-form
            :caption="caption"
            :location="location"
            @update:caption="caption = $event"
            @update:location="location = $event"
            @toggle-location="toggleLocation"
            @toggle-collaborators="toggleCollaborators"
            @toggle-share-options="toggleShareOptions"
            @toggle-accessibility="toggleAccessibility"
            @toggle-advanced-settings="toggleAdvancedSettings"
        />
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <pv-button
            label="Cancelar"
            icon="pi pi-times"
            class="p-button-text"
            @click="closeDialog"
        />
        <pv-button
            label="Compartir"
            icon="pi pi-check"
            :disabled="!canShare"
            @click="sharePost"
        />
      </div>
    </template>
  </pv-dialog>
</template>

<script>
import ImagePreview from '../filter-adjust/components/image-preview.component.vue'; // Importar ImagePreview
import PostForm from './components/post-form.component.vue';

export default {
  name: 'CreatePostDialog',
  components: {
    ImagePreview, // Cambiar de MediaPreview a ImagePreview
    PostForm
  },
  props: {
    visible: Boolean,
    mediaFiles: Array,
    currentMediaIndex: Number,
    filterSettings: Object,
    editorSettings: Object // Nueva prop para recibir ajustes del editor
  },
  data() {
    return {
      caption: '',
      location: '',
      collaborators: [],
      shareOptions: {},
      accessibilitySettings: {},
      advancedSettings: {}
    };
  },
  computed: {
    canShare() {
      return this.mediaFiles.length > 0;
    },
    currentMediaUrl() {
      if (this.mediaFiles.length > 0 && this.currentMediaIndex >= 0) {
        return URL.createObjectURL(this.mediaFiles[this.currentMediaIndex]);
      }
      return '';
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
    toggleLocation() {
      console.log('Toggle location selector');
    },
    toggleCollaborators() {
      console.log('Toggle collaborators selector');
    },
    toggleShareOptions() {
      console.log('Toggle share options');
    },
    toggleAccessibility() {
      console.log('Toggle accessibility settings');
    },
    toggleAdvancedSettings() {
      console.log('Toggle advanced settings');
    },
    sharePost() {
      const postData = {
        media: this.mediaFiles,
        caption: this.caption,
        location: this.location,
        collaborators: this.collaborators,
        filterSettings: this.filterSettings,
        editorSettings: this.editorSettings, // Incluir ajustes del editor
        shareOptions: this.shareOptions,
        accessibilitySettings: this.accessibilitySettings,
        advancedSettings: this.advancedSettings
      };

      this.$emit('create-post', postData);
    }
  }
};
</script>

<style scoped>
.post-creator-dialog {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.dialog-content {
  display: flex;
  height: 60vh;
  overflow: hidden;
}

.media-preview-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
}

@media (max-width: 768px) {
  .dialog-content {
    flex-direction: column;
  }

  .media-preview-content {
    height: 300px;
  }
}
</style>