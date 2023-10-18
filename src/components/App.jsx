import { useEffect, useState } from 'react';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { nanoid } from 'nanoid';
import 'components/ContactForm/ContactForm';

//STYLED
import { TitlePhonebook, TitleContacts, ContainerWrapper } from './App.styled';

// NOTIFY
import toast, { Toaster } from 'react-hot-toast';
import contactsData from '../jsonData/contactsData.json';

const App = () => {
  const savedContacts = () => {
    const contactsLs = localStorage.getItem('contacts');

    if (contactsLs !== null) {
      return JSON.parse(contactsLs);
    }

    return contactsData;
  };

  const [contacts, setContacts] = useState(savedContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    contacts && localStorage.setItem('contacts', JSON.stringify(contacts));
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
    toast.success('Видалено');
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
      <Toaster></Toaster>
    </ContainerWrapper>
  );
};

export { App };
