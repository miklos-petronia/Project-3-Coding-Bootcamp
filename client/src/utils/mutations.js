import { gql } from '@apollo/client';

export const MUTATION_POST_NOTE = gql`
mutation PostNote($category: String!, $noteInput: String!, $userName: String!, $link: String, $shared: Boolean) {
  postNote(category: $category, noteInput: $noteInput, userName: $userName, link: $link, shared: $shared) {
    _id
    category
    noteInput
    link
    createdAt
    userName
    shared
  }
}
`

export const MUTATION_UPDATE_NOTE = gql`
mutation UpdateNote($id: ID!, $category: String, $noteInput: String, $link: String) {
  updateNote(_id: $id, category: $category, noteInput: $noteInput, link: $link) {
    _id
    category
    noteInput
    link
    createdAt
    userName
    shared
  }
}
`

export const MUTATION_DELETE_NOTE = gql`
mutation DeleteNote($id: ID!) {
  deleteNote(_id: $id) {
    _id
    category
    noteInput
    link
    createdAt
    userName
    shared
  }
}
`

export const MUTATION_SHARE_USER_NOTE = gql`
mutation ShareUserNote($id: ID!) {
  shareUserNote(_id: $id) {
    _id
    sharedCategory
    sharedNotes {
      _id
      category
      noteInput
      link
      createdAt
      userName
      shared
    }
  }
}
`

export const MUTATION_CREATE_USER = gql`
mutation CreateUser($firstName: String!, $userEmail: String!, $userName: String!, $userPwd: String!, $question: String!, $answer: String!) {
  createUser(firstName: $firstName, userEmail: $userEmail, userName: $userName, userPwd: $userPwd, question: $question, answer: $answer) {
    userToken
    authUser {
      _id
      firstName
      userEmail
      userName
      notes {
        _id
        category
        noteInput
        link
        createdAt
        userName
        shared
      }
      sharedUserNotes {
        _id
        category
        noteInput
        link
        createdAt
        userName
        shared
      }
      notesTotal
    }
  }
}
`

export const MUTATION_FIRST_SIGN_IN = gql`
mutation SignIn($userName: String!, $userPwd: String!) {
  signIn(userName: $userName, userPwd: $userPwd) {
    _id
    firstName
    userEmail
    userName
    question
    notes {
      _id
      category
      noteInput
      link
      createdAt
      userName
      shared
    }
    sharedUserNotes {
      _id
      category
      noteInput
      link
      createdAt
      userName
      shared
    }
    notesTotal
  }
}
`

export const MUTATION_ADDITIONAL_SIGN_IN = gql`
mutation AdditionalSignIn($userName: String!, $answer: String!) {
  additionalSignIn(userName: $userName, answer: $answer) {
    userToken
    authUser {
      _id
      firstName
      userEmail
      userName
      notes {
        _id
        category
        noteInput
        link
        createdAt
        userName
        shared
      }
      sharedUserNotes {
        _id
        category
        noteInput
        link
        createdAt
        userName
        shared
      }
      notesTotal
    }
  }
}
`