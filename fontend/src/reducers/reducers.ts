import {
  combineReducers
} from 'redux';

import  { books, Book } from '../model/books';

export interface Reducers {
  books: Book[]
}

export const reducers = combineReducers({
    books,
})