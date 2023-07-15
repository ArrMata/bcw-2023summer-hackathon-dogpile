import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class RatingService {
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