import _validate from 'validate.js';

const validate = (state, courses) => {
  // Set validate options
  _validate.options = {
    fullMessages: false,
  };

  // Destructor state object
  const { title, oldTitle, group } = state;

  // Get all course titles
  const coursesNames = courses.map(course => course.name);

  coursesNames.splice(coursesNames.indexOf(oldTitle), 1);

  console.log(coursesNames);

  // Set constraints
  const constraints = {
    title: {
      presence: {
        allowEmpty: false,
        message: 'Cursus titel is leeg.',
      },

      exclusion: {
        within: coursesNames,
        message: 'Cursus bestaat al!',
      },
    },

    group: {
      presence: {
        allowEmpty: false,
        message: 'Groep naam is leeg.',
      },
    },
  };

  // Validate values
  const validateResult = _validate({ title, group }, constraints);

  // Check if validate passed
  if (validateResult) {
    // Error
    // Get first error message
    const message = validateResult[Object.keys(validateResult)[0]][0];

    // Return error object
    return {
      isAlert: true,
      alertMessage: message,
      alertType: 'danger',
    };
  }

  // Good

  // Return validation passed
  return {
    isAlert: false,
    alertMessage: '',
    alertType: '',
  };
};

export default validate;
