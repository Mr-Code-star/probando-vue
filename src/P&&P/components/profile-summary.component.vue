<script>
import { ProfileService } from "../services/profile.service.js";
import { UserService } from "../../IAM/services/user.service.js"; // Importar UserService

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
      user: null, // Nuevo dato para almacenar información del usuario
      isLoading: false,
      error: null
    };
  },
  created() {
    this.fetchProfile();
    this.fetchUser(); // Llamar a la nueva función para obtener datos del usuario
  },
  methods: {
    async fetchProfile() {
      this.isLoading = true;
      this.error = null;

      try {
        const profileService = new ProfileService();
        console.log('Fetching profile for user ID:', this.userId);
        const response = await profileService.getByUserId(this.userId);
        console.log('Profile response:', response);

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
    },

    // Nueva función para obtener datos del usuario
    async fetchUser() {
      try {
        const userService = new UserService();
        const response = await userService.getById(this.userId);

        if (response.data) {
          this.user = response.data;
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        // No mostramos error aquí para no interrumpir la visualización del perfil
      }
    }
  },
  computed: {
    // Computed property para obtener el nombre completo
    fullName() {
      if (this.user) {
        return `${this.user.name || ''} ${this.user.lastname || ''}`.trim();
      }
      return 'No name available';
    }
  }
};
</script>

<template>
  <div class="profile-summary-container">
    <div v-if="!isLoading && profile" class="profile-summary">
      <!-- Header section with username and buttons -->
      <div class="profile-header">
        <h2 class="full-name">{{ fullName }}</h2>
        <div class="action-buttons">
          <pv-button class="edit-button" icon="pi pi-pencil" label="Editar perfil"></pv-button>
          <pv-button class="view-archive-button" icon="pi pi-image" label="Ver archivo"></pv-button>
        </div>
      </div>

      <!-- Stats section - shown on desktop, hidden on mobile -->
      <div class="stats-container desktop-stats">
        <div class="stat-item">
          <span class="stat-value">{{ profile.postsCount || 0 }}</span>
          <span class="stat-label">publicaciones</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ profile.followersCount || 0 }}</span>
          <span class="stat-label">seguidores</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ profile.followingCount || 0 }}</span>
          <span class="stat-label">seguidos</span>
        </div>
      </div>

      <!-- Bio section -->
      <div class="bio-section">
        <p class="bio-content" v-if="profile.bio">{{ profile.bio }}</p>
        <p class="no-bio" v-else>No biography yet</p>
      </div>
    </div>

    <!-- Mobile stats - shown only on mobile -->
    <div v-if="!isLoading && profile" class="mobile-stats">
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-value">{{ profile.postsCount || 0 }}</span>
          <span class="stat-label">publicaciones</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ profile.followersCount || 0 }}</span>
          <span class="stat-label">seguidores</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ profile.followingCount || 0 }}</span>
          <span class="stat-label">seguidos</span>
        </div>
      </div>
    </div>

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
  width: 100%;
  min-height: 350px; /* Misma altura mínima que el avatar para simetría */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-summary {
  padding: 1rem 0;
  width: 100%;
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.full-name {
  font-size: 1.75rem;
  font-weight: 300;
  margin: 0;
  line-height: 1.2;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.edit-button, .view-archive-button {
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
}

.stats-container {
  display: flex;
  justify-content: space-around;
  padding: 1.5rem 0;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  margin: 1.5rem 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 600;
}

.stat-label {
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.bio-section {
  margin: 1.5rem 0;
}

.bio-content {
  line-height: 1.5;
  margin: 0;
}

.no-bio {
  font-style: italic;
  margin: 0;
}

.loading, .error {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 350px;
}

/* Desktop styles */
.desktop-stats {
  display: flex;
}

.mobile-stats {
  display: none;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .action-buttons {
    width: 100%;
    justify-content: space-between;
  }

  .edit-button, .view-archive-button {
    flex: 1;
    text-align: center;
  }

  .desktop-stats {
    display: none;
  }

  .mobile-stats {
    display: block;
    margin-top: 1rem;
  }

  .bio-section {
    padding: 0 1rem;
  }

  .profile-summary-container {
    min-height: 220px;
  }
}

@media (max-width: 480px) {
  .full-name {
    font-size: 1.5rem;
  }

  .stats-container {
    padding: 1rem 0;
  }

  .stat-value {
    font-size: 1rem;
  }

  .stat-label {
    font-size: 0.8rem;
  }

  .profile-summary-container {
    min-height: 180px;
  }
}

@media (max-width: 400px) {
  .profile-summary-container {
    min-height: 150px;
  }
}
</style>