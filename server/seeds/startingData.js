const users = [
    {
        username: "drestivo",
        email: "davidr@gmail.com",
        password: "Bootcamp@2",
        notes: []
    },
    {
        username: "jamesC",
        email: "jamesc@hotmail.com",
        password: "Bootcamp@3",
        notes: []
    }
];

const notes = [
    {
        category: "html",
        text: "link to my project 1 with useful html",
        link: " https://github.com/davidrestivo/project-1-columbia ",
        username: "drestivo"
    },
    {
        category: " css ",
        text: "link to my project 2 with some great css",
        link: "https://github.com/davidrestivo/4-Real-Estate",
        username: "jamesC"
    }
];

module.exports = { users, notes }