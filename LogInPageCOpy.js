// Wait for page to fully load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Login page loaded!'); // Debug message
    
    // Get elements for LOGIN form
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('pass');
    const loginBtn = document.getElementById('login');
    const ind = document.getElementById('ind');
    
    // Get elements for REGISTER form
    const fullnameInput = document.getElementById('fullname');
    const regEmailInput = document.getElementById('regEmail');
    const phoneInput = document.getElementById('phone');
    const regPassInput = document.getElementById('regPass');
    const confPassInput = document.getElementById('confPass');
    const registerBtn = document.getElementById('registerBtn');
    const regInd = document.getElementById('regInd');
    
    // LOGIN FORM - Enter key handlers
    emailInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            Login();
        }
    });
    
    passInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            Login();
        }
    });
    
    // REGISTER FORM - Enter key handlers
    [fullnameInput, regEmailInput, phoneInput, regPassInput, confPassInput].forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                Register();
            }
        });
    });
    
    // LOGIN Button click handler
    loginBtn.addEventListener('click', function(event) {
        event.preventDefault();
        Login();
    });
    
    // REGISTER Button click handler
    if (registerBtn) {
        registerBtn.addEventListener('click', function(event) {
            event.preventDefault();
            Register();
        });
    }
});

// Main login function (YOUR ORIGINAL CODE - PERFECTLY PRESERVED)
function Login() {
    console.log('Login function called!'); // Debug message
    
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('pass').value.trim();
    const ind = document.getElementById('ind');
    
    // Clear previous message
    ind.innerHTML = '';
    ind.style.color = '';
    
    // Validation
    if(email === '') {
        ind.innerHTML = 'Username cannot be empty.';
        ind.style.color = '#f44336';
        document.getElementById('email').focus();
        return;
    }
    
    if(pass === '') {
        ind.innerHTML = 'Password cannot be empty.';
        ind.style.color = '#f44336';
        document.getElementById('pass').focus();
        return;
    }
    
    // ✅ REGULAR USER - HIGHEST PRIORITY
    if(email === 'francis.espeloa68@gmail.com' && pass === 'admin123') {
        ind.innerHTML = '✅ Welcome back! Redirecting...';
        ind.style.color = '#4CAF50';
        setTimeout(function(){
            window.location.href = 'MainIndex copy.html';
        }, 2000);
        return;
    }
    
    // ✅ ADMIN ACCESS
    if(email === 'admin123' || pass === 'admin123') {
        ind.innerHTML = '🔐 Admin access granted! Redirecting...';
        ind.style.color = '#2196F3';
        setTimeout(function(){
            window.location.href = 'AdminIndex.html';
        }, 1500);
        return;
    }
    
    // ❌ INVALID
    ind.innerHTML = '❌ Invalid credentials.';
    ind.style.color = '#f44336';
    document.getElementById('email').focus();
}

// NEW REGISTER FUNCTION (FIXED PHONE VALIDATION)
function Register() {
    console.log('Register function called!');
    
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const pass = document.getElementById('regPass').value;
    const confPass = document.getElementById('confPass').value;
    const regInd = document.getElementById('regInd');
    
    // Clear previous message
    regInd.innerHTML = '';
    regInd.style.color = '';
    
    // Validation
    if(fullname === '') {
        regInd.innerHTML = 'Full name cannot be empty.';
        regInd.style.color = '#f44336';
        document.getElementById('fullname').focus();
        return;
    }
    
    if(email === '') {
        regInd.innerHTML = 'Email cannot be empty.';
        regInd.style.color = '#f44336';
        document.getElementById('regEmail').focus();
        return;
    }
    
    if(phone === '') {
        regInd.innerHTML = 'Phone number cannot be empty.';
        regInd.style.color = '#f44336';
        document.getElementById('phone').focus();
        return;
    }
    
    if(pass === '') {
        regInd.innerHTML = 'Password cannot be empty.';
        regInd.style.color = '#f44336';
        document.getElementById('regPass').focus();
        return;
    }
    
    if(confPass === '') {
        regInd.innerHTML = 'Please confirm your password.';
        regInd.style.color = '#f44336';
        document.getElementById('confPass').focus();
        return;
    }
    
    if(pass !== confPass) {
        regInd.innerHTML = '❌ Passwords do not match!';
        regInd.style.color = '#f44336';
        document.getElementById('regPass').focus();
        return;
    }
    
    if(pass.length < 6) {
        regInd.innerHTML = 'Password must be at least 6 characters.';
        regInd.style.color = '#f44336';
        document.getElementById('regPass').focus();
        return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        regInd.innerHTML = 'Please enter a valid email address.';
        regInd.style.color = '#f44336';
        document.getElementById('regEmail').focus();
        return;
    }
    
    // ✅ FIXED PHONE VALIDATION - Much more flexible
    const cleanPhone = phone.replace(/[\s\-\$\$\+]/g, ''); // Remove spaces, dashes, parentheses, +
    const phoneRegex = /^[0-9]{10,15}$/; // 10-15 digits only
    
    if(!phoneRegex.test(cleanPhone)) {
        regInd.innerHTML = 'Phone number must be 10-15 digits (spaces/dashes ok).';
        regInd.style.color = '#f44336';
        document.getElementById('phone').focus();
        return;
    }
    
    // ✅ SUCCESS - Simulate registration
    regInd.innerHTML = '✅ Account created successfully! Redirecting to login...';
    regInd.style.color = '#4CAF50';
    
    console.log('New user registered:', { fullname, email, phone: cleanPhone });
    
    // Clear form and switch to login after 2 seconds
    setTimeout(function() {
        clearRegisterFields();
        showLogin();
    }, 2000);
}

// Toggle between forms
function showRegister() {
    document.getElementById('loginContent').style.display = 'none';
    document.getElementById('registerContent').style.display = 'block';
    console.log('Switched to register form');
}

function showLogin() {
    document.getElementById('registerContent').style.display = 'none';
    document.getElementById('loginContent').style.display = 'block';
    clearLoginFields();
    console.log('Switched to login form');
}

function togglePassword() {
    console.log('Password reset clicked');
    alert('Password reset functionality coming soon!');
}

// Clear field functions
function clearLoginFields() {
    document.getElementById('email').value = '';
    document.getElementById('pass').value = '';
    document.getElementById('ind').innerHTML = '';
}

function clearRegisterFields() {
    document.getElementById('fullname').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('regPass').value = '';
    document.getElementById('confPass').value = '';
    document.getElementById('regInd').innerHTML = '';
}

// NEW REGISTER FUNCTION (UPDATED TO REDIRECT TO MAIN PAGE)
function Register() {
    console.log('Register function called!');
    
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const pass = document.getElementById('regPass').value;
    const confPass = document.getElementById('confPass').value;
    const regInd = document.getElementById('regInd');
    
    // Clear previous message
    regInd.innerHTML = '';
    regInd.style.color = '';
    
    // Validation
    if(fullname === '') {
        regInd.innerHTML = 'Full name cannot be empty.';
        regInd.style.color = '#f44336';
        document.getElementById('fullname').focus();
        return;
    }
    
    if(email === '') {
        regInd.innerHTML = 'Email cannot be empty.';
        regInd.style.color = '#f44336';
        document.getElementById('regEmail').focus();
        return;
    }
    
    if(phone === '') {
        regInd.innerHTML = 'Phone number cannot be empty.';
        regInd.style.color = '#f44336';
        document.getElementById('phone').focus();
        return;
    }
    
    if(pass === '') {
        regInd.innerHTML = 'Password cannot be empty.';
        regInd.style.color = '#f44336';
        document.getElementById('regPass').focus();
        return;
    }
    
    if(confPass === '') {
        regInd.innerHTML = 'Please confirm your password.';
        regInd.style.color = '#f44336';
        document.getElementById('confPass').focus();
        return;
    }
    
    if(pass !== confPass) {
        regInd.innerHTML = '❌ Passwords do not match!';
        regInd.style.color = '#f44336';
        document.getElementById('regPass').focus();
        return;
    }
    
    if(pass.length < 6) {
        regInd.innerHTML = 'Password must be at least 6 characters.';
        regInd.style.color = '#f44336';
        document.getElementById('regPass').focus();
        return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        regInd.innerHTML = 'Please enter a valid email address.';
        regInd.style.color = '#f44336';
        document.getElementById('regEmail').focus();
        return;
    }
    
    // ✅ FIXED PHONE VALIDATION - Much more flexible
    const cleanPhone = phone.replace(/[\s\-\$\$\+]/g, ''); // Remove spaces, dashes, parentheses, +
    const phoneRegex = /^[0-9]{10,15}$/; // 10-15 digits only
    
    if(!phoneRegex.test(cleanPhone)) {
        regInd.innerHTML = 'Phone number must be 10-15 digits (spaces/dashes ok).';
        regInd.style.color = '#f44336';
        document.getElementById('phone').focus();
        return;
    }
    
    // ✅ SUCCESS - Store user data & REDIRECT TO MAIN PAGE
    regInd.innerHTML = '✅ Account created successfully! Welcome to LOADIFY...';
    regInd.style.color = '#4CAF50';
    
    // Store registered user data in localStorage
    const userData = {
        fullname: fullname,
        email: email,
        phone: cleanPhone,
        registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('loadifyUser', JSON.stringify(userData));
    console.log('New user registered & stored:', userData);
    
    // Redirect to your MAIN PAGE after 2.5 seconds
    setTimeout(function() {
        window.location.href = 'MainIndex copy.html'; // Your main page filename
    }, 2500);
}