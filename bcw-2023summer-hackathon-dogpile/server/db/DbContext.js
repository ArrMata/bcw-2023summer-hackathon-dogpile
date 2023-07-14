import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { DogPostSchema } from "../models/DogPost.js";
import { DogCommentSchema } from "../models/DogComment.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  DogPosts = mongoose.model('DogPost', DogPostSchema);

  DogComments = mongoose.model('DogComment', DogCommentSchema);
}

export const dbContext = new DbContext()
