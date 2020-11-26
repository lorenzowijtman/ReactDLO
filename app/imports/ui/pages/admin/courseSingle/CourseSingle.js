import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import './Style.scss';
import Alert from '../../../components/general/alert/Alert';
import assignments from '../../../../api/collections/assignments';
import courses from '../../../../api/collections/courses';
import CourseDetailTable from '../../../components/admin/courseDetailTable/CourseDetailTable';
import validate from './validate';
import AssignmentSelector from '../../../components/admin/assignmentSelector/AssignmentSelector';

class CourseSingle extends Component {
  constructor(props) {
    super(props);

    const isUpdate = !!this.props.match.params.id;

    this.state = {
      title: '',
      oldTitle: '',
      group: '',
      status: false,
      isAlert: false,
      alertMessage: '',
      alertType: 'error',
      userSelectedAssignments: [],
      assignmentSelectorIsHidden: true,
      isUpdate,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.addAssignments = this.addAssignments.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.removeAssignment = this.removeAssignment.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    if (id) {
      Meteor.call('courses.getById', id, (error, result) => {
        const {
          name, group, assignments, status,
        } = result;
        this.setState({
          title: name,
          oldTitle: name,
          group,
          status,
        });

        this.addAssignments(assignments);

        this.props.updateTitle(name);
        this.props.updateTitleType(false);
      });
    } else {
      this.props.updateTitle('');
      this.props.updateTitleType(false);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.state) {
      const { isUpdate } = this.props.location.state;

      if (isUpdate) {
        this.setState({
          isUpdate,
        });
      }

      this.props.location.state = {};
    }

    if(prevState.title !== prevProps.getTitle()) {
      this.setState({
        title: prevProps.getTitle(),
      });
    }
  }

  handleInput(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    // Validate fields
    const formError = validate(this.state, this.props.courses);

    // Set state with result from validation
    this.setState(formError);

    if (formError.isAlert) {
      // If error stop submit
      return;
    }

    // Destructor state
    const { title, group } = this.state;

    // Check if published is clicked
    const status = e.target.name === 'publish';

    // Get all the assignments that are added to the course
    const assignmentsId = this.state.userSelectedAssignments.map(item => item._id);

    // Setup the object
    const courseObject = {
      name: title,
      status,
      group,
      assignments: assignmentsId,
    };

    // Send course object to server
    if (this.state.isUpdate) {
      Meteor.call('courses.update', this.props.match.params.id, courseObject, (error) => {
        if (!error) {
          this.setState({
            isAlert: true,
            alertType: 'success',
            alertMessage: 'Cursus is geupdate!',
            status,
          });
        }
      });
    } else {
      Meteor.call('courses.add', courseObject, (error, result) => {
        if (!error) {
          this.setState({
            isAlert: true,
            alertType: 'success',
            alertMessage: 'Cursus is toegevoegd!',
            status,
          });

          this.props.history.push({
            pathname: `/admin/cursussen/${result}`,
            state: { isUpdate: true },
          });
        }
      });
    }
  }

  addAssignments(items) {
    const assignments = Meteor.apply(
      'assignments.byId',
      [items],
      { returnStubValue: true },
      (err, serverResult) => {
        this.setState({
          userSelectedAssignments: serverResult,
        });
      },
    );
  }

  toggleModal() {
    this.setState(prevState => ({
      assignmentSelectorIsHidden: !prevState.assignmentSelectorIsHidden,
    }));
  }

  handleSelect(e) {
    const { value, checked } = e.target;
    const { userSelectedAssignments } = this.state;

    if (checked) {
      this.addAssignment(value);
    } else {
      this.removeAssignment(value);
    }
  }

  addAssignment(id) {
    const assignmentList = this.state.userSelectedAssignments;

    this.props.assignments.forEach((assignment) => {
      if (assignment._id === id) {
        assignmentList.push(assignment);
      }
    });

    this.setState({
      userSelectedAssignments: assignmentList,
    });
  }

  removeAssignment(id) {
    const assignmentList = this.state.userSelectedAssignments;

    const index = assignmentList.findIndex(item => item._id === id);

    assignmentList.splice(index, 1);

    this.setState({
      userSelectedAssignments: assignmentList,
    });
  }

  closeAlert() {
    this.setState({
      isAlert: false,
      alertType: '',
      alertMessage: '',
    });
  }

  deleteCourse() {
    if (!this.state.isUpdate) {
      this.setState({
        isAlert: true,
        alertType: 'notice',
        alertMessage: 'Cursus is nog niet gepubliceerd!',
      });

      return;
    }

    if (confirm('Weet u het zeker?')) {
      Meteor.call('courses.delete', this.props.match.params.id, (error) => {
        if (error) {
          console.log(error);
          this.setState({
            isAlert: true,
            alertType: 'danger',
            alertMessage: 'Er is iets misgegaan',
          });
        } else {
          this.setState({
            isAlert: true,
            alertType: 'success',
            alertMessage: 'Cursus is verwijderd (U wordt binnen 3 seconden doorverwezen)',
          });

          setTimeout(() => {
            this.props.history.push('/admin/cursussen');
          }, 3000);
        }
      });
    }
  }

  render() {
    return (
      <div className="course-add">
        <Alert
          type={this.state.alertType}
          message={this.state.alertMessage}
          isShowAlert={this.state.isAlert}
          onClose={this.closeAlert}
        />
        <AssignmentSelector
          assignments={this.props.assignments}
          userSelected={this.state.userSelectedAssignments}
          isHidden={this.state.assignmentSelectorIsHidden}
          onClose={this.toggleModal}
          onSelect={this.handleSelect}
        />
        <div className="left-column">
          <div className="course-title-container">
            <label>Cursussen titel</label>
          </div>
          <CourseDetailTable
            dataList={this.state.userSelectedAssignments}
            onDelete={this.removeAssignment}
          />
          <button onClick={this.toggleModal}>Opdracht toevoegen</button>
        </div>
        <div className="right-column">
          <div className="settings">
            <h3>Instellingen</h3>
            <label>Status: {this.state.status ? 'Gepubliceerd' : 'Niet gepubliceerd'}</label>
            <label>
              Groep:
              <input
                type="text"
                name="group"
                onChange={this.handleInput}
                value={this.state.group}
              />
            </label>
            <button name="publish" onClick={this.handleSubmit}>
              {this.state.isUpdate ? 'Update' : 'Publiceren'}
            </button>
            <button name="concept" onClick={this.handleSubmit}>
              Opslaan als concept
            </button>
          </div>

          <div className="delete">
            <h3>Verwijderen</h3>
            <p>Cursus verwijderen?</p>
            <button disabled={!this.state.isUpdate} onClick={this.deleteCourse}>
              Verwijderen
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('assignments.get');
  Meteor.subscribe('courses.get');

  return {
    assignments: assignments.find({}).fetch(),
    courses: courses.find({}).fetch(),
  };
})(CourseSingle);
