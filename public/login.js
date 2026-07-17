// login.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const errorBanner = document.getElementById('errorBanner');
  const errorText = document.getElementById('errorText');
  const submitBtn = document.getElementById('loginSubmitBtn');
  const togglePassword = document.getElementById('togglePassword');

  // Show/hide password
  togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePassword.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });

  function validateEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value.trim());
  }

  function clearFieldErrors() {
    emailError.textContent = '';
    passwordError.textContent = '';
    emailInput.classList.remove('invalid');
    passwordInput.classList.remove('invalid');
  }

  function showBannerError(message) {
    errorText.textContent = message;
    errorBanner.style.display = 'block';
  }

  function hideBannerError() {
    errorBanner.style.display = 'none';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearFieldErrors();
    hideBannerError();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let hasError = false;

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
    }

    if (hasError) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          remember: document.getElementById('remember').checked,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        showBannerError(data.message || 'Invalid email or password');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Log In';
        return;
      }

      // Success - redirect to homepage or wherever the server tells us to
      window.location.href = data.redirectTo || '/';
    } catch (err) {
      showBannerError('Something went wrong. Please try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Log In';
    }
  });
});