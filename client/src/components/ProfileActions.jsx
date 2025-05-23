import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import LogoutButton from './LogoutButton';

const ProfileActions = () => {
  const navigate = useNavigate();

  return (
    <Dropdown as={ButtonGroup} className="m-2">
      <Dropdown.Toggle variant="primary" id="dropdown-profile-actions">
        Actions
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => navigate('/profile/update')}>
          Edit Profile
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as="div" className="p-0">
          <LogoutButton />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileActions;
