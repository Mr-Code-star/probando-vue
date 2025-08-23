<template>
  <div class="post-form">
    <user-header />

    <caption-textarea
        :caption="caption"
        @update:caption="$emit('update:caption', $event)"
    />

    <additional-options
        :location="location"
        @update:location="$emit('update:location', $event)"
        @toggle-location="$emit('toggle-location')"
        @toggle-collaborators="$emit('toggle-collaborators')"
        @toggle-share-options="$emit('toggle-share-options')"
        @toggle-accessibility="$emit('toggle-accessibility')"
        @toggle-advanced-settings="$emit('toggle-advanced-settings')"
    />
  </div>
</template>

<script>
import UserHeader from './user-header.component.vue';
import CaptionTextarea from './caption-text-tarea.component.vue';
import AdditionalOptions from './additional-options.component.vue';

export default {
  name: 'PostForm',
  components: {
    UserHeader,
    CaptionTextarea,
    AdditionalOptions
  },
  props: {
    caption: String,
    location: String
  },
  emits: [
    'update:caption',
    'update:location',
    'toggle-location',
    'toggle-collaborators',
    'toggle-share-options',
    'toggle-accessibility',
    'toggle-advanced-settings'
  ]
};
</script>

<style scoped>
.post-form {
  width: 340px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .post-form {
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--border-color);
  }
}
</style>