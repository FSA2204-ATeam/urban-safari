import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from './FormInput';
import { updateProfile } from '../store/auth';
import axios from 'axios';

const UserProfileForm = (props) => {
  const [values, setValues] = useState({
    username: props.userProfile.username,
    email: props.userProfile.email,
    firstname: props.userProfile.firstname,
    lastname: props.userProfile.lastname,
  });

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'username',
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'email',
      errorMessage: 'It should be a valid email address!',
      label: 'Email',
      required: true,
    },
    {
      id: 3,
      name: 'firstname',
      type: 'text',
      placeholder: 'First Name',
      errorMessage: 'First name should be 1-16 characters!',
      label: 'First Name',
      pattern: '^[A-Za-z0-9]{1,16}$',
      required: true,
    },
    {
      id: 4,
      name: 'lastname',
      type: 'text',
      placeholder: 'Last Name',
      errorMessage: 'Last name should be 1-16 characters!',
      label: 'First Name',
      pattern: '^[A-Za-z0-9]{1,16}$',
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem('token');
    if (token) {
      const res = await axios.put('api/users/updateProfile', values, {
        headers: {
          authorization: token,
        },
      });
      props.updateState(res.data);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>{`${props.userProfile.username}'s profile`}</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Update</button>
      </form>
    </div>
  );
};

const mapState = (state) => {
  return {
    userProfile: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateState(user) {
      dispatch(updateProfile(user));
    },
  };
};

export default connect(mapState, mapDispatch)(UserProfileForm);