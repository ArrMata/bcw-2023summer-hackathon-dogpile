import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class RatingService {
  // async getRatingByPostsAccountId(accountId) {
  //   const rating = await dbContext.DogRatings.find({ accountId })
  //   return rating
  // }
  // FIXME UNTESTED
  async getRating() {
    const rating = await dbContext.DogRatings.find()
    return rating
  }
  // FIXME UNTESTED
  async getRatingById(ratingId) {
    const rating = await dbContext.DogRatings.findById(ratingId)
    if (!rating) {
      throw new BadRequest("No dog post with that Id found")
    }
    return rating
  }
  async createRating(ratingData) {
    const rating = await dbContext.DogRatings.create(ratingData)
    return rating
  }

  async updateRating(ratingData, ratingId) {
    const foundRating = await dbContext.DogRatings.findById(ratingId)

    if (foundRating.accountId.toString() != ratingData.accountId) {
      throw new Forbidden("You cannot change another users ratings")
    }

    foundRating.impression = ratingData.impression

    await foundRating.save()
    return foundRating
  }
  async removeRating(ratingId, ratingUser) {
    const foundRating = await dbContext.DogRatings.findById(ratingId)

    if (foundRating.accountId.toString() != ratingUser) {
      throw new Forbidden("You cannot change another users ratings")
    }

    await foundRating.remove()
    return 'Delete Rating'

  }
}
export const ratingService = new RatingService()