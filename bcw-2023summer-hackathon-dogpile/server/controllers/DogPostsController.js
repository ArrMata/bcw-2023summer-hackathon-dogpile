import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { dogsPostsService } from "../services/DogsService.js"

export class DogPostsController extends BaseController {
  constructor() {
    super('api/dogPosts')
    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createDogPost)
  }
  async createDogPost(req, res, next) {
    try {
      const dogData = req.body
      dogData.accountId = req.userInfo._id
      const dogPost = await dogsPostsService.createDogPost(dogData)
      return res.send(dogPost)
    } catch (error) {
      next(error)
    }
  }
}