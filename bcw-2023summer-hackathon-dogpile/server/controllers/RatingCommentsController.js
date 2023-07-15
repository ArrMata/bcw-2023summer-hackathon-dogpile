import { Auth0Provider } from "@bcwdev/auth0provider";
import { ratingCommentsService } from "../services/RatingCommentsService.js";
import BaseController from "../utils/BaseController.js";

export class RatingCommentsController extends BaseController {
    constructor() {
        super('api/ratingcomments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createRatingComment)
            .delete('/:ratingCommentId', this.removeRatingComment)
    }

    async createRatingComment(req, res, next) {
        try {
            const ratingData = req.body
            ratingData.accountId = req.userInfo.id
            const ratingComment = await ratingCommentsService.createRatingComment(ratingData)
            return res.send(ratingComment)
        } catch (error) {
            next(error)
        }
    }

    async removeRatingComment(req, res, next) {
        try {
            const ratingCommentId = req.params.ratingCommentId
            const accountId = req.userInfo.id
            await ratingCommentsService.removeRatingComment(ratingCommentId, accountId)
            res.send('Comment Rating Deleted!')
        } catch (error) {
            next(error)
        }
    }
}