import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import s from './App.module.css';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
      // повертаються всі контакти що не дорівнюють "contactId",
      // тобто того що ми хочемо видалити
    }));
  };

  handleInputChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  formSubmitHandler = contact => {
    const { name } = contact;
    const checkAddName = this.state.contacts.some(el => el.name === name);
    const newContact = {
      id: nanoid(),
      ...contact,
    };

    if (checkAddName) {
      return alert(`${contact.name} is already in contacts.`);
    }

    this.setState(prev => {
      return { contacts: [...prev.contacts, newContact] };
      // в contacts записується новий масив в який розпилюється
      // попереднє значення та додається новий контакт (data)
    });
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;

    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    const filterContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result = normalizedName.includes(normalizedFilter);
      return result;
    });
    return filterContacts;
  }

  render() {
    const { filter } = this.state;
    const contacts = this.getFilteredContacts();
    return (
      <div className={s.phonebook}>
        <div className={s.phonebook__card}>
          <h1 className={s.phonebook__title}>Phonebook</h1>
          <ContactForm addContact={this.formSubmitHandler} />

          <h2 className={s.phonebook__second_title}>Contacts</h2>
          <Filter input={filter} onChange={this.handleChange} />
          <ContactList
            contacts={contacts}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}
