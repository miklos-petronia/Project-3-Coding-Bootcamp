const { users, notes, sharedCategory } = require('./startingData');
const Note = require('../models/Note');
const Share = require('../models/Share');
const User = require('../models/User');
const connection = require('../config/connection');

const cn = 'open';
const re = 'error';

// starting data
const startingData = async () => {
    await User.deleteMany({});
    await Note.deleteMany({});
    await Share.deleteMany({});
    await User.create(users);
    await Note.insertMany(notes);
    await Share.insertMany(sharedCategory);

    // Note find
    // Share find
    const allNotes = await Note.find({});
    const sharedCategories = await Share.find({});

    const notesUser = allNotes.map((data) => {
        return {
            _id: data._id,
            userName: data.userName,
            shared: data.shared,
            category: data.category.toLowerCase()
        }
    })

    // Share findOneAndUpdate
    for (let h = 0; h < sharedCategories.length; h++) {
        await Share.findOneAndUpdate(
            { sharedCategory: sharedCategories[h].sharedCategory },
            { $set: { sharedCategory: sharedCategories[h].sharedCategory.toLowerCase() } },
            { new: true }
        )
    }

    // Share find
    const sharedData = await Share.find({});

    for (let i = 0; i < notesUser.length; i++) {
        // User findOneAndUpdate
        await User.findOneAndUpdate(
            { userName: notesUser[i].userName },
            { $push: { notes: notesUser[i]._id } }
        )

        for (let j = 0; j < sharedData.length; j++) {
            if (notesUser[i].shared === true && notesUser[i].category === sharedData[j].sharedCategory) {
                // User findOneAndUpdate
                await User.findOneAndUpdate(
                    { userName: notesUser[i].userName },
                    { $push: { sharedUserNotes: notesUser[i]._id } }
                )
                // Share findOneAndUpdate
                await Share.findOneAndUpdate(
                    { sharedCategory: notesUser[i].category },
                    { $push: { sharedNotes: notesUser[i]._id } }
                )
            }
        }
    }
    console.info('starting data - added');
    process.exit(0);
}

connection.on(re, (e) => e).once(cn, startingData);