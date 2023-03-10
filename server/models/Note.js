const { Schema, model } = require('mongoose');

const pt = {
  category: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  text: { type: String, required: true, trim: true, minlength: 1 },
  link: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now, get: formatDate },
  username: { type: String, required: true }
};

const opt = { versionKey: false, toJSON: { getters: true, virtuals: true }, id: false };

const NoteS = new Schema(pt, opt);

function formatDate(createdAt) {
  const date = new Date(createdAt);
  return date.toLocaleString();
};

const Note = model('Note', NoteS);

module.exports = Note;