import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, updateProfile } from '../store/profileSlice';

const ProfileEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    displayname: '',
    email: '',
    username: '',
  });

  const [formErrors, setFormErrors] = useState({
    displayname: '',
    email: '',
  });

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile(1)); // Replace with real user ID from auth
    } else {
      setFormData({
        displayname: user.displayname || '',
        email: user.email || '',
        username: user.username || '',
      });
    }
  }, [user, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.displayname.trim()) {
      errors.displayname = 'Display name is required.';
    } else if (formData.displayname.trim().length < 2) {
      errors.displayname = 'Display name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Invalid email format.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(updateProfile(formData))
      .unwrap()
      .then(() => navigate('/profile'))
      .catch((err) => {
        console.error('Error updating profile:', err);
      });
  };

  return (
    <div id="profile-update" className="h-100 py-5">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9 my-5">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4">Update Profile</h1>

                {loading && <p>Loading...</p>}
                {error && <div className="alert alert-danger">{error}</div>}

                {user && (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                      <label htmlFor="username" className="mb-2 text-muted">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        className="form-control"
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="displayname" className="mb-2 text-muted">Display Name</label>
                      <input
                        type="text"
                        name="displayname"
                        value={formData.displayname}
                        onChange={handleChange}
                        className={`form-control ${formErrors.displayname ? 'is-invalid' : ''}`}
                      />
                      {formErrors.displayname && (
                        <div className="invalid-feedback">{formErrors.displayname}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="mb-2 text-muted">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                      />
                      {formErrors.email && (
                        <div className="invalid-feedback">{formErrors.email}</div>
                      )}
                    </div>

                    <div className="d-flex align-items-center justify-content-end">
                      <button
                        type="button"
                        className="btn btn-outline-secondary me-2"
                        onClick={() => navigate('/profile')}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          'Save'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
