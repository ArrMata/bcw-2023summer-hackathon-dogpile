import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class RatingComments {
    // FIXME UNTESTED
    async getRating() {
        const rating = await dbContext.CommentRatings.find()
        return rating
    }
    // FIXME UNTESTED
    async getRatingById(ratingId) {
        const rating = await dbContext.CommentRatings.findById(ratingId)
        if (!rating) {
            throw new BadRequest("No dog post with that Id found")
        }
        return rating
    }
    async removeRatingComment(ratingCommentId, accountId) {
        const ratingComment = await dbContext.CommentRatings.findById(ratingCommentId)
        if (ratingComment.accountId != accountId)
            throw new Forbidden("This is rating comment is not yours.")
        await ratingComment.remove()
    }
    async createRatingComment(ratingData) {
        const ratingComment = await dbContext.CommentRatings.create(ratingData)
        return ratingComment
    }
}

export const ratingCommentsService = new RatingComments()