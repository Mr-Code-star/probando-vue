<script>
import {
  Button as PvButton,
  Card as PvCard,
  Dropdown as PvDropdown,
  InputText as PvInputText,
  Message as PvMessage, Password as PvPassword,
  RadioButton as PvRadioButton
} from "primevue";

export default {
  name: "sign-up",
  components: {PvButton, PvPassword, PvRadioButton, PvDropdown, PvMessage, PvInputText, PvCard},
  data() {
    return {
      name: '',
      lastname: '',
      contactInfo: '',
      password: '',
      gender: null,
      pronoun: null,
      selectedDay: null,
      showNameError: false,
      showLastnameError: false,
      selectedMonth: null,
      selectedYear: null,
      dayOptions: Array.from({ length: 31 }, (_, i) => ({
        label: (i + 1).toString(),
        value: i + 1
      })),
      monthOptions: [
        { label: 'Enero', value: 1 },
        { label: 'Febrero', value: 2 },
        { label: 'Marzo', value: 3 },
        { label: 'Abril', value: 4 },
        { label: 'Mayo', value: 5 },
        { label: 'Junio', value: 6 },
        { label: 'Julio', value: 7 },
        { label: 'Agosto', value: 8 },
        { label: 'Septiembre', value: 9 },
        { label: 'Octubre', value: 10 },
        { label: 'Noviembre', value: 11 },
        { label: 'Diciembre', value: 12 }
      ],
      yearOptions: Array.from({ length: 2025 - 1905 + 1 }, (_, i) => {
        const year = 2025 - i;
        return { label: year.toString(), value: year };
      }),
      customGender: '',
      pronounOptions: [
        { label: 'Female: "greet her for her birthday"\n', value:  'Female: greet her for her birthday' },
        { label: 'Masculine: "greet him for his birthday"\n', value: 'Masculine: greet him for his birthday' },
        { label: 'Neutral: "Greet him/her for his/her birthday"\n', value: 'Neutral: Greet him/her for his/her birthday' }
      ]
    }
  },
  methods: {
    validate() {
      this.showNameError = this.name.trim() === '';
      this.showLastnameError = this.lastname.trim() === '';
    },
    navigateToLogin() {
      this.$router.push("/login");
    }
  }
}
</script>

<template>
  <div class="sign-up-container">
    <pv-card class="sign-up-card">
      <template #title>
        <div class="text-center">Sign up</div>
      </template>
      <template #content>
        <p class="description">Register if you are new user</p>
        <form @submit.prevent="validate" class="sign-up-form">

          <!-- Name Input -->
          <div class="form-group">
            <pv-input-text
                v-model="name"
                name="name"
                type="text"
                placeholder="Name"
                :class="{'p-invalid': showNameError}"
                @blur="validate"
            ></pv-input-text>
            <pv-message
                v-if="showNameError"
                severity="error"
                size="small"
                variant="simple"
                class="error-message">
              Name is required
            </pv-message>
          </div>

          <!-- Lastname Input -->
          <div class="form-group">
            <pv-input-text
                v-model="lastname"
                name="lastname"
                type="text"
                placeholder="Last name"
                :class="{'p-invalid': showLastnameError}"
                @blur="validate"
            ></pv-input-text>
            <pv-message
                v-if="showLastnameError"
                severity="error"
                size="small"
                variant="simple"
                class="error-message">
              Last name is required
            </pv-message>
          </div>

          <!-- Date of Birth -->
          <div class="form-group">
            <label class="form-label">Date of birth</label>
            <div class="date-fields">
              <pv-dropdown
                  v-model="selectedDay"
                  :options="dayOptions"
                  placeholder="Day"
                  optionLabel="label"
                  class="date-field"
              ></pv-dropdown>
              <pv-dropdown
                  v-model="selectedMonth"
                  :options="monthOptions"
                  placeholder="Month"
                  optionLabel="label"
                  class="date-field"
              ></pv-dropdown>
              <pv-dropdown
                  v-model="selectedYear"
                  :options="yearOptions"
                  placeholder="Year"
                  optionLabel="label"
                  class="date-field"
              ></pv-dropdown>
            </div>
          </div>

          <!-- Gender Selection -->
          <div class="form-group">
            <label class="form-label">Gender</label>
            <div class="gender-grid">
              <div class="gender-option">
                <pv-radio-button v-model="gender" input-id="mujer" value="Mujer"></pv-radio-button>
                <label for="mujer">Mujer</label>
              </div>
              <div class="gender-option">
                <pv-radio-button v-model="gender" input-id="hombre" value="Hombre"></pv-radio-button>
                <label for="hombre">Hombre</label>
              </div>
              <div class="gender-option">
                <pv-radio-button v-model="gender" inputId="personalizado" value="Personalizado"></pv-radio-button>
                <label for="personalizado">Personalizado</label>
              </div>
            </div>
          </div>

          <!-- Custom Gender (conditional) -->
          <div v-if="gender === 'Personalizado'" class="custom-gender-container">
            <pv-dropdown
                v-model="pronoun"
                :options="pronounOptions"
                optionLabel="label"
                placeholder="Selecciona tu pronombre"
                class="pronoun-dropdown"
            />
            <p class="custom-gender-text">Your username will be visible to everyone.</p>
            <pv-input-text
                v-model="customGender"
                placeholder="Gender (optional)"
                class="custom-gender-input"
            ></pv-input-text>
          </div>

          <!-- Contact Info -->
          <div class="form-group">
            <pv-input-text
                v-model="contactInfo"
                placeholder="Phone or email address"
                class="contact-input"
            ></pv-input-text>
          </div>

          <!-- Password -->
          <div class="form-group">
            <pv-input-text
                type="password"
                v-model="password"
                :feedback="false"
                placeholder="Password"
                class="password-input"
                toggleMask
            ></pv-input-text>
          </div>

          <!-- Submit Button -->
          <pv-button
              label="Register"
              severity="success"
              class="submit-button"
              type="submit"
          />
        </form>
      </template>
      <template #footer>
        <div class ="links-container">
            <a href="#" @click.prevent="navigateToLogin()" class="text-link">¿Do you have account?</a>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
/* Base Styles (Mobile First) */
.links-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
.text-link{
  font-weight: 600;
  zoom: 95%;
}
.sign-up-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

.sign-up-card {
  width: 100%;
  max-width: 100%;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem;
}

.sign-up-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 500;
  color: white;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

/* Date Fields */
.date-fields {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.date-field {
  width: 100%;
}

/* Gender Options */
.gender-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.gender-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.gender-option:hover {
  background-color: dimgray;
}

/* Custom Gender Section */
.custom-gender-container {
  margin-top: 0.5rem;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pronoun-dropdown,
.custom-gender-input,
.contact-input,
.password-input {
  width: 100%;
}

.custom-gender-text {
  color: white;
  font-size: 0.85rem;
  margin: 0.25rem 0;
}

/* Error Messages */
.error-message {
  margin-top: 0.25rem;
  font-size: 0.85rem;
}

/* Submit Button */
.submit-button {
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  font-weight: 600;
}

/* Text Elements */
.text-center {
  text-align: center;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.description {
  text-align: center;
  margin-bottom: 1.25rem;
  color: white;
  font-size: 0.95rem;
}

/* Tablet Styles (min-width: 768px) */
@media (min-width: 768px) {
  .sign-up-card {
    max-width: 500px;
    padding: 2rem;
  }

  .date-fields {
    grid-template-columns: repeat(3, 1fr);
  }

  .gender-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Desktop Styles (min-width: 1024px) */
@media (min-width: 1024px) {
  .sign-up-card {
    max-width: 550px;
  }

  .text-center {
    font-size: 1.75rem;
  }
}
</style>