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
/* Your existing styles are fine */
.user-avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem;
}

.avatar-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
}

.avatar-wrapper .p-avatar {
  width: 600px;
  height: 300px;
  font-size: 1.2rem;
}

.username {
  font-weight: 600;
  text-align: center;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 0;
  font-size: 1.2rem;
}

.loading, .error {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding-left: 1rem;
  color: #666;
}
</style>