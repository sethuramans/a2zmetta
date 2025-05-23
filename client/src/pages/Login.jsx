import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetAuthState } from '../store/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  const successMessage = location.state?.message;

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    phone: "",
    password: "",
  });

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Phone number validation
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // 10 digits only
    return phoneRegex.test(phone.trim());
  };

  // Password validation (at least 6 characters, one uppercase, one lowercase, one number, one special char)
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const phoneError = validatePhone(phone)
      ? ""
      : "Phone number must be exactly 10 digits.";
    const passwordError = validatePassword(password)
      ? ""
      : "Password must be at least 6 characters, include uppercase, lowercase, number, and special character.";

    setErrors({ phone: phoneError, password: passwordError });

    return !phoneError && !passwordError;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const resultAction = await dispatch(
        login({ phone: phone.trim(), password })
      );

      if (login.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // Navigate to forgot password page
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  // Navigate to register page
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div id="login" className="h-100 py-5">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9 my-5">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}

                <form
                  method="POST"
                  className="needs-validation"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="phone">
                      Mobile Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={`form-control ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      autoFocus
                    />
                    <small id="phoneHelp" className="form-text text-secondary">
                      We'll never share your mobile with anyone else.
                    </small>
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <div className="mb-2 w-100 d-flex justify-content-between align-items-center">
                      <label className="text-muted" htmlFor="password">
                        Password
                      </label>
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={handleForgotPassword}
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <input
                      id="password"
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      name="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

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
                        "Login"
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    onClick={handleRegister}
                  >
                    Create One
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
