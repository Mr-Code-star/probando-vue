<script>
import { ProfileService } from "../services/profile.service.js";

export default {
  name: "UserAvatar",
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      profile: null,
      isLoading: false,
      error: null
    };
  },
  created() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      this.isLoading = true;
      this.error = null;

      try {
        const profileService = new ProfileService();
        const response = await profileService.getByUserId(this.userId);

        if (response.data && response.data.length > 0) {
          this.profile = response.data[0];
          // Debugging: log the profile data
          console.log("Profile data:", this.profile);
        } else {
          this.error = "Profile not found";
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        this.error = "Failed to load profile";
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<template>
  <div class="user-avatar-container" v-if="!isLoading && profile">
    <div class="avatar-wrapper">
      <pv-avatar
          :image="profile.avatarUrl || (profile.avatar?.base64 ? `data:image/jpeg;base64,${profile.avatar.base64}` : null)"
          :label="!profile.avatarUrl && !profile.avatar?.base64 ? profile.user_name?.charAt(0) : ''"
          shape="circle"
          class="avatar"
          :class="{'avatar-large': true, 'avatar-medium': false, 'avatar-small': false}"
      />
    </div>
    <div class="username">
      {{ profile.user_name || 'No username' }}
    </div>
  </div>

  <div v-else-if="isLoading" class="loading">
    <i class="pi pi-spinner pi-spin"></i> Loading profile...
  </div>

  <div v-else-if="error" class="error">
    {{ error }}
  </div>
</template>

<style scoped>
.user-avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem;
  height: fit-content;
  min-height: 350px; /* Altura mínima para mantener simetría */
  justify-content: center;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
  flex: 1;
}

.avatar {
  transition: all 0.3s ease;
  width: 300px;
  height: 300px;
  font-size: 5rem;
  object-fit: cover;
}

.username {
  font-weight: 600;
  text-align: center;
  width: 100%;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.5rem;
  margin-top: auto;
  padding: 0.5rem 0;
}

.loading, .error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #666;
  min-height: 350px;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .avatar {
    width: 250px;
    height: 250px;
    font-size: 4.5rem;
  }

  .username {
    max-width: 250px;
    font-size: 1.4rem;
  }

  .user-avatar-container {
    min-height: 320px;
  }
}

@media (max-width: 992px) {
  .avatar {
    width: 200px;
    height: 200px;
    font-size: 4rem;
  }

  .username {
    max-width: 200px;
    font-size: 1.3rem;
  }

  .user-avatar-container {
    min-height: 280px;
  }
}

@media (max-width: 768px) {
  .avatar {
    width: 150px;
    height: 150px;
    font-size: 3rem;
  }

  .username {
    max-width: 150px;
    font-size: 1.2rem;
  }

  .user-avatar-container {
    min-height: 220px;
    padding: 0.25rem;
  }
}

@media (max-width: 576px) {
  .avatar {
    width: 120px;
    height: 120px;
    font-size: 2.5rem;
  }

  .username {
    max-width: 120px;
    font-size: 1.1rem;
  }

  .user-avatar-container {
    min-height: 180px;
  }
}

@media (max-width: 400px) {
  .avatar {
    width: 100px;
    height: 100px;
    font-size: 2rem;
  }

  .username {
    max-width: 100px;
    font-size: 1rem;
  }

  .user-avatar-container {
    min-height: 150px;
  }
}
</style>