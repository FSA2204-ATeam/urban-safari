import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';
import axios from 'axios';

export const NewEventForm = (latLng) => {
  const [values, setValues] = useState({
    name: '',
    shortDesc: '',
    datePart: '',
    timePart: '',
    eventLat: 0,
    eventLng: 0,
  });

  useEffect(() => {
    console.log('useEffect running');
    setValues({
      ...values,
      eventLat: latLng.position.lat,
      eventLng: latLng.position.lng,
    });
  }, [latLng]);

  const inputs = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      placeholder: 'Title',
      errorMessage: 'Title should be 2-50 characters long!',
      label: 'title',
      pattern: '^[A-Za-z0-9]{2,50}$',
      required: true,
    },
    {
      id: 2,
      name: 'shortDesc',
      type: 'text',
      placeholder: 'Description',
      errorMessage: 'Description should be 3-1024 characters!',
      label: 'description',
      pattern: '^[A-Za-z0-9]{3,1024}$',
      required: true,
    },
    {
      id: 3,
      name: 'datePart',
      type: 'date',
      placeholder: 'Start',
      label: 'Start Date',
    },
    {
      id: 4,
      name: 'timePart',
      type: 'time',
      placeholder: 'End',
      label: 'Start Time',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    const token = window.localStorage.getItem('token');
    if (token) {
      const newUserEvt = await axios.post('api/usersevents', values, {
        headers: {
          authorization: token,
        },
      });
      console.log('new user event from db', newUserEvt);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log('form values ----->', values);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>New Event Form</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};
