import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { dogsPostsService } from "../services/DogsService.js"

export class DogPostsController extends BaseController {
  constructor() {
    super('api/dogPosts')
    this.router
      .get('', this.getDogPosts)
      .get('/:dogPostId', this.getDogPostById)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createDogPost)
      .delete('/:dogPostId', this.deleteDogPost)

  }
  async getDogPostById(req, res, next) {
    try {
      const dogPostId = req.params.dogPostId

      const dogPost = await dogsPostsService.getDogPostById(dogPostId)

      return res.send(dogPost)
    } catch (error) {
      next(error)
    }
  }
  async getDogPosts(req, res, next) {
    try {
      const dogPosts = await dogsPostsService.getDogPosts()
      return res.send(dogPosts)
    } catch (error) {
      next(error)
    }
  }
  async createDogPost(req, res, next) {
    try {
      const dogData = req.body
      dogData.posterId = req.userInfo.id
      const dogPost = await dogsPostsService.createDogPost(dogData)
      return res.send(dogPost)
    } catch (error) {
      next(error)
    }
  }
  async deleteDogPost(req, res, next) {
    try {
      const dogPostId = req.params.id
      const userId = req.userInfo.id
      const dogPost = await dogsPostsService.deleteDogPost(dogPostId, userId)
      return res.send(dogPost)
    } catch (error) {
      next(error)
    }
  }
}