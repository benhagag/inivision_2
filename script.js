document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    const detectLocationBtn = document.querySelector('.detect-location');
    const locationInput = document.getElementById('location');
    const businessTypeInput = document.getElementById('business-type');
    const socialLoginBtns = document.querySelectorAll('.social-login button');

    // Form Submission Handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showLoadingState();
            // Simulate API call
            setTimeout(() => {
                hideLoadingState();
                showSuccessMessage();
            }, 2000);

            setTimeout(() => {
                window.location.href = 'benaim/index.html';
            }, 4000);
        }
    });

    // Form Validation
    function validateForm() {
        const requiredFields = ['fullname', 'business-name', 'business-type', 'location'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function validateField(field) {
        const value = field.value.trim();
        
        if (!value) {
            showError(field, 'שדה חובה');
            return false;
        }

        // מיוחד לתחום העסק
        if (field.id === 'business-type' && value.length < 2) {
            showError(field, 'תחום העסק חייב להכיל לפחות 2 תווים');
            return false;
        }

        clearError(field);
        return true;
    }

    // Business Type Handler
    businessTypeInput.addEventListener('input', function(e) {
        const value = e.target.value.trim();
        
        if (value.length >= 2) {
            clearError(this);
            
            // אפשר להוסיף כאן קוד שמציע הצעות נוספות בהתאם למה שהמשתמש מקליד
            // לדוגמה: fetchSimilarBusinessTypes(value);
        }
    });

    // Location Detection
    detectLocationBtn.addEventListener('click', function() {
        if ("geolocation" in navigator) {
            detectLocationBtn.classList.add('loading');
            locationInput.disabled = true;

            navigator.geolocation.getCurrentPosition(
                position => {
                    // Simulate reverse geocoding
                    setTimeout(() => {
                        locationInput.value = 'תל אביב, ישראל';
                        detectLocationBtn.classList.remove('loading');
                        locationInput.disabled = false;
                        clearError(locationInput);
                    }, 1000);
                },
                error => {
                    showError(locationInput, 'לא הצלחנו לזהות את המיקום');
                    detectLocationBtn.classList.remove('loading');
                    locationInput.disabled = false;
                }
            );
        } else {
            showError(locationInput, 'הדפדפן אינו תומך בזיהוי מיקום');
        }
    });

    // Social Login Handlers
    socialLoginBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google-login') ? 'Google' : 'Facebook';
            handleSocialLogin(provider);
        });
    });

    function handleSocialLogin(provider) {
        showLoadingState();
        
        // Simulate social login
        setTimeout(() => {
            hideLoadingState();
            fillFormWithMockData(provider);
        }, 1500);
    }

    function fillFormWithMockData(provider) {
        document.getElementById('fullname').value = 'ישראל ישראלי';
        document.getElementById('business-name').value = `העסק של ישראל`;
        
        // Trigger input events for styling
        document.querySelectorAll('input').forEach(input => {
            input.dispatchEvent(new Event('input'));
            clearError(input);
        });
    }

    // UI State Management
    function showLoadingState() {
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">מעבד...</span>';
        submitBtn.classList.add('loading');
    }

    function hideLoadingState() {
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <span class="btn-text">התחל עכשיו</span>
            <span class="btn-subtext">לחיצה אחת לדף נחיתה מעוצב ומותאם אישית!</span>
        `;
        submitBtn.classList.remove('loading');
    }

    function showSuccessMessage() {
        form.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>מצוין! התחלנו לעבוד על דף הנחיתה שלך</h3>
                <p>תוך מספר דקות תקבל גישה לדף הנחיתה החדש שלך!</p>
            </div>
        `;
    }

    function showError(element, message) {
        const formGroup = element.closest('.form-group');
        clearError(element);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        formGroup.classList.add('has-error');
        formGroup.appendChild(errorElement);
    }

    function clearError(element) {
        const formGroup = element.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            formGroup.removeChild(existingError);
            formGroup.classList.remove('has-error');
        }
    }

    // Form Field Hints
    document.querySelectorAll('.form-group').forEach(group => {
        const input = group.querySelector('input, [list]');
        const hint = group.querySelector('.hint');

        if (input && hint) {
            input.addEventListener('focus', () => {
                hint.style.opacity = '1';
            });

            input.addEventListener('blur', () => {
                hint.style.opacity = '0.6';
            });
        }
    });
});