import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store/authSlice';
import { useNavigate, useSearchParams  } from 'react-router-dom';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referralFromUrl = searchParams.get('ref') || '';
  
  const [form, setForm] = useState({
    username: "",
    phone: "",
    password: "",
    referralCode: referralFromUrl,
  });
  
  const [referralDisabled] = useState(!!referralFromUrl);;
  const [errors, setErrors] = useState({ username: '', phone: '', password: '', referralCode: '' });
  const [serverMessage, setServerMessage] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Phone validation
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Validate 10 digit phone number
    return phoneRegex.test(phone);
  };

  // Password validation (at least 6 characters, one uppercase, one lowercase, and one special character)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clear previous server message
    setServerMessage(null);
  
    // Client-side validation
    const usernameError = form.username ? '' : 'Username is required';
    const phoneError = validatePhone(form.phone) ? '' : 'Phone number must be 10 digits';
    const passwordError = validatePassword(form.password)
      ? ''
      : 'Password must be at least 6 characters, contain an uppercase letter, a lowercase letter, a number, and a special character';
  
    setErrors({
      username: usernameError,
      phone: phoneError,
      password: passwordError,
      referralCode: '',
    });
  
    if (!usernameError && !phoneError && !passwordError) {
      try {
        const resultAction = await dispatch(register(form));
        console.log('Registration:', resultAction);
  
        if (register.fulfilled.match(resultAction)) {
          const { token, user } = resultAction.payload;
          console.log('Registration success:', token, user);
          // Optionally display message or redirect
          navigate('/login', { state: { message: 'Registered successfully. Please log in.' } });
        } else {
          // Error from API (e.g., duplicate phone)
          setServerMessage(resultAction.payload || 'Registration failed.');
        }
      } catch (err) {
        // Unexpected error (e.g., network issue)
        setServerMessage(err.message || 'Unexpected error occurred.');
      }
    }
  };
  

 
  // Navigate to Login page
  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <>
      <div id="login" className="h-100 py-5">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9 my-5">
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                  {serverMessage && (
                    <div className="alert alert-danger" role="alert">
                      {serverMessage}
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    method="POST"
                    className="needs-validation"
                    novalidate=""
                    autoComplete="off"
                  >
                    <div className="mb-3">
                      <label htmlFor="phone" className="mb-2 text-muted">
                        Mobile Number
                      </label>
                      <input
                        name="phone"
                        id="phone"
                        placeholder="Mobile Number"
                        value={form.phone}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.phone && (
                        <div className="text-danger">{errors.phone}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="username" className="mb-2 text-muted">
                        User Name
                      </label>
                      <input
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.username && (
                        <div className="text-danger">{errors.username}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="mb-2 text-muted">
                        Password
                      </label>
                      <input
                        name="password"
                        id="password"
                        placeholder="Password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.password && (
                        <div className="text-danger">{errors.password}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="referralCode" className="mb-2 text-muted">
                        Referral Code
                      </label>
                      <input
                        name="referralCode"
                        id="referralCode"
                        placeholder="Referral Code (Optional)"
                        value={form.referralCode}
                        onChange={handleChange}
                        className="form-control"
                        disabled={referralDisabled}
                      />
                      {errors.referralCode && (
                        <div className="text-danger">{errors.referralCode}</div>
                      )}
                    </div>

                    <p className="form-text text-muted mb-3">
                      By registering you agree with our terms and conditions.
                    </p>

                    <div className="d-flex align-items-center">
                      <button type="submit" className="btn btn-primary ms-auto">
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Already have an account?{" "}
                    <button
                      onClick={handleLogin}
                      className="text-white btn btn-link p-0"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
