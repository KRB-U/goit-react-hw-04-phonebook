import { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { nanoid } from 'nanoid';

import 'components/ContactForm/ContactForm';

//STYLED
import { TitlePhonebook, TitleContacts, ContainerWrapper } from './App.styled';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-6', name: 'Emma Thompson', number: '987-65-43' },
      { id: 'id-7', name: 'Oliver Davis', number: '876-54-32' },
      { id: 'id-9', name: 'Noah Anderson', number: '654-32-10' },
      { id: 'id-11', name: 'Sophia Garcia', number: '432-10-98' },
      { id: 'id-18', name: 'Henry Young', number: '765-43-21' },
      { id: 'id-19', name: 'Emily Hernandez', number: '654-32-10' },
      { id: 'id-21', name: 'Lucy Foster', number: '432-10-98' },
      { id: 'id-23', name: 'Mia Hall', number: '210-98-76' },
      { id: 'id-25', name: 'Benjamin Lewis', number: '098-76-54' },
      { id: 'id-27', name: 'Henry Young', number: '876-54-32' },
      { id: 'id-28', name: 'Emily Hernandez', number: '765-43-21' },
      { id: 'id-30', name: 'Sophia Garcia', number: '543-21-09' },
    ],
    filter: '',
  };

  componentDidMount() {
    // if (this.state.contacts.length !== 0) {
    //   localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    // }

    const contactsLs = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contactsLs);

    if (parseContacts !== null) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  nameUniqueKey = nanoid(5);

  handleSubmitForm = newContact => {
    const { contacts } = this.state;
    const { name } = newContact;

    const isNameInContacts = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameInContacts) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { ...newContact, id: nanoid(7) }],
    }));
  };

  setFilterToState = value => {
    this.setState({ filter: value });
  };

  // changeFilter = evt => {
  //   this.setState({ filter: evt.target.value });
  // };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <ContainerWrapper>
        <TitlePhonebook>Phonebook</TitlePhonebook>
        <ContactForm formDataToApp={this.handleSubmitForm}></ContactForm>
        <TitleContacts>Contacts</TitleContacts>
        <Filter
          stateValue={filter}
          // stateFromFilter={this.changeFilter}
          stateFromFilter={this.setFilterToState}
        ></Filter>
        <ContactList
          arrContacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        ></ContactList>
      </ContainerWrapper>
    );
  }
}

export { App };
