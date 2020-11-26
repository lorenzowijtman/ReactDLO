import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import shortid from 'shortid';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';

import './Style.scss';
import assignments from '../../../../api/collections/assignments';
import validate from './validate';
import QuestionBlock from '../../../components/admin/questionBlock/QuestionBlock';
import UploadManager from '../../../components/admin/uploadManager/UploadManager';
import VideoBox from '../../../components/admin/videoBox/VideoBox';
import MultipleChoicePictureBlock from '../../../components/admin/multipleChoicePictureBlock/MultipleChoicePictureBlock';

class AssignmentSingle extends Component {
  constructor(props) {
    super(props);

    const isUpdate = !!this.props.match.params.id;

    this.state = {
      title: '',
      oldTitle: '',
      description: '',
      status: false,
      alert: {
        message: '',
        type: toast.TYPE.INFO,
        status: false,
      },
      isUpdate,
      questions: [],
      highlightedImage: 'http://via.placeholder.com/250x250',
      difficulty: 1,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.getQuestionsData = this.getQuestionsData.bind(this);
    this.openUploadModal = this.openUploadModal.bind(this);
    this.closeUploadModal = this.closeUploadModal.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    if (id) {
      Meteor.call('assignment.getById', id, (error, result) => {
        console.log(result);
        const {
          name, description, status, visibilty, questions, questionBlocks, highlightedImage, difficulty,
        } = result;
        this.setState({
          title: name,
          oldTitle: name,
          description,
          status,
          visibilty,
          questions,
          questionBlocks,
          highlightedImage,
          difficulty,
        });

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

    if (prevState.title !== prevProps.getTitle()) {
      this.setState({
        title: prevProps.getTitle(),
      });
    }

    if (prevState.alert !== this.state.alert && this.state.alert.status !== false) {
      console.log(this.state.alert);
      const { message, type } = this.state.alert;
      toast(message, { type });
    }
  }

  handleInput(e) {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const formError = validate(this.state, this.props.assignments);

    this.setState(formError);

    if (formError.alert.status) {
      return;
    }

    // https://validatejs.org/#utilities-capitalize

    const {
      title, description, questions, highlightedImage, difficulty,
    } = this.state;

    const status = e.target.name === 'publish';

    const assignmentObject = {
      name: title,
      description,
      status,
      questions,
      highlightedImage,
      difficulty,
    };

    if (this.state.isUpdate) {
      Meteor.call('assignment.update', this.props.match.params.id, assignmentObject, (error) => {
        if (!error) {
          this.setState({
            alert: {
              message: 'Les is geupdate',
              type: toast.TYPE.SUCCESS,
              status: true,
            },
          });
        }
      });
    } else {
      Meteor.call('assignments.add', assignmentObject, (error, result) => {
        if (error) {
          this.setState({
            alert: {
              message: 'Er is iets fout gegaan',
              type: toast.TYPE.ERROR,
              status: true,
            },
          });
        } else {
          this.setState({
            alert: {
              message: 'Les is toegevoegd!',
              type: toast.TYPE.SUCCESS,
              status: true,
            },
          });

          this.props.history.push({
            pathname: `/admin/lessen/${result}`,
            state: { isUpdate: true },
          });
        }
      });
    }
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
        alert: {
          message: 'Les is nog niet gepubliceerd!',
          type: toast.TYPE.WARNING,
          status: true,
        },
      });

      return;
    }

    if (confirm('Weet u het zeker?')) {
      Meteor.call('assignment.delete', this.props.match.params.id, (error) => {
        if (error) {
          this.setState({
            alert: {
              message: 'Er is iets misgegaan',
              type: toast.TYPE.ERROR,
              status: true,
            },
          });
        } else {
          this.setState({
            alert: {
              message: 'Les is verwijderd (U wordt binnen 3 seconden doorverwezen)',
              type: toast.TYPE.SUCCESS,
              status: true,
            },
          });

          setTimeout(() => {
            this.props.history.push('/admin/lessen');
          }, 3000);
        }
      });
    }
  }

  getQuestionsData(data) {
    const { questions } = data;

    this.setState({
      questions,
    });
  }

  openUploadModal() {
    if (this.state.showMediaModal) {
      return;
    }

    this.setState({
      showMediaModal: true,
    });
  }

  closeUploadModal(url) {
    console.log(url);

    this.setState({
      highlightedImage: url,
      showMediaModal: false,
    });
  }

  render() {
    return (
      <div className="layout layout--assignment-single">
        <div className="layout layout--assignment-single--assignments">
          <QuestionBlock
            data={{ questions: this.state.questions }}
            onChange={this.getQuestionsData}
          />
        </div>
        <aside className="layout--assignment-single--sidebar">
          <div className="block block--admin layout--assignment-single--settings">
            <h3 className="block__title">Instellingen</h3>
            <p>
              <span className="bold" style={{ marginRight: '10px' }}>Status:</span>
              {this.state.status ? 'Gepubliceerd' : 'Niet gepubliceerd'}
            </p>
            <p>
              <span className="bold" style={{ marginRight: '10px' }}>Niveau:</span>
              <select value={this.state.difficulty} name="difficulty" onChange={this.handleInput}>
                <option value="1">Makkelijk</option>
                <option value="2">Normaal</option>
                <option value="3">Moeilijk</option>
              </select>
            </p>
            <button name="publish" className="button button--primary button--spacing" onClick={this.handleSubmit}>
              {this.state.isUpdate ? 'Update' : 'Publiceren'}
            </button>
            <button name="concept" className="button button--secondary" onClick={this.handleSubmit}>
              Opslaan als concept
            </button>
          </div>
          <div className="block block--admin layout--assignment-single--description">
            <h3 className="block__title">Beschrijving</h3>
            <textarea
              className="input input--textarea"
              type="text"
              onChange={this.handleInput}
              name="description"
              value={this.state.description}
              rows="10"
              cols="50"
            />
          </div>
          <div className="block block--admin layout--assignment-single--description">
            <h3 className="block__title">Uitgelichte afbeelding</h3>
            <div style={{ marginBottom: '30px' }}>
              <img src={this.state.highlightedImage} alt="highlighted" style={{ maxWidth: '300px' }} />
            </div>
            <button onClick={this.openUploadModal} className="button button--primary">Kies afbeelding</button>
          </div>
          <div className="block block--admin layout--assignment-single--delete">
            <h3 className="block__title">Verwijderen</h3>
            <p>Groep verwijderen?</p>
            <button className="button button--primary" onClick={this.deleteCourse}>
              Verwijderen
            </button>
          </div>
        </aside>
        <UploadManager show={this.state.showMediaModal} onClose={(url) => { this.closeUploadModal(url); }} />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('assignments.get');

  return {
    assignments: assignments.find({}).fetch(),
  };
})(AssignmentSingle);
