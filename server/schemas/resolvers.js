const User = require('../models/User');
const Note = require('../models/Note');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('notes');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('notes');
        },
        notes: async (parent, { username }) => {
            return Note.find({ username });
        },
        note: async (parent, { _id }) => {
            return Note.findOne({ _id: _id });
        },
    },

    Mutation: {

        createUser: async (parent, { username, email, password }) => {
            const newUser = await User.create({ username, email, password });
            return newUser;
        },

        postNote: async (parent, { category, text, link, username }) => {
            const note = await Note.create({ category, text, link, username });

            await User.findOneAndUpdate(
                { username: username },
                { $push: { notes: note._id } }
            );

            return note;
        },

        updateNote: async (parent, { category, text, link, _id }) => {
            return await Note.findOneAndUpdate(
                { _id: _id },
                { $set: { category: category, text: text, link: link } },
                { new: true }
            );
        },

        removeNote: async (parent, { _id }) => {
            const noteRemoved = await Note.findOneAndDelete({ _id: _id })
            await User.findOneAndUpdate(
                { username: noteRemoved.username },
                { $pull: { notes: _id } }
            );
            return noteRemoved;
        }
    },
};

module.exports = resolvers;