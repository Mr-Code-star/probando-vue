<template>
  <textarea
      :value="caption"
      @input="$emit('update:caption', $event.target.value)"
      placeholder="Escribe un pie de foto..."
      class="caption-textarea"
  ></textarea>
</template>

<script>
export default {
  name: 'CaptionTextarea',
  props: {
    caption: String
  },
  emits: ['update:caption']
};
</script>

<style scoped>
.caption-textarea {
  flex: 1;
  border: none;
  padding: 1rem;
  resize: none;
  min-height: 200px;
  border-bottom: 1px solid var(--border-color);
}

.caption-textarea:focus {
  outline: none;
}
</style>