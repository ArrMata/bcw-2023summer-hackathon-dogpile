import { Schema } from "mongoose";

export const DogPostSchema = new Schema({
  caption: { type: String, required: true, minlength: 3, maxlength: 30 },
  pictureUrl: { type: String, required: true, maxlength: 1000 },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

DogPostSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

DogPostSchema.virtual('commentCount', {
  localField: '_id',
  foreignField: 'dogPostId',
  justOne: true,
  // ref: 'Commenter'    **REVIEW - review this at it may need changed
})
// below needs reviewed as they will be booleans with default false, but you can only pick one or the other

DogPostSchema.virtual('likeCount', {
  localField: '_id',
  foreignField: 'dogPostId',
  // ref: 'Commenter',
  count: true
})
DogPostSchema.virtual('dislikeCount', {
  localField: '_id',
  foreignField: 'dogPostId',
  // ref: 'Commenter',
  count: true
})