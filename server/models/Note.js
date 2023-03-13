const { model, Schema } = require('mongoose');

const pt = {
  category: { type: String, trim: true, required: true, minLength: 1, maxLength: 50 },
  noteInput: { type: String, required: true, minLength: 1 },
  link: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now, get: fd },
  userName: { type: String, trim: true, minLength: 1, required: true },
  shared: { type: Boolean, default: false }
};

const opt = { versionKey: false, toJSON: { getters: true, virtuals: true }, id: false };

const NoteS = new Schema(pt, opt);

function fd(createdAt) {
  const date = new Date(createdAt);
  return date.toLocaleString();
};

const Note = model('Note', NoteS);

module.exports = Note;