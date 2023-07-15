import { Schema } from "mongoose";

export const CommentRatingSchema = new Schema({
    commentId: { type: Schema.Types.ObjectId, required: true, ref: 'DogComment' },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
}, { timestamps: true, toJSON: { virtuals: true } })

CommentRatingSchema.index({ commentId: 1, accountId: 1 }, { unique: true })