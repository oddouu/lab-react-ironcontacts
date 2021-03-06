import React, { Component } from 'react';
import './App.css';

import contactsFromJSON from './contacts.json';
import Card from './components/Card';

class App extends Component {
  state = {
    contacts: contactsFromJSON.slice(0, 5),
  };

  addContactHandler = () => {
    let contactsFromJSONcopy = contactsFromJSON;
    
    for (let i = 0; i < contactsFromJSON.length; i++) {
      if (this.state.contacts.includes(contactsFromJSON[i])) {
        contactsFromJSONcopy.splice(i,1);
      }
    }

    let randomIndex = Math.floor(
      Math.random() * (contactsFromJSONcopy.length - 1)
    );

    let randomContact = contactsFromJSONcopy[randomIndex];

    const stateCopy = this.state.contacts;

    stateCopy.push(randomContact);

    this.setState({
      contacts: stateCopy,
    });
  };

  deleteContactHandler = (id) => {
    // copy the state to a new variable
    const stateCopy = this.state.contacts;
    const deleteIndex = stateCopy.findIndex((item) => item.id === id);

    stateCopy.splice(deleteIndex, 1);

    this.setState({
      contacts: stateCopy,
    });
  };

  sortByNameHandler = () => {
    console.log('sorting by name');

    const stateCopy = this.state.contacts;

    stateCopy.sort((a, b) => (a.name > b.name ? 1 : -1));

    this.setState({
      contacts: stateCopy,
    });
  };

  sortByPopularityHandler = () => {
    console.log('sorting by popularity');
    const stateCopy = this.state.contacts;

    stateCopy.sort((a, b) => (a.popularity > b.popularity ? 1 : -1));

    this.setState({
      contacts: stateCopy,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>IronContacts</h1>

          <button onClick={() => this.addContactHandler()}>
            Add Random Contact
          </button>

          <button onClick={() => this.sortByNameHandler()}>Sort by name</button>

          <button onClick={() => this.sortByPopularityHandler()}>
            Sort by popularity
          </button>

          <table>
            <thead>
              <tr>
                <th>
                  <strong>Picture</strong>
                </th>
                <th>
                  <strong>Name</strong>
                </th>
                <th>Popularity</th>
              </tr>
            </thead>

            <tbody>
              {this.state.contacts.map((celeb) => {
                return (
                  <Card
                    key={celeb.id}
                    {...celeb}
                    clickToDelete={() => this.deleteContactHandler(celeb.id)}
                  />
                );
              })}
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default App;

// import json from public folder
// slice to import 5 first contacts
// calculate the random index for the array
