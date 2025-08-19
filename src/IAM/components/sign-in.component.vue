<script>
import {
  Button as PvButton,
  Card as PvCard,
  FloatLabel as PvFloatLabel,
  InputText as PvInputText,
  Dialog as PvDialog,
  Message as PvMessage
} from "primevue";
import {
  validateContact,
  validateLogin
} from "../../shared/utils/validation.util.js";
export default {
  name: "sign-in",
  components: {PvButton, PvFloatLabel, PvCard, PvInputText, PvDialog, PvMessage},
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      contactInfo: '',
      password: '',
      forgotPasswordDialogVisible: false,
      recoveryEmail: '',
      showContactError: false,
      contactErrorMsg: '',
      showPasswordError: false,
      passwordErrorMsg: '',
      loginError: false,
      loginErrorMsg: ''
    }
  },
  methods: {
    validateContact() {
      const result = validateContact(this.contactInfo);
      this.showContactError = !result.isValid;
      this.contactErrorMsg = result.errorMsg;
      return result.isValid;
    },

    handleSubmit() {
      // Reset error states
      this.loginError = false;
      this.showContactError = false;
      this.showPasswordError = false;

      // Validar credenciales
      const validation = validateLogin(
          this.contactInfo,
          this.password,
          this.users
      );

      if (!validation.isValid) {
        // Mostrar el error apropiado
        if (validation.errorMsg === 'sign-in.error.userNotFound' ||
            validation.errorMsg === 'sign-in.error.passwordIncorrect') {
          this.loginError = true;
          this.loginErrorMsg = validation.errorMsg;
        } else if (validation.errorMsg.includes('email') ||
            validation.errorMsg.includes('phone') ||
            validation.errorMsg === 'sign-in.error.contactRequired' ||
            validation.errorMsg === 'sign-in.error.invalidContact') {
          this.showContactError = true;
          this.contactErrorMsg = validation.errorMsg;
        } else {
          this.showPasswordError = true;
          this.passwordErrorMsg = validation.errorMsg;
        }
        return;
      }

      // Login exitoso
      this.$emit('login-success', validation.user);
    },
    validatePassword() {
      const password = this.password.trim();
      if (password === '') {
        this.showPasswordError = true;
        this.passwordErrorMsg = 'sign-in.error.passwordRequired';
        return false;
      }

      this.showPasswordError = false;
      return true;
    },
    navigateToRegister() {
      this.$router.push("/register");
    },
    showForgotPasswordDialog() {
      this.forgotPasswordDialogVisible = true;
    },
  }
}
</script>

<template>
  <div class="sign-in-container">
    <pv-card class="sign-in-card">
      <template #title>
        <div class="text-center">{{ $t('sign-in.title') }}</div>
      </template>

      <template #content>
        <p class="description">{{ $t('sign-in.description')}}</p>

        <div v-if="loginError" class="error-message mb-3">
          <pv-message severity="error" size="small" variant="simple">
            {{ $t(loginErrorMsg) }}
          </pv-message>
        </div>

        <div class="input-group">
          <pv-float-label variant="in" class="full-width-input">
            <pv-input-text
                id="in_label"
                v-model="contactInfo"
                autocomplete="off"
                class="full-width"
                :class="{'p-invalid': showContactError}"
                @blur="validateContact"
            />
            <label for="in_label">{{$t('sign-in.contactInfo')}}</label>
          </pv-float-label>
          <pv-message
              v-if="showContactError"
              severity="error"
              size="small"
              variant="simple"
              class="error-message">
            {{ $t(contactErrorMsg) }}
          </pv-message>
        </div>

        <div class="input-group">
          <pv-float-label variant="in" class="full-width-input">
            <pv-input-text
                type="password"
                v-model="password"
                class="full-width"
                :class="{'p-invalid': showPasswordError}"
                @blur="validatePassword"
            />
            <label for="password">{{$t('sign-in.password')}}</label>
          </pv-float-label>
          <pv-message
              v-if="showPasswordError"
              severity="error"
              size="small"
              variant="simple"
              class="error-message">
            {{ $t(passwordErrorMsg) }}
          </pv-message>
        </div>

        <pv-button
            :label="$t('sign-in.button')"
            severity="success"
            class="submit-button"
            @click.prevent="handleSubmit"
        />

        <div class="links-container">
          <a href="#" @click.prevent="showForgotPasswordDialog" class="forgot-password">{{$t('sign-in.forgotPassword')}}</a>
          <span>{{$t('sign-in.noAccount')}}</span>
          <a href="#" @click.prevent="navigateToRegister" class="register-link">{{$t('sign-in.signUp')}}</a>
        </div>
      </template>
    </pv-card>

    <!-- Diálogo para recuperación de contraseña -->
    <pv-dialog
        v-model:visible="forgotPasswordDialogVisible"
        modal
        header="Recover Password"
        :style="{ width: '450px' }"
    >
      <div class="input-group">
        <pv-float-label variant="in" class="full-width-input">
          <pv-input-text
              id="recovery_email"
              v-model="recoveryEmail"
              autocomplete="off"
              class="full-width"
          />
          <label for="recovery_email">Enter your email</label>
        </pv-float-label>
      </div>

      <template #footer>
        <pv-button
            label="Cancel"
            icon="pi pi-times"
            @click="forgotPasswordDialogVisible = false"
            text
        />
        <pv-button
            label="Send"
            icon="pi pi-check"
            severity="success"
            autofocus
        />
      </template>
    </pv-dialog>
  </div>
</template>

<style>
/* Add this to your existing styles */
.error-message {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #f44336;
}

.mb-3 {
  margin-bottom: 1rem;
}

/* Rest of your existing styles remain the same */
.sign-in-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

.sign-in-card {
  width: 100%;
  max-width: 450px;
  padding: 2rem;
}

.text-center {
  text-align: center;
  width: 100%;
}
.description {
  text-align: center;
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1.2rem;
}

.submit-button {
  width: 100%;
  margin-bottom: 1rem;
}

.full-width-input {
  width: 100%;
}

.full-width {
  width: 100%;
}

.links-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

a {
  text-decoration: none;
  color: #2563eb;
}

a:hover {
  text-decoration: underline;
}

.forgot-password {
  margin-bottom: 0.5rem;
}

.register-link {
  font-weight: 600;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .sign-in-card {
    padding: 1.5rem;
  }

  .description {
    font-size: 0.9rem;
  }
}
</style>