import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { dogsPostsService } from "../services/DogPostsService.js"
import { dogCommentsService } from "../services/DogCommentsService.js"
import { ratingService } from "../services/RatingService.js"

export class DogPostsController extends BaseController {
  constructor() {
    super('api/dogPosts')
    this.router
      .get('', this.getDogPosts)
      .get('/:dogPostId', this.getDogPostById)
      .get('/:dogPostId/comments', this.getCommentsByPostId)
      // .get('/:accountId/rating', this.getRatingByPostsAccountId)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createDogPost)
      .delete('/:dogPostId', this.deleteDogPost)

  }
  // async getRatingByPostsAccountId(req, res, next) {
  //   try {
  //     const accountId = req.params.accountId
  //     const rating = await ratingService.getRatingByPostsAccountId(accountId)
  //     return res.send(rating)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
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
  async getCommentsByPostId(req, res, next) {
    try {
      const postId = req.params.dogPostId
      const comments = await dogCommentsService.getCommentsByPostId(postId)
      return res.send(comments)
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
      const dogPostId = req.params.dogPostId
      const userId = req.userInfo.id
      const dogPost = await dogsPostsService.deleteDogPost(dogPostId, userId)
      return res.send(dogPost)
    } catch (error) {
      next(error)
    }
  }
}