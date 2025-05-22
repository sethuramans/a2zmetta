import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import { fetchUserProfile, updateProfile } from '../store/profileSlice';

const ProfileEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    displayname:  '',
    email:  '',
  });

  useEffect(() => {
    if (!user) {
      // If user data is not in redux store, fetch it
      const userId = 1; // Get the user ID (you may get this from auth state)
      dispatch(fetchUserProfile(userId));
    } else {
      // Pre-fill form data with current user details
      setFormData({
        displayname: user.displayname,
        email: user.email,
        username: user.username
      });
    }
  }, [user, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData))
      .unwrap()
      .then(() => {
        navigate('/profile'); // Redirect to profile page after success
      })
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
                {error && <p className="error">{error}</p>}
                {user && (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="username" className="mb-2 text-muted">
                        Username:
                      </label>
                      <input
                        type="username"
                        name="username"
                        value={formData.username}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="displayname" className="mb-2 text-muted">
                        Display Name:
                      </label>
                      <input
                        type="text"
                        name="displayname"
                        value={formData.displayname}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="mb-2 text-muted">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="ms-auto">
                        <button
                          type="submit"
                          className="btn btn-primary m-1"
                          onClick={() => navigate("/profile")}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary m-1"
                        >
                          Save
                        </button>
                      </div>
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
