import { Meteor } from 'meteor/meteor';
import assignments from '../imports/api/collections/assignments';
import results from '../imports/api/collections/results';
import courses from '../imports/api/collections/courses';
import images from '../imports/api/collections/images';
import users from '../imports/api/collections/users';

Meteor.startup(() => {
  Meteor.publish('images.getAll', () => images.find());
  Meteor.publish('assignments.get', () => assignments.find());
  Meteor.publish('courses.get', () => courses.find());
  Meteor.publish('results.get', () => results.find());
});
