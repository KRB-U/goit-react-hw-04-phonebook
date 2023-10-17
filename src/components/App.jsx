import { useEffect, useState } from 'react';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { nanoid } from 'nanoid';
import 'components/ContactForm/ContactForm';

//STYLED
import { TitlePhonebook, TitleContacts, ContainerWrapper } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    { id: 'id-6', name: 'Emma Thompson', number: '987-65-43' },
    { id: 'id-7', name: 'Oliver Davis', number: '876-54-32' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsLs = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contactsLs);

    if (parseContacts !== null) {
      setContacts(parseContacts);
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmitForm = newContact => {
    const { name } = newContact;

    const isNameInContacts = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameInContacts) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { ...newContact, id: nanoid(7) },
    ]);
  };

  const setFilterToState = value => {
    setFilter(value);
  };

  const getVisibleContacts = () => {
    // const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <ContainerWrapper>
      <TitlePhonebook>Phonebook</TitlePhonebook>
      <ContactForm formDataToApp={handleSubmitForm}></ContactForm>
      <TitleContacts>Contacts</TitleContacts>
      <Filter
        stateValue={filter}
        // stateFromFilter={this.changeFilter}
        stateFromFilter={setFilterToState}
      ></Filter>
      <ContactList
        arrContacts={visibleContacts}
        onDeleteContact={deleteContact}
      ></ContactList>
    </ContainerWrapper>
  );
};

export { App };
