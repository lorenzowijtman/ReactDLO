import _validate from 'validate.js';
import { toast } from 'react-toastify';

const validate = (state, assignments) => {
  // Set validate options
  _validate.options = {
    fullMessages: false,
  };

  // Destructor state object
  const { title, oldTitle, description } = state;

  // Get all course titles
  const assignmentNames = assignments.map(assignment => assignment.name);

  assignmentNames.splice(assignmentNames.indexOf(oldTitle), 1);

  // Set constraints
  const constraints = {
    title: {
      presence: {
        allowEmpty: false,
        message: 'Opdracht titel is leeg.',
      },

      exclusion: {
        within: assignmentNames,
        message: 'Opdracht bestaat al!',
      },
    },

    description: {
      presence: {
        allowEmpty: true,
        message: 'Beschrijving is leeg.',
      },
    },
  };

  // Validate values
  const validateResult = _validate({ title, description }, constraints);

  // Check if validate passed
  if (validateResult) {
    // Error
    // Get first error message
    const message = validateResult[Object.keys(validateResult)[0]][0];

    // Return error object
    return {
      alert: {
        message,
        type: toast.TYPE.ERROR,
        status: true,
      },
    };
  }

  // Good

  // Return validation passed
  return {
    alert: {
      message: '',
      type: toast.TYPE.INFO,
      status: false,
    },
  };
};

export default validate;
