const { tokenUser } = require('../utils/auth');
const Share = require('../models/Share');
const Note = require('../models/Note');
const User = require('../models/User');

const notesData = 'notes';
const sharedUserNotes = 'sharedUserNotes';
const sharedAllNotes = 'sharedNotes';

// Note findOne (id)
async function getNoteById(_, { _id }) {
  let data;
  const idN = { _id: _id };
  try {
    data = await Note.findOne(idN);
    switch (true) {
      case (!data):
        return
      default:
        return data
    }
  } catch (re) { throw re }
}

// Note find (userName)
async function getNotesByUser(_, { userName }) {
  let data;
  const nm = { userName: userName };
  try {
    data = await Note.find(nm);
    switch (true) {
      case (!data):
        return
      default:
        return data
    }
  } catch (re) { throw re }
}

// Share findOne (sharedCategory)
async function sharedNote(_, { sharedCategory }) {
  let data;
  try {
    data = await Share.findOne({ sharedCategory: sharedCategory.toLowerCase() }).populate(sharedAllNotes);
    switch (true) {
      case (!data):
        return
      default:
        return data
    }
  } catch (re) { throw re }
}

// Share find
async function sharedNotes() {
  let data;
  try {
    data = await Share.find().populate(sharedAllNotes);
    switch (true) {
      case (!data):
        return
      default:
        return data
    }
  } catch (re) { throw re }
}

// User findOne
async function getUser(_, { userName }) {
  let data;
  const nm = { userName: userName };
  try {
    data = await User.findOne(nm).populate(sharedUserNotes).populate(notesData);
    switch (true) {
      case (!data):
        return
      default:
        return data
    }
  } catch (re) { throw re }
}

// User find
async function getAllUsers() {
  let data;
  try {
    data = await User.find().populate(sharedUserNotes).populate(notesData);
    switch (true) {
      case (!data):
        return
      default:
        return data
    }
  } catch (re) { throw re }
}

// post user note
// Note create
async function postUserNote(_, { category, noteInput, link, userName, shared }) {
  let data;
  const input = { category, noteInput, link, userName, shared };
  const nm = { userName: userName };
  try {
    data = await Note.create(input);
    switch (true) {
      case (!data):
        return
      default:
        await User.findOneAndUpdate(nm, { $push: { notes: data._id } });
        if (shared === true) {
          await User.findOneAndUpdate(nm, { $push: { sharedUserNotes: data._id } });
          await Share.findOneAndUpdate({ sharedCategory: category.toLowerCase() }, { $push: { sharedNotes: data._id } })
        }
        return data
    }
  } catch (re) { throw re }
}

// update user note
// Note findOneAndUpdate
async function updateUserNote(_, { category, noteInput, link, _id }) {
  try {
    await Note.findOneAndUpdate({ _id: _id }, { $set: { category: category, noteInput: noteInput, link: link } }, { new: true });
    const findSharedId = await Share.findOne({}, { sharedNotes: { $elemMatch: { _id: _id } } });
    const findShared = await Share.findOne({ _id: findSharedId._id });

    if (category.toLowerCase() != findShared.sharedCategory) {
      await Share.findOneAndUpdate({ _id: findSharedId._id }, { $pull: { sharedNotes: _id } });
      const note = await Note.findOneAndUpdate({ _id: _id }, { $set: { shared: false } });
      await User.findOneAndUpdate({ userName: note.userName }, { $pull: { sharedUserNotes: _id } });
    };

    const data = Note.findOne({ _id: _id });
    switch (true) {
      case (!data):
        return
      default:
        return data
    }
  } catch (re) { throw re }
}

// delete note
// Note findOneAndDelete
async function deleteUserNote(_, { _id }) {
  let data;
  try {
    data = await Note.findOneAndDelete({ _id: _id });
    switch (true) {
      case (!data):
        return
      default:
        await User.findOneAndUpdate({ userName: data.userName }, { $pull: { notes: _id } });
        const findShare = await Share.findOne({}, { sharedNotes: { $elemMatch: { _id: _id } } });
        await Share.findOneAndUpdate({ _id: findShare._id }, { $pull: { sharedNotes: _id } }
        )
        return data
    }
  } catch (re) { throw re }
}

// share note
async function noteShare(_, { _id }) {
  try {
    const note = await Note.findOneAndUpdate({ _id: _id }, { $set: { shared: true } }, { new: true });
    await User.findOneAndUpdate({ userName: note.userName }, { $push: { sharedUserNotes: note._id } })

    const fnd = await Share.findOne({ sharedCategory: note.category.toLowerCase() });
    if (!fnd) {
      const dataCreate = (await Share.create({ sharedCategory: note.category.toLowerCase(), sharedNotes: [note._id] })).populate(sharedAllNotes);
      return dataCreate
    } else {
      const data = await Share.findOneAndUpdate({ sharedCategory: fnd.sharedCategory }, { $push: { sharedNotes: note._id } }, { new: true }).populate(sharedAllNotes);
      return data
    }

  } catch (re) { throw re }
}

// sign in
async function firstSignIn(_, { userName, userPwd }) {
  let data;
  const nm = { userName };
  try {
    data = await User.findOne(nm).populate(sharedUserNotes).populate(notesData);
    switch (true) {
      case (data && (await data.comparePwdAnswer.comparePwd(userPwd))):
        return data;
      default:
        throw new Error('not valid');
    }
  } catch (re) {
    throw re
  }
}

// additional - sign in
async function secondSignIn(_, { userName, answer }) {
  let data;
  const nm = { userName };
  try {
    data = await User.findOne(nm).populate(sharedUserNotes).populate(notesData);
    switch (true) {
      case (data && (await data.comparePwdAnswer.compareAnswer(answer))):
        const authUser = data;
        const userToken = tokenUser(data);
        return { authUser, userToken };
      default:
        throw new Error('not valid');
    }
  } catch (re) {
    throw re
  }
}

// User create
async function createNewUser(_, { firstName, userEmail, userName, userPwd, question, answer }) {
  let authUser;
  let userToken;
  const input = { firstName, userEmail, userName, userPwd, question, answer };
  try {
    authUser = await User.create(input);
    switch (true) {
      case (!authUser):
        return
      default:
        userToken = tokenUser(authUser);
        if (!userToken) { return };
        return { authUser, userToken }
    }
  } catch (re) { throw new Error('not valid - try again') }
}

const resolvers = {
  Query: {
    noteOne: getNoteById,
    notesAll: getNotesByUser,
    sharedOne: sharedNote,
    sharedAll: sharedNotes,
    userOne: getUser,
    usersAll: getAllUsers,
  },

  Mutation: {
    postNote: postUserNote,
    updateNote: updateUserNote,
    deleteNote: deleteUserNote,
    shareUserNote: noteShare,
    signIn: firstSignIn,
    additionalSignIn: secondSignIn,
    createUser: createNewUser
  },
};

module.exports = resolvers;