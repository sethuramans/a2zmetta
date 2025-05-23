import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordThunk, resetAuthState } from "../store/authSlice";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const { loading, message, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  useEffect(() => {
    // If reset was successful, redirect after 3 seconds
    if (message) {
      const timer = setTimeout(() => navigate("/login"), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

   // Redirect to profile if already logged in
   useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const validate = () => {
    let valid = true;
    setPasswordError("");
    setConfirmError("");

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    if (!confirm) {
      setConfirmError("Confirm password is required");
      valid = false;
    } else if (password !== confirm) {
      setConfirmError("Passwords do not match");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log(token, password);
    dispatch(resetPasswordThunk({ token, password }));
  };

  return (
    <div id="reset-password" className="h-100 py-5">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9 my-5">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4">Reset Password</h1>
                <form onSubmit={handleSubmit} noValidate>
                  {message && (
                    <div className="alert alert-success">{message}</div>
                  )}
                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="mb-3">
                    <label htmlFor="password">New Password</label>
                    <input
                      type="password"
                      id="password"
                      className={`form-control ${
                        passwordError ? "is-invalid" : ""
                      }`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                    {passwordError && (
                      <div className="invalid-feedback">{passwordError}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm"
                      className={`form-control ${
                        confirmError ? "is-invalid" : ""
                      }`}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      disabled={loading}
                      required
                    />
                    {confirmError && (
                      <div className="invalid-feedback">{confirmError}</div>
                    )}
                  </div>

                  <button
                    className="btn btn-success w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
