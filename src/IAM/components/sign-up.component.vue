<script>
import {
  Button as PvButton,
  Card as PvCard,
  Dropdown as PvDropdown,
  InputText as PvInputText,
  Message as PvMessage,
  Password as PvPassword,
  RadioButton as PvRadioButton
} from "primevue";
import {
  isNotEmpty,
  validateContact,
  validatePassword,
  validateDateFields,
  validateGenderFields
} from "../../shared/utils/validation.util.js";
import { UserService } from "../services/user.service.js";
import { User } from "../model/user.entity.js";

export default {
  name: "sign-up",
  components: {PvButton, PvPassword, PvRadioButton, PvDropdown, PvMessage, PvInputText, PvCard},
  data() {
    return {
      name: '',
      password: '',
      lastname: '',
      contactInfo: '',
      contactErrorMsg: '',
      passwordStrength: 0,
      passwordErrors: [],
      gender: null,
      pronoun: null,
      selectedDay: null,
      showNameError: false,
      showPasswordError: false,
      showLastnameError: false,
      showDayError: false,
      showMonthError: false,
      showYearError: false,
      showGenderError: false,
      showPronounError: false,
      showCustomGenderError: false,
      showContactError: false,
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
        { label: 'Female: "greet her for her birthday"\n', value: 'Female: greet her for her birthday' },
        { label: 'Masculine: "greet him for his birthday"\n', value: 'Masculine: greet him for his birthday' },
        { label: 'Neutral: "Greet him/her for his/her birthday"\n', value: 'Neutral: Greet him/her for his/her birthday' }
      ],
      isLoading: false,
      registerError: null
    }
  },
  methods: {
    validateContact() {
      const result = validateContact(this.contactInfo);
      this.showContactError = !result.isValid;
      this.contactErrorMsg = result.errorMsg;
      return result.isValid;
    },
    validatePassword() {
      const result = validatePassword(this.password);
      this.passwordErrors = result.errors;
      this.showPasswordError = !result.isValid;
      this.passwordStrength = result.strength;
      return result.isValid;
    },
    calculateStrength() {
      const result = validatePassword(this.password);
      this.passwordStrength = result.strength;
    },
    validate() {
      this.showNameError = !isNotEmpty(this.name);
      this.showLastnameError = !isNotEmpty(this.lastname);

      const dateValidation = validateDateFields({
        day: this.selectedDay,
        month: this.selectedMonth,
        year: this.selectedYear
      });
      this.showDayError = dateValidation.errors.day;
      this.showMonthError = dateValidation.errors.month;
      this.showYearError = dateValidation.errors.year;

      const genderValidation = validateGenderFields(
          this.gender,
          this.pronoun,
          this.customGender
      );
      this.showGenderError = genderValidation.errors.gender;
      this.showPronounError = genderValidation.errors.pronoun;
      this.showCustomGenderError = genderValidation.errors.customGender;

      const isContactValid = this.validateContact();
      const isPasswordValid = this.validatePassword();

      return !this.showNameError && !this.showLastnameError &&
          dateValidation.isValid &&
          genderValidation.isValid &&
          isContactValid && isPasswordValid;
    },
    navigateToLogin() {
      this.$router.push("/login");
    },
    async register() {
      if (!this.validate()) {
        return;
      }

      this.isLoading = true;
      this.registerError = null;

      try {
        const userService = new UserService();

        // Extraer los valores numéricos de manera segura
        const day = this.selectedDay?.value ?? this.selectedDay;
        const month = this.selectedMonth?.value ?? this.selectedMonth;
        const year = this.selectedYear?.value ?? this.selectedYear;

        // Validar que los valores sean números
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
          throw new Error('Invalid date values');
        }

        // Crear objeto de usuario
        const userData = {
          name: this.name,
          lastname: this.lastname,
          contact_info: this.contactInfo,
          password: this.password,
          birth_date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          gender: this.gender === 'Personalizado' ? this.customGender : this.gender,
          pronoun: this.pronoun
        };

        const response = await userService.create(userData);
        this.navigateToSubscription();

      } catch (error) {
        console.error('Registration error:', error);
        this.registerError = error.response?.data?.message || 'Registration failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
    navigateToSubscription() {
      this.$router.push("/subscriptions");
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
        <form @submit.prevent="register" class="sign-up-form">

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
              <div class="date-field-container">
                <pv-dropdown
                    v-model="selectedDay"
                    :options="dayOptions"
                    placeholder="Day"
                    optionLabel="label"
                    option-value="value"
                    :class="{'p-invalid': showDayError}"
                    @blur="validate"
                    class="date-field"
                ></pv-dropdown>
                <pv-message
                    v-if="showDayError"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="error-message">
                  Day is required
                </pv-message>
              </div>

              <div class="date-field-container">
                <pv-dropdown
                    v-model="selectedMonth"
                    :options="monthOptions"
                    placeholder="Month"
                    optionLabel="label"
                    option-value="value"
                    :class="{'p-invalid': showMonthError}"
                    @blur="validate"
                    class="date-field"
                ></pv-dropdown>
                <pv-message
                    v-if="showMonthError"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="error-message">
                  Month is required
                </pv-message>
              </div>

              <div class="date-field-container">
                <pv-dropdown
                    v-model="selectedYear"
                    :options="yearOptions"
                    placeholder="Year"
                    option-value="value"
                    optionLabel="label"
                    :class="{'p-invalid': showYearError}"
                    @blur="validate"
                    class="date-field"
                ></pv-dropdown>
                <pv-message
                    v-if="showYearError"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="error-message">
                  Year is required
                </pv-message>
              </div>
            </div>
          </div>

          <!-- Gender Selection -->
          <div class="form-group">
            <label class="form-label">Gender</label>
            <div class="gender-grid" :class="{'p-invalid-group': showGenderError}">
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
            <pv-message
                v-if="showGenderError"
                severity="error"
                size="small"
                variant="simple"
                class="error-message">
              Gender is required
            </pv-message>
          </div>

          <!-- Custom Gender (conditional) -->
          <div v-if="gender === 'Personalizado'" class="custom-gender-container">
            <div class="form-group">
              <pv-dropdown
                  v-model="pronoun"
                  :options="pronounOptions"
                  optionLabel="label"
                  placeholder="Selecciona tu pronombre"
                  :class="{'p-invalid': showPronounError}"
                  @blur="validate"
                  class="pronoun-dropdown"
              />
              <pv-message
                  v-if="showPronounError"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="error-message">
                Pronoun is required
              </pv-message>
            </div>

            <p class="custom-gender-text">Your username will be visible to everyone.</p>

            <div class="form-group">
              <pv-input-text
                  v-model="customGender"
                  placeholder="Gender (optional)"
                  :class="{'p-invalid': showCustomGenderError}"
                  @blur="validate"
                  class="custom-gender-input"
              ></pv-input-text>
              <pv-message
                  v-if="showCustomGenderError"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="error-message">
                Gender is required
              </pv-message>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="form-group">
            <pv-input-text
                v-model="contactInfo"
                placeholder="Phone or email address"
                :class="{'p-invalid': showContactError}"
                @blur="validateContact"
                class="contact-input"
            ></pv-input-text>
            <pv-message
                v-if="showContactError"
                severity="error"
                size="small"
                variant="simple"
                class="error-message">
              {{ contactErrorMsg }}
            </pv-message>
          </div>

          <!-- Password -->
          <div class="form-group">
            <pv-input-text
                type="password"
                v-model="password"
                placeholder="Password"
                :class="{'p-invalid': showPasswordError}"
                @blur="validatePassword"
                @input="calculateStrength"
                class="password-input"
                toggleMask
            ></pv-input-text>

            <!-- Indicador de fortaleza y mensajes de error (igual que antes) -->
            <div v-if="password.length > 0" class="password-strength">
              <div class="strength-bar" :class="{'weak': passwordStrength <= 2, 'medium': passwordStrength === 3, 'strong': passwordStrength >= 4}"></div>
              <span class="strength-text">
      {{
                  passwordStrength <= 2 ? 'Weak' :
                      passwordStrength === 3 ? 'Medium' : 'Strong'
                }}
    </span>
            </div>

            <div v-if="showPasswordError" class="password-errors">
              <pv-message
                  v-for="(error, index) in passwordErrors"
                  :key="index"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="error-message">
                {{ error }}
              </pv-message>
            </div>
          </div>

          <!-- Submit Button -->
          <pv-button
              label="Register"
              severity="success"
              class="submit-button"
              type="submit"
              :loading="isLoading"
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

<style>
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

@media (min-width: 768px) {
  .date-fields {
    grid-template-columns: repeat(3, 1fr);
  }
}

.date-field-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.date-field {
  width: 100%;
}

.error-messages-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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

/* Password Strength */
.password-strength {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.strength-bar {
  height: 4px;
  flex-grow: 1;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.strength-bar.weak {
  background: linear-gradient(90deg, #ff5252 33%, #e0e0e0 33%);
}

.strength-bar.medium {
  background: linear-gradient(90deg, #ffb74d 66%, #e0e0e0 66%);
}

.strength-bar.strong {
  background: #4caf50;
}

.strength-text {
  font-size: 0.75rem;
  color: #666;
}

.password-errors {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
}
</style>