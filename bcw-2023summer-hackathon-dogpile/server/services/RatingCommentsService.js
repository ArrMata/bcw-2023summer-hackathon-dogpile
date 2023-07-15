import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class RatingComments {
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