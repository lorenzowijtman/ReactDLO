import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const assignments = new Mongo.Collection('assignments');

Meteor.methods({
  'assignments.add'(obj) {
    return assignments.insert(obj);
  },
  'assignments.byId'(taskIds) {
    let assignmentsArray = [];
    assignmentsArray = assignments.find({ _id: { $in: taskIds } });

    return assignmentsArray.fetch();
  },
  'assignment.getById'(id) {
    return assignments.findOne({ _id: id });
  },
  'assignment.update'(id, obj) {
    assignments.update({ _id: id }, obj);
  },

  'assignment.delete'(id) {
    assignments.remove({ _id: id }, 1);
  },

  'assignment.count'() {
    return assignments.find({status: {$eq: true}}).count();
  }
});

export default assignments;
