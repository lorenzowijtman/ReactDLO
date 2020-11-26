import NProgress from 'nprogress';
import './nprogress.css';

const extensionLists = {};
extensionLists.image = ['jpg', 'gif', 'bmp', 'png'];

const isValidFileType = (fName, fType) =>
  extensionLists[fType].indexOf(fName.split('.').pop()) > -1;

const image = {
  _uploadToAWS(file, signedRequest, url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    NProgress.inc();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        NProgress.inc();
        if (xhr.status === 200) {
          NProgress.inc();
          const uploadObject = {
            url,
            fileName: file.name,
            fileType: file.type,
            signedRequest,
          };

          Meteor.call('images.add', uploadObject);

          callback(uploadObject);
        }
      }
    };
    xhr.send(file);
  },

  _getSignedRequest(file, callback) {
    const object = {
      name: file.name,
      type: file.type,
    };

    const string = JSON.stringify(object);

    Meteor.call('images.signedRequest', string, (err, res) => {
      if (err) {
        NProgress.remove();
        throw err;
      }

      NProgress.inc();
      this._uploadToAWS(file, res.signedRequest, res.url, (uploadObject) => {
        NProgress.inc();
        callback(uploadObject);
      });
    });
  },

  upload(file, callback) {
    NProgress.start();

    // 2mb file size limit
    const fileSizeLimit = 2e6;

    // if (file.size >= fileSizeLimit) {
    //   // TODO add errors
    //   return false;
    // }

    // if (!isValidFileType(file.name, file.type)) {
    //   return false;
    // }

    if (file.type) {
      this._getSignedRequest(file, (uploadObject) => {
        NProgress.done();
        console.log(uploadObject);
        callback(uploadObject);
      });
    }
  },
};

export default image;
