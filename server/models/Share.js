const { model, Schema } = require('mongoose');

const pt = {
    sharedCategory: { type: String, trim: true, unique: true, required: true, minLength: 1, maxLength: 50 },
    sharedNotes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
};

const opt = { versionKey: false, toJSON: { getters: true, virtuals: true }, id: false };

const ShareS = new Schema(pt, opt);

const Share = model('Share', ShareS);

module.exports = Share;