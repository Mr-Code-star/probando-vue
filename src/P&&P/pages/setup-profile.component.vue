<script>
import {UserService} from "../../IAM/services/user.service.js";
import {ProfileService} from "../services/profile.service.js";
import {ProfileAsemmbler} from "../services/profile.asemmbler.js";

export default {
  name: 'SetupProfile',
  components: {
  },
  data() {
    return {
      userData: {
        name: '',
        lastname: '',
        birthDate: '',
        gender: '',
        pronoun: null,
        contactInfo: ''
      },
      profileData: {
        userName: '',
        bio: '',
        avatarFile: null,
        avatarPreview: '',
        followersCount: 0,
        followingCount: 0,
        postsCount: 0,
        createdAt: new Date().toISOString(),
      },
      isLoading: false,
      errorMessage: ''
    };
  },
  created() {
    this.userService = new UserService();
    this.profileService = new ProfileService();
    this.loadUserData(); // Cargar datos directamente
  },
  methods: {
    loadUserData() {
      const tempUserData = JSON.parse(localStorage.getItem('tempUserData'));
      if (tempUserData) {
        this.userData = {
          name: tempUserData.name,
          lastname: tempUserData.lastname,
          birthDate: tempUserData.birth_date,
          gender: tempUserData.gender,
          pronoun: tempUserData.pronoun,
          contactInfo: tempUserData.contact_info
        };

        // Generar username solo si no existe uno previamente
        if (!this.profileData.userName) {
          this.profileData.userName = this.generateUsername(tempUserData.name, tempUserData.lastname);
        }
      }
    },
    generateUsername(name, lastname) {
      const randomNum = Math.floor(Math.random() * 1000);
      return `${name.toLowerCase().charAt(0)}${lastname.toLowerCase().replace(/\s+/g, '')}${randomNum}`;
    },
    onAvatarSelect(event) {
      const file = event.files[0];
      if (file) {
        this.profileData.avatarFile = file;

        const reader = new FileReader();
        reader.onload = (e) => {
          // Guarda la imagen como Base64 en lugar de blob URL
          this.profileData.avatarPreview = e.target.result;
          this.profileData.avatarBase64 = e.target.result.split(',')[1]; // Solo el string Base64
        };
        reader.readAsDataURL(file);
      }
    },
    validateForm() {
      if (!this.profileData.userName) {
        this.errorMessage = 'Username is required';
        return false;
      }

      if (this.profileData.userName.length < 4) {
        this.errorMessage = 'Username must be at least 4 characters';
        return false;
      }

      this.errorMessage = '';
      return true;
    },
    async submitProfile() {
      if (!this.validateForm()) return;

      this.isLoading = true;

      try {
        const tempUserData = JSON.parse(localStorage.getItem('tempUserData'));
        const selectedPlanId = localStorage.getItem('selectedPlanId');

        if (!tempUserData || !selectedPlanId) {
          throw new Error('User data or plan ID not found');
        }

        // 1. Crear usuario primero
        const userResponse = await this.userService.create({
          ...tempUserData,
          subscription_plan: selectedPlanId
        });

        const userId = userResponse.data.id;

        // 2. Preparar datos del perfil
        const profilePayload = ProfileAsemmbler.toEntityFromResource({
          id_user: userId,
          user_name: this.profileData.userName,
          bio: this.profileData.bio,
          birthDate: this.userData.birthDate,
          gender: this.userData.gender,
          pronoun: this.userData.pronoun,
          followersCount: this.profileData.followersCount,
          followingCount: this.profileData.followingCount,
          postsCount: this.profileData.postsCount,
          createdAt: this.profileData.createdAt,
          subscriptionPlanId: selectedPlanId,
          avatarUrl: this.profileData.avatarBase64
              ? `data:image/jpeg;base64,${this.profileData.avatarBase64}`
              : null
        });

        console.log('Profile entity to create:', profilePayload);

        // 3. Crear perfil
        await this.profileService.create(profilePayload);

        // 4. Guardar usuario en localStorage (IMPORTANTE)
        const userToStore = {
          id: userId,
          name: tempUserData.name,
          lastname: tempUserData.lastname,
          // otros datos que necesites
        };
        localStorage.setItem('user', JSON.stringify(userToStore));

        // 5. Limpiar datos temporales
        localStorage.removeItem('tempUserData');
        localStorage.removeItem('selectedPlanId');

        // 6. Redirigir al perfil SIN ID (cambio aquí)
        this.$router.push('/profile');

      } catch (error) {
        console.error('Error setting up profile:', error);
        this.errorMessage = error.response?.data?.message || 'Error setting up profile. Please try again.';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<template>
  <div class="setup-profile-container">
    <div class="setup-profile-card">
      <h1 class="title">Setup Your Profile</h1>
      <p class="subtitle">Choose your username and profile picture</p>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div class="profile-form">
        <!-- Avatar upload -->
        <div class="form-group avatar-upload">
          <label>Profile Picture</label>
          <div class="avatar-preview-container">
            <pv-avatar
                v-if="profileData.avatarPreview"
                :image="profileData.avatarPreview"
                size="xlarge"
                shape="circle"
            />
            <pv-avatar
                v-else
                icon="pi pi-user"
                size="xlarge"
                shape="circle"
                class="no-avatar"
            />
            <pv-file-upload
                mode="basic"
                name="avatar"
                accept="image/*"
                :maxFileSize="2000000"
                chooseLabel="Choose Avatar"
                @select="onAvatarSelect"
                class="upload-button"
                style="width: 100%"
            />
          </div>
        </div>

        <!-- Username -->
        <div class="form-group">
          <label for="username">Username</label>
          <pv-input-text
              id="username"
              v-model="profileData.userName"
              placeholder="Choose your username"
              :class="{ 'p-invalid': errorMessage && !profileData.userName }"
          />
          <small class="hint">This will be your unique identifier</small>
        </div>

        <!-- Bio -->
        <div class="form-group">
          <label for="bio">Bio (Optional)</label>
          <pv-input-text
              id="bio"
              v-model="profileData.bio"
              placeholder="Tell something about yourself..."
          />
          <small class="hint">This will appear on your profile</small>
        </div>

        <!-- Submit button -->
        <div class="actions">
          <pv-button
              label="Complete Setup"
              @click="submitProfile"
              :loading="isLoading"
              class="submit-button"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.setup-profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

.setup-profile-card {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #333;
  text-align: center;
}

.subtitle {
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 1.5rem;
}

.error-message {
  color: #ef4444;
  background: #fee2e2;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  text-align: center;
}

.profile-form {
  margin-top: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #444;
}

.avatar-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
}

.avatar-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin: 1rem 0;
  width: 100%; /* Añade esto */
}

.upload-button {
  width: 100%; /* Cambia de 'fit-content' a '100%' */
  max-width: 200px; /* Opcional: establece un ancho máximo si lo prefieres */
  margin-top: 0.5rem;
  display: flex;
  justify-content: center; /* Centra el contenido del botón */
}
.avatar-preview-container .p-avatar {
  width: 120px;
  height: 120px;
  font-size: 3rem;
}

.no-avatar {
  background-color: #e0e0e0;
  color: #666;
}

.upload-button {
  width: fit-content;
  margin-top: 0.5rem;
}

.hint {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #666;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.submit-button {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background-color: #4CAF50;
  border: none;
  width: 100%;
}

.submit-button:hover {
  background-color: #3d8b40;
}

@media (max-width: 480px) {
  .setup-profile-card {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>