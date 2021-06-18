import * as express from "express"
import { Model } from "mongoose"

interface IBook {
    id: string,
    title: string,
    author: string
}

interface IBookModel extends Model<IBook> {}

interface MyDB {
    books: IBookModel
}

interface MyExApp extends express.Application {
    db: MyDB
}
