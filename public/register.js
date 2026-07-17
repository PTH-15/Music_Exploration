// register.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const agreeTerms = document.getElementById('agreeTerms');

  const usernameError = document.getElementById('usernameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');
  const termsError = document.getElementById('termsError');

  const strengthBar = document.getElementById('strengthBar');
  const submitBtn = document.getElementById('registerSubmitBtn');

  const togglePassword = document.getElementById('togglePassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

  // Show/hide password toggles
  togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
  });

  toggleConfirmPassword.addEventListener('click', () => {
    const isPassword = confirmPasswordInput.type === 'password';
    confirmPasswordInput.type = isPassword ? 'text' : 'password';
  });

  // Live password strength meter
  passwordInput.addEventListener('input', () => {
    const value = passwordInput.value;
    strengthBar.className = 'strength-bar';

    if (!value) return;

    const hasLength = value.length >= 8;
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);
    const hasUpperLower = /[a-z]/.test(value) && /[A-Z]/.test(value);

    const score = [hasLength, hasNumber, hasSpecial, hasUpperLower].filter(Boolean).length;

    if (score <= 1) {
      strengthBar.classList.add('weak');
    } else if (score <= 3) {
      strengthBar.classList.add('medium');
    } else {
      strengthBar.classList.add('strong');
    }
  });

  function validateEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value.trim());
  }

  function clearFieldErrors() {
    [usernameError, emailError, passwordError, confirmPasswordError, termsError].forEach(
      (el) => (el.textContent = '')
    );
    [usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach((el) =>
      el.classList.remove('invalid')
    );
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearFieldErrors();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    let hasError = false;

    if (!username) {
      usernameError.textContent = 'Username is required';
      usernameInput.classList.add('invalid');
      hasError = true;
    } else if (username.length < 3) {
      usernameError.textContent = 'Username must be at least 3 characters';
      usernameInput.classList.add('invalid');
      hasError = true;
    }

    if (!email) {
      emailError.textContent = 'Email is required';
      emailInput.classList.add('invalid');
      hasError = true;
    } else if (!validateEmail(email)) {
      emailError.textContent = 'Enter a valid email address';
      emailInput.classList.add('invalid');
      hasError = true;
    }

    if (!password) {
      passwordError.textContent = 'Password is required';
      passwordInput.classList.add('invalid');
      hasError = true;
    } else if (password.length < 8) {
      passwordError.textContent = 'Password must be at least 8 characters';
      passwordInput.classList.add('invalid');
      hasError = true;
    }

    if (!confirmPassword) {
      confirmPasswordError.textContent = 'Please confirm your password';
      confirmPasswordInput.classList.add('invalid');
      hasError = true;
    } else if (password !== confirmPassword) {
      confirmPasswordError.textContent = 'Passwords do not match';
      confirmPasswordInput.classList.add('invalid');
      hasError = true;
    }

    if (!agreeTerms.checked) {
      termsError.textContent = 'You must agree to the terms to continue';
      hasError = true;
    }

    if (hasError) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Server can return a field-specific error, e.g. { field: 'email', message: '...' }
        if (data.field === 'email') {
          emailError.textContent = data.message;
          emailInput.classList.add('invalid');
        } else if (data.field === 'username') {
          usernameError.textContent = data.message;
          usernameInput.classList.add('invalid');
        } else {
          emailError.textContent = data.message || 'Something went wrong. Please try again.';
        }
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
        return;
      }

      // Success - redirect to login or straight into the app
      window.location.href = data.redirectTo || '/login';
    } catch (err) {
      emailError.textContent = 'Something went wrong. Please try again.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create Account';
    }
  });
});