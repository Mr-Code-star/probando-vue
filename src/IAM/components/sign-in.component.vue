<script>
import {
  Button as PvButton,
  Card as PvCard,
  FloatLabel as PvFloatLabel,
  InputText as PvInputText,
  Dialog as PvDialog
} from "primevue";

export default {
  name: "sign-in",
  components: {PvButton, PvFloatLabel, PvCard, PvInputText, PvDialog},
  data() {
    return {
      email: '',
      password: '',
      forgotPasswordDialogVisible: false,
      recoveryEmail: ''
    }
  },
  methods:{
    navigateToRegister(){
      this.$router.push("/register");
    },
    navigateToHome(){
      this.$router.push("/home");
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
        <div class="text-center">Sign In</div>
      </template>

      <template #content>
        <p class="description">Register to see photos and videos of your friends</p>

        <div class="input-group">
          <pv-float-label variant="in" class="full-width-input">
            <pv-input-text id="in_label" v-model="email" autocomplete="off" class="full-width" />
            <label for="in_label">Email</label>
          </pv-float-label>
        </div>

        <div class="input-group">
          <pv-float-label variant="in" class="full-width-input">
            <pv-input-text
                type="password"
                v-model="password"
                class = "full-width"
            />
            <label for="password">Password</label>
          </pv-float-label>
        </div>

        <pv-button label="Submit" severity="success" class="submit-button" @click.prevent = "navigateToHome()"/>

        <div class="links-container">
          <a href="#" @click.prevent="showForgotPasswordDialog" class="forgot-password">Forgot password?</a>
          <span>¿No tienes cuenta?</span>
          <a href="#" @click.prevent="navigateToRegister" class="register-link">Regístrate</a>
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

<style scoped>
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
  color: white;
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