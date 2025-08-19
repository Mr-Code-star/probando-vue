<template>
  <div class="profile-container">
    <div class="profile-left">
      <user-avatar :userId="currentUserId" size="large" />
    </div>
    <div class="profile-right">
      <profile-summary :userId="currentUserId" />
    </div>
  </div>
</template>

<script>
import UserAvatar from "../../P&&P/components/user-avatar.component.vue";
import ProfileSummary from "../../P&&P/components/profile-summary.component.vue";

export default {
  name: "Profile",
  components: { ProfileSummary, UserAvatar },
  data() {
    return {
      currentUserId: null
    };
  },
  created() {
    this.loadUserId();
  },
  methods: {
    loadUserId() {
      try {
        const userData = localStorage.getItem('user');
        const user = userData ? JSON.parse(userData) : null;

        if (!user || !user.id) {
          this.$router.push('/login');
          return;
        }

        this.currentUserId = user.id;

      } catch (error) {
        console.error('Error loading user:', error);
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  flex-direction: column; /* Columna en móviles */
}

.profile-left {
  flex: 0 0 auto; /* Ancho automático */
  width: 100%;
  display: flex;
  justify-content: center;
}

.profile-right {
  flex: 1;
  width: 100%;
}

@media (min-width: 768px) {
  .profile-container {
    flex-direction: row; /* Fila en pantallas más grandes */
    gap: 4rem;
  }

  .profile-left {
    flex: 0 0 200px;
    justify-content: flex-start;
    width: auto;
    align-self: flex-start;
    position: sticky;
    top: 1rem;
  }

  .profile-right {
    width: auto;
  }
}
</style>