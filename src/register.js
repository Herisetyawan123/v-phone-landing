
document.addEventListener('DOMContentLoaded', function() {
  // Get form elements
  const registerForm = document.getElementById('register-form');
  const fullnameInput = document.getElementById('fullname');
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const countrySelect = document.getElementById('country');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const termsCheckbox = document.getElementById('terms');
  
  // Get error message elements
  const fullnameError = document.getElementById('fullname-error');
  const genderError = document.getElementById('gender-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  const countryError = document.getElementById('country-error');
  const passwordError = document.getElementById('password-error');
  const confirmPasswordError = document.getElementById('confirm-password-error');
  const termsError = document.getElementById('terms-error');
  
  // Form submission handler
  registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Reset all error messages
    resetErrors();
    
    // Validate form inputs
    let isValid = true;
    
    // Validate fullname (required, at least 3 characters)
    if (!fullnameInput.value.trim()) {
      showError(fullnameError, 'Please enter your full name');
      isValid = false;
    } else if (fullnameInput.value.trim().length < 3) {
      showError(fullnameError, 'Full name must be at least 3 characters');
      isValid = false;
    }
    
    // Validate gender (one option must be selected)
    let genderSelected = false;
    genderInputs.forEach(input => {
      if (input.checked) {
        genderSelected = true;
      }
    });
    
    if (!genderSelected) {
      showError(genderError, 'Please select your gender');
      isValid = false;
    }
    
    // Validate email (required and must be valid format)
    if (!emailInput.value.trim()) {
      showError(emailError, 'Please enter your email address');
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailError, 'Please enter a valid email address');
      isValid = false;
    }
    
    // Validate phone (required and must be valid format)
    if (!phoneInput.value.trim()) {
      showError(phoneError, 'Please enter your phone number');
      isValid = false;
    } else if (!isValidPhone(phoneInput.value.trim())) {
      showError(phoneError, 'Please enter a valid phone number');
      isValid = false;
    }
    
    // Validate country (must be selected)
    if (!countrySelect.value) {
      showError(countryError, 'Please select your country');
      isValid = false;
    }
    
    // Validate password (required, at least a number and letter, min 8 characters)
    if (!passwordInput.value) {
      showError(passwordError, 'Please create a password');
      isValid = false;
    } else if (passwordInput.value.length < 8) {
      showError(passwordError, 'Password must be at least 8 characters');
      isValid = false;
    } else if (!hasLetterAndNumber(passwordInput.value)) {
      showError(passwordError, 'Password must contain at least one letter and one number');
      isValid = false;
    }
    
    // Validate confirm password (must match password)
    if (!confirmPasswordInput.value) {
      showError(confirmPasswordError, 'Please confirm your password');
      isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
      showError(confirmPasswordError, 'Passwords do not match');
      isValid = false;
    }
    
    // Validate terms acceptance
    if (!termsCheckbox.checked) {
      showError(termsError, 'You must agree to the terms and conditions');
      isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
      // Create success message element
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message show';
      successMessage.textContent = 'Registration successful! Welcome to the V-Phone family.';
      
      // Insert before form
      registerForm.parentNode.insertBefore(successMessage, registerForm);
      
      // Reset form
      registerForm.reset();
      
      // Scroll to success message
      successMessage.scrollIntoView({ behavior: 'smooth' });
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }
  });
  
  // Helper Functions
  
  // Show error message
  function showError(element, message) {
    element.textContent = message;
    element.parentElement.classList.add('has-error');
  }
  
  // Reset all error messages
  function resetErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
      element.textContent = '';
    });
    
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
      group.classList.remove('has-error');
    });
  }
  
  // Email validation without regex
  function isValidEmail(email) {
    // Check for @ symbol and period
    const hasAtSymbol = email.indexOf('@') > 0;
    const hasDot = email.indexOf('.', email.indexOf('@')) > email.indexOf('@');
    
    // Check for at least one character before @ and after last dot
    const hasPrefix = email.indexOf('@') > 0;
    const lastDotPosition = email.lastIndexOf('.');
    const hasSuffix = lastDotPosition < email.length - 1;
    
    return hasAtSymbol && hasDot && hasPrefix && hasSuffix;
  }
  
  // Phone validation without regex
  function isValidPhone(phone) {
    // Remove any spaces
    const cleanedPhone = phone.replace(/\s/g, '');
    
    // Check if it's only digits (and optionally + at the beginning)
    let isValid = true;
    
    // Check if it starts with a plus sign
    let startIndex = 0;
    if (cleanedPhone.charAt(0) === '+') {
      startIndex = 1;
    }
    
    // Check if all characters are digits
    for (let i = startIndex; i < cleanedPhone.length; i++) {
      const charCode = cleanedPhone.charCodeAt(i);
      if (charCode < 48 || charCode > 57) {
        isValid = false;
        break;
      }
    }
    
    // Check length (at least 7 digits, not more than 15)
    const digitCount = cleanedPhone.length - (startIndex === 1 ? 1 : 0);
    if (digitCount < 7 || digitCount > 15) {
      isValid = false;
    }
    
    return isValid;
  }
  
  // Check if a string has at least one letter and one number
  function hasLetterAndNumber(str) {
    let hasLetter = false;
    let hasNumber = false;
    
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      
      // Check if it's a letter (A-Z or a-z)
      if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
        hasLetter = true;
      }
      
      // Check if it's a number (0-9)
      if (charCode >= 48 && charCode <= 57) {
        hasNumber = true;
      }
      
      // If both are found, return true
      if (hasLetter && hasNumber) {
        return true;
      }
    }
    
    return false;
  }
  
  // Input event listeners for real-time validation
  
  // Fullname validation
  fullnameInput.addEventListener('blur', function() {
    if (this.value.trim() && this.value.trim().length >= 3) {
      fullnameError.textContent = '';
    }
  });
  
  // Email validation
  emailInput.addEventListener('blur', function() {
    if (this.value.trim() && isValidEmail(this.value.trim())) {
      emailError.textContent = '';
    }
  });
  
  // Password validation
  passwordInput.addEventListener('input', function() {
    if (this.value && this.value.length >= 8 && hasLetterAndNumber(this.value)) {
      passwordError.textContent = '';
    }
    
    // Validate confirm password on password change
    if (confirmPasswordInput.value && confirmPasswordInput.value === this.value) {
      confirmPasswordError.textContent = '';
    } else if (confirmPasswordInput.value) {
      confirmPasswordError.textContent = 'Passwords do not match';
    }
  });
  
  // Confirm password validation
  confirmPasswordInput.addEventListener('input', function() {
    if (this.value && this.value === passwordInput.value) {
      confirmPasswordError.textContent = '';
    } else if (this.value) {
      confirmPasswordError.textContent = 'Passwords do not match';
    }
  });
});
