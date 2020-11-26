import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import image from '../../../../util/image/image';
import images from '../../../../api/collections/images';
import './style.scss';

class UploadManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      activeView: 'overview',
      selectedImage: '',
    };

    this.switchToOverview = this.switchToOverview.bind(this);
    this.switchToUpload = this.switchToUpload.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.close = this.close.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  switchToOverview(e) {
    if(e) {
      e.preventDefault();
    }
    if (this.state.activeView === 'overview') {
      return;
    }

    this.setState({
      activeView: 'overview',
    });
  }

  switchToUpload(e) {
    if(e) {
      e.preventDefault();
    }
    if (this.state.activeView === 'upload') {
      return;
    }

    this.setState({
      activeView: 'upload',
    });
  }

  handleDrop(e) {
    e.preventDefault();

    image.upload(e.dataTransfer.items[0].getAsFile(), (uploadObject) => {
      const { url } = uploadObject;

      this.setState({
        url,
      });

      this.switchToOverview();
    });
  }

  handleDropOver(e) {
    e.preventDefault();

    e.target.style.border = "1px solid #000";
  }

  inputHandler(event) {
    const file = event.target.files[0];

    image.upload(file, (uploadObject) => {
      const { url } = uploadObject;

      this.setState({
        url,
      });

      this.switchToOverview();
    });
  }

  selectImage(e) {
    e.preventDefault();
    const { value } = e.target;
    this.setState({
      selectedImage: value,
    });
  }

  close(e) {
    e.preventDefault();
    if (this.state.selectedImage){
      this.props.onClose(this.state.selectedImage);
    } else {
      this.props.onClose(null);
    }
  }

  render() {
    const renderOverview = this.props.images.map(image => (
      <li key={image._id} className="overview-item">
        <label>
          <input type="radio" onChange={this.selectImage} name="image" value={image.url} />
          <img src={image.url} />
        </label>
      </li>
    ));
    const activeView =
      this.state.activeView === 'overview' ? (
        <section className="upload-manager-overview">
          <ul>{renderOverview}</ul>
        </section>
      ) : (
        <section className="upload-manager-upload">
          <div className="drop-zone" onDragOver={this.handleDropOver} onDrop={this.handleDrop}>
            <span>Sleep Afbeelding</span>
          </div>
          <label className="secondary-btn" htmlFor="upload-file">
            Bestand kiezen
          </label>
          <input onChange={this.inputHandler} type="file" id="upload-file" />
        </section>
      );

    return (
      <div
        style={{ display: this.props.show ? 'block' : 'none' }}
        className="upload-manager-container"
      >
        <div className="overlay" />
        <div className="upload-manager-positioner">
          <div className="upload-manager">
            <header>
              <ul>
                <li className="left">
                  <button
                    className={this.state.activeView === 'overview' ? 'active' : ''}
                    onClick={this.switchToOverview}
                  >
                    Media
                  </button>
                </li>
                <li className="left">
                  <button
                    className={this.state.activeView === 'upload' ? 'active' : ''}
                    onClick={this.switchToUpload}
                  >
                    Upload
                  </button>
                </li>
                <li className="right">
                  <button className="close" onClick={this.close}>
                    Sluiten
                  </button>
                </li>
              </ul>
            </header>
            {activeView}
            <footer>
              <button onClick={this.close}>Afbeelding gebruiken</button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('images.getAll');

  return {
    images: images.find({}).fetch(),
  };
})(UploadManager);
