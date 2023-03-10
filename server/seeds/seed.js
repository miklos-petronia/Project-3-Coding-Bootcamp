const db = require('../config/connection');
const Note = require('../models/Note');
const User = require('../models/User');
const { users, notes } = require('./startingData');

db.once('open', async () => {
    await User.deleteMany({});
    await Note.deleteMany({});

    await User.insertMany(users);
    await Note.insertMany(notes);

    const allNotes = await Note.find({});
    
    const notesUser = allNotes.map((data) => {
        return {
            _id: data._id,
            username: data.username
        }
    })

    for (let i = 0; i < notesUser.length; i++) {
        await User.findOneAndUpdate(
            { username: notesUser[i].username },
            { $push: { notes: notesUser[i]._id } }
        )
    }

    console.info('starting data - added');
    process.exit(0);
});
