import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ratingService } from "../services/RatingService.js";


export class RatingsController extends BaseController {
  constructor() {
    super('api/ratings')
    this.router
      .get('', this.getRatings)
      .get('/:ratingId', this.getRatingById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createRating)
      .put('/:ratingId', this.updateRating)
      .delete('/:ratingId', this.removeRating)
  }

  async getRatings(req, res, next) {
    try {
      const rating = await ratingService.getRating()
      return res.send(rating)
    } catch (error) {
      next(error)
    }
  }

  async getRatingById(req, res, next) {
    try {
      const ratingId = req.params.id
      const rating = await ratingService.getRatingById(ratingId)
    } catch (error) {
      next(error)
    }
  }

  async createRating(req, res, next) {
    try {
      const ratingData = req.body
      ratingData.accountId = req.userInfo.id
      const rating = await ratingService.createRating(ratingData)
      return res.send(rating)
    } catch (error) {
      next(error)
    }
  }
  async updateRating(req, res, next) {
    try {
      const ratingData = req.body
      const ratingId = req.params.ratingId
      ratingData.accountId = req.userInfo.id
      const rating = await ratingService.updateRating(ratingData, ratingId)
      return res.send(rating)
    } catch (error) {
      next(error)
    }
  }
  async removeRating(req, res, next) {
    try {
      const ratingId = req.params.ratingId
      const ratingUser = req.userInfo.id
      const rating = await ratingService.removeRating(ratingId, ratingUser)
      return res.send(rating)
    } catch (error) {
      next(error)
    }
  }
}