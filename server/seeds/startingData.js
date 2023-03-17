const users = [
    {
        firstName: "David",
        userName: "drestivo",
        userEmail: "davidr@gmail.com",
        userPwd: "password",
        question: "What is your favorite food?",
        answer: "tacos",
        notes: [],
        sharedUserNotes: []
    }
];

const notes = [
    {
        category: "html",
        noteInput: "link to my project 1 with useful html",
        link: "https://github.com/davidrestivo/project-1-columbia",
        userName: "drestivo",
        shared: false
    },
    {
        category: "css",
        noteInput: "link to my project 2 with some great css",
        link: "https://github.com/davidrestivo/4-Real-Estate",
        userName: "drestivo",
        shared: true
    }
];

const sharedCategory = [
    {
        sharedCategory: 'HTML',
        sharedNotes: []
    },
    {
        sharedCategory: 'CSS',
        sharedNotes: []
    },
    {
        sharedCategory: 'JavaScript',
        sharedNotes: []
    }
]

module.exports = { users, notes, sharedCategory }