import localforage from 'localforage'

localforage.config({
  driver: localforage.localStorage,
  name: 'sacco',
  version: 1.0,
  storeName: `saccopermissions`,
  description: `Store JWT tokens and access level`
})

function setLoggedInUserData(loggedInUser) {
  localforage.setItem(`token`, loggedInUser.token)
  localforage.setItem(`accessLevel`, loggedInUser.accessLevel)
}

function getToken() {
  localforage.getItem(`token`).then(token => {
    console.log(token)
    return token
  }).catch( err => {
    console.log(err);
  });
}

function getAccessLevel() {
  localforage.getItem(`accessLevel`).then( accessLevel => {
    console.log(accessLevel)
    return accessLevel
  }).catch(err => {
    console.log(err);
  });
}

function removeLoggedInUserData() {
  localforage.clear().then(() => {
    console.log('Database is now empty.');
}).catch(err => {
    console.log(err);
});
}

export {
  getToken,
  getAccessLevel,
  setLoggedInUserData,
  removeLoggedInUserData
}