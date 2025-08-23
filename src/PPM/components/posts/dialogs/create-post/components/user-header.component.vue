<template>
  <div class="user-header">
    <img :src="userAvatar" alt="User" class="user-avatar" v-if="!isLoading">
    <div class="avatar-placeholder" v-else>
      <i class="pi pi-user"></i>
    </div>
    <span class="username">{{ username }}</span>
    <div class="loading-spinner" v-if="isLoading">
      <i class="pi pi-spinner pi-spin"></i>
    </div>
  </div>
</template>

<script>
import { ProfileService } from "../../../../../../P&&P/services/profile.service.js";

export default {
  name: 'UserHeader',
  data() {
    return {
      username: '',
      userAvatar: '',
      isLoading: false,
      profileService: null
    }
  },
  created() {
    this.profileService = new ProfileService();
    this.loadProfileData();
  },

  methods: {
    async loadProfileData() {
      this.isLoading = true;

      try {
        // Obtener ID del usuario desde localStorage
        const userData = localStorage.getItem('user');
        if (!userData) {
          this.setDefaultValues();
          return;
        }

        const user = JSON.parse(userData);
        const userId = user.id;

        if (!userId) {
          console.log("User ID not found in localStorage");
          return;
        }

        // Obtener perfil del usuario
        const response = await this.profileService.getByUserId(userId);

        if (response.data && response.data.length > 0) {
          const profile = response.data[0];
          this.username = profile.user_name || 'Usuario';
          this.userAvatar = profile.avatarUrl || '/default-avatar.png';
        } else {
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      } finally {
        this.isLoading = false;
      }
    },
  }
};
</script>

<style scoped>
.user-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  position: relative;
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
}

.avatar-placeholder {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 12px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder i {
  font-size: 16px;
  color: #666;
}

.loading-spinner {
  margin-left: 8px;
}

.loading-spinner i {
  font-size: 14px;
  color: #666;
}
</style>