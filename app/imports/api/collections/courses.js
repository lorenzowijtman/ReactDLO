import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const courses = new Mongo.Collection('courses');

Meteor.methods({
  'courses.add'(obj) {
    return courses.insert(obj);
  },

  'courses.update'(id, obj) {
    courses.update({ _id: id }, obj);
  },

  'courses.getById'(id) {
    return courses.findOne({ _id: id });
  },

  'courses.delete'(id) {
    courses.remove({ _id: id }, 1);
  },
});

export default courses;
