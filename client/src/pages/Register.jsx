import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { register, resetAuthState } from '../store/authSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referralFromUrl = searchParams.get("ref") || "";

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    referralCode: referralFromUrl,
  });

  const [referralDisabled] = useState(!!referralFromUrl);
  const [errors, setErrors] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    referralCode: "",
  });
  const [serverMessage, setServerMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // Clear error on input change
    setServerMessage(null);
  };

  // Validation functions
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone.trim());

  const validateEmail = (email) => {
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
      password
    );

  const validateForm = () => {
    const usernameError = form.username.trim() ? "" : "Username is required";
    const phoneError = validatePhone(form.phone)
      ? ""
      : "Phone number must be exactly 10 digits";
    const emailError = form.email.trim()
      ? validateEmail(form.email)
        ? ""
        : "Invalid email format"
      : "Email is required";
    const passwordError = validatePassword(form.password)
      ? ""
      : "Password must be at least 6 characters, include uppercase, lowercase, number, and special character";

    setErrors({
      username: usernameError,
      phone: phoneError,
      email: emailError,
      password: passwordError,
      referralCode: "",
    });

    return !usernameError && !phoneError && !emailError && !passwordError;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      const resultAction = await dispatch(register(form));
      if (register.fulfilled.match(resultAction)) {
        navigate("/login", {
          state: { message: "Registered successfully. Please log in." },
        });
      } else {
        setServerMessage(resultAction.payload || "Registration failed.");
      }
    } catch (err) {
      setServerMessage(err.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to login page
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div id="register" className="h-100 py-5">
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
                  noValidate
                  autoComplete="off"
                >
                  {/* Phone */}
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
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      disabled={loading}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  {/* Username */}
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
                      className={`form-control ${errors.username ? "is-invalid" : ""}`}
                      disabled={loading}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="mb-2 text-muted">
                      Email
                    </label>
                    <input
                      name="email"
                      id="email"
                      placeholder="Email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      disabled={loading}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  {/* Password */}
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
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      disabled={loading}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  {/* Referral Code */}
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
                      disabled={referralDisabled || loading}
                    />
                    {errors.referralCode && (
                      <div className="text-danger">{errors.referralCode}</div>
                    )}
                  </div>

                  <p className="form-text text-muted mb-3">
                    By registering you agree with our terms and conditions.
                  </p>

                  <div className="d-flex align-items-center">
                    <button
                      type="submit"
                      className="btn btn-primary ms-auto"
                      disabled={loading}
                    >
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        "Register"
                      )}
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
                    disabled={loading}
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
  );
}
