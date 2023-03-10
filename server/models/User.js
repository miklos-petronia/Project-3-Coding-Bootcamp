const { Schema, model } = require('mongoose');

const pt = {
    email: {
        type: String, trim: true, unique: true, required: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'not valid - please check the email address'],
    },
    username: { type: String, trim: true, unique: true, required: true },
    password: { type: String, required: true, minlength: 4 },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
};

const opt = { versionKey: false, toJSON: { getters: true, virtuals: true }, id: false };

const UserS = new Schema(pt, opt);

const notesCount = function () {
    const { length } = this.notes;
    const noteCount = length.toString();
    return noteCount;
};

UserS.virtual('noteCount').get(notesCount);

const User = model('User', UserS);

module.exports = User;