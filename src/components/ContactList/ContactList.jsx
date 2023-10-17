import { Button, ContactItem } from './ContactList.styled';

const ContactList = ({ arrContacts, onDeleteContact }) => {
  return (
    <div>
      <ul>
        {arrContacts.map(({ name, number, id }) => (
          <ContactItem key={id}>
            {name}: {number}
            <Button type="submit" onClick={() => onDeleteContact(id)}>
              Delete
            </Button>
          </ContactItem>
        ))}
      </ul>
    </div>
  );
};

export { ContactList };
