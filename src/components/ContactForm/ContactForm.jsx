import { Component } from 'react';
import { nanoid } from 'nanoid';
import {
  FormContainer,
  LabelInputName,
  InputName,
  LabelInputPhone,
  InputPhone,
  Button,
} from './ContactForm.styled';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  formNameUniqueKey = nanoid(10);
  formNumberUniqueKey = nanoid(7);

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleChange = evt => {
    const { name, value } = evt.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { name, number } = this.state;

    this.props.formDataToApp({ name, number });
    this.reset();

    // this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <FormContainer>
        <form onSubmit={this.handleSubmit}>
          <LabelInputName htmlFor={this.formNameUniqueKey}>
            Name
            <InputName
              type="text"
              name="name"
              required
              value={this.state.name}
              onChange={this.handleChange}
              id={this.formNameUniqueKey}
            />
          </LabelInputName>

          <LabelInputPhone htmlFor={this.formNumberUniqueKey}>
            Number
            <InputPhone
              type="tel"
              name="number"
              required
              value={this.state.number}
              onChange={this.handleChange}
              id={this.formNumberUniqueKey}
            />
          </LabelInputPhone>

          <Button type="submit">Add contact</Button>
        </form>
      </FormContainer>
    );
  }
}

export { ContactForm };
