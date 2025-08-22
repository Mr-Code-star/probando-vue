<!-- src/PPM/components/posts/post-list.component.vue -->
<template>
  <div class="post-list">
    <div v-if="loading" class="loading">Cargando posts...</div>

    <div v-else-if="posts.length === 0" class="empty-state">
      <p>No hay posts todavía</p>
      <pv-button @click="$emit('create-post')" class="create-btn">
        Crear primer post
      </pv-button>
    </div>

    <div v-else class="posts-container">
    </div>
  </div>
</template>

<script>

export default {
  name: 'PostList',
  props: {
    posts: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlePostUpdated(updatedPost) {
      this.$emit('post-updated', updatedPost);
    },
    handlePostDeleted(postId) {
      this.$emit('post-deleted', postId);
    }
  }
};
</script>

<style scoped>
.post-list {
  width: 100%;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #888;
}

.empty-state p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.create-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.create-btn:hover {
  background: #0056b3;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>