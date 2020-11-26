import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import AWS from 'aws-sdk';

const images = new Mongo.Collection('images');

if (Meteor.isServer) {
  AWS.config.update({
    accessKeyId: Meteor.settings.awsAccessKeyId,
    secretAccessKey: Meteor.settings.awsSecretKey,
    region: 'eu-central-1',
  });
}

Meteor.methods({
  'images.add'(obj) {
    const imagesArray = images.find({}).fetch();

    const check = imagesArray.every((image) => {
      if (obj.fileName === image.fileName) {
        if (obj.fileType === image.fileType) {
          return false;
        }

        return true;
      }

      return true;
    });

    if (check) {
      return images.insert(obj);
    }

    return false;
  },
  'images.get'(id) {
    return images.find({ _id: id });
  },
  'images.getFiltered'(filter) {
    return images.find({ filter });
  },
  'images.signedRequest'(file, callback) {
    if (!this.isSimulation) {
      file = JSON.parse(file);

      const s3 = new AWS.S3();
      const fileName = file.name;
      const fileType = file.type;
      const s3Params = {
        Bucket: Meteor.settings.awsBucket,
        Key: fileName,
        ContentType: fileType,
        ACL: 'public-read',
      };

      const data = s3.getSignedUrl('putObject', s3Params);

      return {
        signedRequest: data,
        url: `https://${Meteor.settings.awsBucket}.s3.amazonaws.com/${fileName}`,
      };
    }
  },
});

export default images;
