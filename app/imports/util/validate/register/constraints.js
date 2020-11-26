// https://validatejs.org for docs

const constraints = {
  username: {
    presence: {
      allowEmpty: false,
      message: 'Gebruikersnaam is leeg.',
    },
  },

  email: {
    presence: {
      allowEmpty: false,
      message: 'E-mailadres is leeg.',
    },
    email: {
      message: 'Geef a.u.b. een geldig e-mail adres op.',
    },
  },

  firstname: {
    presence: {
      allowEmpty: false,
      message: 'Voornaam is leeg.',
    },
  },

  lastname: {
    presence: {
      allowEmpty: false,
      message: 'Achternaam is leeg.',
    },
  },

  password: {
    presence: {
      allowEmpty: false,
      message: 'Wachtwoord is leeg.',
    },
  },

  passwordRepeat: {
    equality: {
      attribute: 'password',
      message: 'Wachtwoorden komen niet overeen.',
    },
  },
};

export default constraints;
