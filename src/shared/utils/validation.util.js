/**
 * @description Utility functions for form validation in the Sign-Up component
 * @author [Tu nombre]
 */

// Constants for validation rules
const PASSWORD_RULES = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true
};

const PHONE_REGEX = /^[0-9]{9,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates if a string is not empty
 * @param {string} value - The string to validate
 * @returns {boolean} - True if not empty, false otherwise
 */
export function isNotEmpty(value) {
    return typeof value === 'string' && value.trim() !== '';
}

/**
 * Validates contact information (email or phone)
 * @param {string} contact - The contact info to validate
 * @returns {{isValid: boolean, errorMsg: string}} - Validation result
 */
export function validateContact(contact) {
    const trimmedContact = contact.trim();

    if (!isNotEmpty(trimmedContact)) {
        return {
            isValid: false,
            errorMsg: 'sign-in.error.contactRequired' // Updated to use i18n key
        };
    }

    const isEmail = EMAIL_REGEX.test(trimmedContact);
    const isPhone = PHONE_REGEX.test(trimmedContact);

    if (!isEmail && !isPhone) {
        return {
            isValid: false,
            errorMsg: 'sign-in.error.invalidContact' // Updated to use i18n key
        };
    }

    return {
        isValid: true,
        errorMsg: ''
    };
}
/**
 * Validates password against complexity rules
 * @param {string} password - The password to validate
 * @returns {{isValid: boolean, errors: string[], strength: number}} - Validation result
 */
export function validatePassword(password) {
    const errors = [];
    let strength = 0;

    if (!isNotEmpty(password)) {
        errors.push('Password is required');
        return {
            isValid: false,
            errors,
            strength: 0
        };
    }

    // Check password length
    if (password.length < PASSWORD_RULES.minLength) {
        errors.push(`At least ${PASSWORD_RULES.minLength} characters`);
    } else {
        strength++;
    }

    // Check uppercase
    if (PASSWORD_RULES.requireUppercase && !/[A-Z]/.test(password)) {
        errors.push('At least one uppercase letter');
    } else if (PASSWORD_RULES.requireUppercase) {
        strength++;
    }

    // Check lowercase
    if (PASSWORD_RULES.requireLowercase && !/[a-z]/.test(password)) {
        errors.push('At least one lowercase letter');
    } else if (PASSWORD_RULES.requireLowercase) {
        strength++;
    }

    // Check number
    if (PASSWORD_RULES.requireNumber && !/[0-9]/.test(password)) {
        errors.push('At least one number');
    } else if (PASSWORD_RULES.requireNumber) {
        strength++;
    }

    // Check special character
    if (PASSWORD_RULES.requireSpecialChar && !/[^A-Za-z0-9]/.test(password)) {
        errors.push('At least one special character');
    } else if (PASSWORD_RULES.requireSpecialChar) {
        strength++;
    }

    return {
        isValid: errors.length === 0,
        errors,
        strength
    };
}

/**
 * Validates date fields (day, month, year)
 * @param {object} date - Date fields to validate
 * @param {number|null} date.day - Selected day
 * @param {number|null} date.month - Selected month
 * @param {number|null} date.year - Selected year
 * @returns {{isValid: boolean, errors: {day: boolean, month: boolean, year: boolean}}} - Validation result
 */
export function validateDateFields({ day, month, year }) {
    return {
        isValid: day !== null && month !== null && year !== null,
        errors: {
            day: day === null,
            month: month === null,
            year: year === null
        }
    };
}

/**
 * Validates gender fields based on selection
 * @param {string|null} gender - Selected gender
 * @param {string|null} pronoun - Selected pronoun (for custom gender)
 * @param {string} customGender - Custom gender text (for custom gender)
 * @returns {{isValid: boolean, errors: {gender: boolean, pronoun: boolean, customGender: boolean}}} - Validation result
 */
export function validateGenderFields(gender, pronoun, customGender) {
    const isCustomGender = gender === 'Personalizado';

    return {
        isValid: gender !== null &&
            (!isCustomGender || (pronoun !== null && isNotEmpty(customGender))),
        errors: {
            gender: gender === null,
            pronoun: isCustomGender && pronoun === null,
            customGender: isCustomGender && !isNotEmpty(customGender)
        }
    };
}

/**
 * Gets password strength label based on strength score
 * @param {number} strength - Password strength score (0-5)
 * @returns {string} - Strength label
 */
export function getPasswordStrengthLabel(strength) {
    if (strength <= 2) return 'Weak';
    if (strength === 3) return 'Medium';
    return 'Strong';
}

/**
 * Validates login credentials
 * @param {string} contact - Email or phone number
 * @param {string} password - Password
 * @param {Array} users - Array of registered users
 * @returns {{isValid: boolean, errorMsg: string, user: object|null}} - Validation result
 */
export function validateLogin(contact, password, users) {
    // Validar campos primero
    const contactValidation = validateContact(contact);
    if (!contactValidation.isValid) {
        return {
            isValid: false,
            errorMsg: contactValidation.errorMsg,
            user: null
        };
    }

    if (!isNotEmpty(password)) {
        return {
            isValid: false,
            errorMsg: 'sign-in.error.passwordRequired', // Updated to use i18n key
            user: null
        };
    }

    // Buscar usuario
    const user = users.find(u => u.contact_info === contact.trim());
    if (!user) {
        return {
            isValid: false,
            errorMsg: 'sign-in.error.userNotFound', // Updated to use i18n key
            user: null
        };
    }

    // Verificar contraseña
    if (user.password !== password) {
        return {
            isValid: false,
            errorMsg: 'sign-in.error.passwordIncorrect', // Updated to use i18n key
            user: null
        };
    }

    return {
        isValid: true,
        errorMsg: '',
        user
    };
}