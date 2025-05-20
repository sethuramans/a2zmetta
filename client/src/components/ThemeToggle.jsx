// src/components/ThemeToggle.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="themeSwitch"
        checked={theme === 'dark'}
        onChange={() => dispatch(toggleTheme())}
      />
      <label className="form-check-label" htmlFor="themeSwitch">
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </label>
    </div>
  );
};

export default ThemeToggle;
