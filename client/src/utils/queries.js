import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
query UsersAll {
  usersAll {
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
`

export const QUERY_ONE_USER = gql`
query UserOne($userName: String!) {
  userOne(userName: $userName) {
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
`

export const QUERY_NOTES_BY_USER = gql`
query NotesAll($userName: String!) {
  notesAll(userName: $userName) {
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

export const QUERY_NOTE_BY_ID = gql`
query NoteOne($id: ID!) {
  noteOne(_id: $id) {
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
export const QUERY_SHARED_NOTES_ALL = gql`
query SharedAll {
  sharedAll {
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

export const QUERY_SHARED_NOTE_BY_CATEGORY = gql`
query SharedOne($sharedCategory: String!) {
  sharedOne(sharedCategory: $sharedCategory) {
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