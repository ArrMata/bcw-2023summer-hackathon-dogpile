import { Schema } from "mongoose";

export const DogPostSchema = new Schema({
  caption: { type: String, required: true, minlength: 3, maxlength: 30 },
  pictureUrl: { type: String, required: true, maxlength: 1000 },
  posterId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

DogPostSchema.virtual('poster', {
  localField: 'posterId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

DogPostSchema.virtual('commentCount', {
  localField: '_id',
  foreignField: 'postId',
  count: true,
  ref: 'DogComment'
})
// below needs reviewed as they will be booleans with default false, but you can only pick one or the other

DogPostSchema.virtual('likeCount', {
  localField: '_id',
  foreignField: 'postId',
  ref: 'DogRating',
  count: true
})
DogPostSchema.virtual('dislikeCount', {
  localField: '_id',
  foreignField: 'postId',
  ref: 'DogRating',
  count: true
})