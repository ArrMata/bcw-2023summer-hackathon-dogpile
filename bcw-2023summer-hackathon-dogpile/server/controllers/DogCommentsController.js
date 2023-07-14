import { Auth0Provider } from "@bcwdev/auth0provider";
import { dogCommentsService } from "../services/DogCommentsService.js";
import BaseController from "../utils/BaseController.js";

export class DogCommentsController extends BaseController {
  constructor() {
    super('api/dogComments')
    this.router
      .get('', this.getDogComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createDogComment)
  }
  async getDogComments(req, res, next) {
    try {
      const dogComments = await dogCommentsService.getDogComments()
      res.send(dogComments)
    } catch (error) {
      next(error)
    }
  }
  async createDogComment(req, res, next) {
    try {
      const commentData = req.body
      commentData.commentorId = req.userInfo.id
      const DogComment = await dogCommentsService.createDogComment(commentData)
      res.send(DogComment)
    } catch (error) {
      next(error)
    }
  }
}