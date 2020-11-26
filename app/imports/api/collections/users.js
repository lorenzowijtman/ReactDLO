import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'users.countStudents'() {
    console.log(Meteor.users.find({ 'profile.isAdmin': null }).count());
    return Meteor.users.find({ 'profile.isAdmin': null }).count();
  },

  userUpdate (id, username, email, firstname, lastname) {
    Accounts.setUsername(id, username);

    const oldEmail = Meteor.users.findOne(this.userId).emails[0].address;
    Accounts.removeEmail(id, oldEmail);
    Accounts.addEmail(id, email);

    // Update account
    Meteor.users.update(id, {
      $set: {
        'profile.firstname': firstname,
        'profile.lastname': lastname,
      },
    });

    return true;
  },

  changeUserPassword (id, newpassword) {
    Accounts.setPassword(id, newpassword);
  },

  onDeleteUserAccount (id) {
    Meteor.users.remove(id);
  },
});

function countUsers() {

}
