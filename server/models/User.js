const bcrypt = require('bcrypt');
const { model, Schema } = require('mongoose');
const en = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

const pt = {
  firstName: { type: String, minLength: 1, required: true },
  userEmail: { type: String, trim: true, unique: true, required: true, match: [en, 'not valid - email'] },
  userName: { type: String, trim: true, unique: true, minLength: 1, required: true },
  userPwd: { type: String, minLength: 4, required: true },
  question: { type: String, minLength: 1, required: true },
  answer: { type: String, minLength: 1, required: true },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  sharedUserNotes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
};

const opt = { versionKey: false, toJSON: { getters: true, virtuals: true }, id: false };

const UserS = new Schema(pt, opt);

const ntCn = 'notesTotal';
const notesCn = function () {
  const { length } = this.notes;
  const notesTotal = length.toString();
  return notesTotal;
};

const pwdAnswer = 'save';
UserS.pre(pwdAnswer, async function (r) {
  let userAnswer = this.answer;
  let pwdUser = this.userPwd;
  try {
    const pwdRes = {
      response: await bcrypt.hash(userAnswer, 12),
      pwd: await bcrypt.hash(pwdUser, 12)
    }
    this.answer = pwdRes.response;
    this.userPwd = pwdRes.pwd;
    return r();
  } catch (re) {
    throw re
  }
});

UserS.virtual(ntCn).get(notesCn);

UserS.methods.comparePwdAnswer = {
  comparePwd: async function (pwd) {
    let pwdUser = this.userPwd;
    try {
      const res = await bcrypt.compare(pwd, pwdUser)
      return res
    } catch (re) {
      throw re
    }
  },
  compareAnswer: async function (response) {
    let userAnswer = this.answer;
    try {
      const res = await bcrypt.compare(response, userAnswer)
      return res
    } catch (re) {
      throw re
    }
  }
};

const User = model('User', UserS);

module.exports = User;