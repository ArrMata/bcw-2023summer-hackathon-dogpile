import { Schema } from "mongoose";

export const DogCommentSchema = new Schema({
  content: { type: String, require: true, minLength: 3, maxLength: 150 },
  postId: { type: Schema.Types.ObjectId, required: true, ref: 'DogPost' },
  commentorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
}, {
  timestamps: true, toJSON: { virtuals: true }
})

DogCommentSchema.virtual('post', {
  localField: 'postId',
  foreignField: '_id',
  justOne: true,
  ref: 'DogPost'
})

DogCommentSchema.virtual('commentor', {
  localField: 'commentorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

DogCommentSchema.virtual('commentRating', {
  localField: 'commentorId',
  foreignField: '_id',
  count: true,
  ref: "CommentRating"
})