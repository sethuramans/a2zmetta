import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordThunk, resetAuthState } from '../store/authSlice';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  
   // Redirect to dashboard if already logged in
   useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Navigate to register page
  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");

    // Validation
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    dispatch(forgotPasswordThunk({ email }));
  };

  return (
    <div id="forgot" className="h-100 py-5">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9 my-5">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4">
                  Forgot Password
                </h1>
                <form onSubmit={handleSubmit} noValidate>
                  {message && (
                    <div className="alert alert-success">{message}</div>
                  )}
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="mb-3">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className={`form-control ${
                        emailError ? "is-invalid" : ""
                      }`}
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                    {emailError && (
                      <div className="invalid-feedback">{emailError}</div>
                    )}
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
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

export default ForgotPassword;
