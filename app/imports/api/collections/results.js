import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

const results = new Mongo.Collection("results");

Meteor.methods({
  "results.add"(obj) {
    return results.insert(obj);
  },
  "results.count"() {
    return results.find().count();
  },
  "results.getByAssignmentId"(id) {
    console.log(id);
    return results.find({ lessonId: id }).fetch();
  }
});

export default results;
