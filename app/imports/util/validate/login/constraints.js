const constraints = {

    email: {
        presence: {
            allowEmpty: false,
            message: 'E-mailadres is leeg.',
        },
        email: {
            message: 'Geef a.u.b. een geldig e-mail adres op.',
        },
    },

    password: {
        presence: {
            allowEmpty: false,
            message: 'Wachtwoord is leeg.',
        }
    }
};

export default constraints;