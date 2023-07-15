import { Schema } from "mongoose";

export const DogRatingSchema = new Schema({
  impression: { type: Boolean, required: true, },
  postId: { type: Schema.Types.ObjectId, required: true, ref: 'DogPost' },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
}, { timestamps: true, toJSON: { virtuals: true } })

DogRatingSchema.index({ postId: 1, accountId: 1 }, { unique: true })