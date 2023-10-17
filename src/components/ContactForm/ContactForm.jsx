import { useState } from 'react';

import { nanoid } from 'nanoid';

import {
  FormContainer,
  LabelInputName,
  InputName,
  LabelInputPhone,
  InputPhone,
  Button,
} from './ContactForm.styled';

// NOTIFY
import toast from 'react-hot-toast';

const ContactForm = ({ formDataToApp }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const formNameUniqueKey = nanoid(10);
  const formNumberUniqueKey = nanoid(7);

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleChange = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }

    // this.setState({
    //   [name]: value,
    // });
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    formDataToApp({ name, number });
    toast.success('Додано');
    reset();
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <LabelInputName htmlFor={formNameUniqueKey}>
          Name
          <InputName
            type="text"
            name="name"
            required
            value={name}
            onChange={handleChange}
            id={formNameUniqueKey}
          />
        </LabelInputName>

        <LabelInputPhone htmlFor={formNumberUniqueKey}>
          Number
          <InputPhone
            type="tel"
            name="number"
            required
            value={number}
            onChange={handleChange}
            id={formNumberUniqueKey}
          />
        </LabelInputPhone>

        <Button type="submit">Add contact</Button>
      </form>
    </FormContainer>
  );
};

export { ContactForm };
