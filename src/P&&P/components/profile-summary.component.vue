<script>
import { ProfileService } from "../services/profile.service.js";

export default {
  name: "ProfileSummary",
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
        console.log('Fetching profile for user ID:', this.userId); // <-- Agregar esto
        const response = await profileService.getByUserId(this.userId);
        console.log('Profile response:', response); // <-- Agregar esto


        if (response.data && response.data.length > 0) {
          this.profile = response.data[0];
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
  <div class="profile-summary-container">
    <pv-card v-if="!isLoading && profile" class="profile-card">
      <template #content>
        <div class="buttons">
          <pv-button class="EditButton" icon="pi pi-pencil" label="Edit Profile"></pv-button>
          <pv-button class="ViewartButton" icon="pi pi-image" label="View archive"></pv-button>
        </div>

        <div class="stats-container">
          <div class="stat-item">
            <div class="stat-value">{{ profile.postsCount || 0 }}</div>
            <div class="stat-label">Posts</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ profile.followingCount || 0 }}</div>
            <div class="stat-label">Following</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ profile.followersCount || 0 }}</div>
            <div class="stat-label">Followers</div>
          </div>
        </div>

        <div class="bio-section" v-if="profile.bio">
          <h3>About</h3>
          <p class="bio-content">{{ profile.bio }}</p>
        </div>
        <div class="bio-section" v-else>
          <h3>About</h3>
          <p class="no-bio">No biography yet</p>
        </div>
      </template>
    </pv-card>

    <div v-else-if="isLoading" class="loading">
      <i class="pi pi-spinner pi-spin"></i> Loading profile...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.profile-summary-container {
  margin-top: 1.5rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap; /* Permite que los botones se apilen en móviles */
}

.profile-card {
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.stats-container {
  display: flex;
  justify-content: space-around;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
}

.bio-section {
  margin-top: 1rem;
}

.bio-section h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.bio-content {
  color: #444;
  line-height: 1.5;
}

.no-bio {
  color: #999;
  font-style: italic;
}

.loading, .error {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  color: #666;
}

/* Responsive styles */
@media (max-width: 768px) {
  .buttons {
    justify-content: center;
  }

  .buttons .p-button {
    flex: 1 1 100%; /* Ocupa todo el ancho en móviles */
    min-width: 120px;
  }

  .stats-container {
    display: none; /* Ocultar estadísticas en móviles */
  }

  .bio-section {
    display: none; /* Ocultar biografía en móviles */
  }
}

@media (max-width: 480px) {
  .profile-card {
    padding: 1rem;
  }

  .buttons {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
}
</style>