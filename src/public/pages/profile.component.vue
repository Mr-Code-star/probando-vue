<template>
  <div class="profile-container">
    <div class="profile-left">
      <user-avatar :userId="currentUserId" />
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
  align-items: stretch; /* Cambiado a stretch para igualar alturas */
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  flex-direction: column;
}

.profile-left {
  width: 100%;
  display: flex;
  justify-content: center;
}

.profile-right {
  width: 100%;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .profile-container {
    flex-direction: row;
    gap: 3rem;
    align-items: flex-start;
  }

  .profile-left {
    flex: 0 0 300px;
    justify-content: flex-start;
    width: auto;
    align-self: stretch; /* Estirar para igualar altura */
  }

  .profile-right {
    width: auto;
    flex: 1;
  }
}

@media (min-width: 992px) {
  .profile-container {
    gap: 4rem;
  }

  .profile-left {
    flex: 0 0 300px;
  }
}

@media (max-width: 400px) {
  .profile-container {
    padding: 0.5rem;
    gap: 1.5rem;
  }
}
</style>