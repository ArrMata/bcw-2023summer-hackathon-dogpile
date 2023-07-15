import { ratingsService } from "../services/RatingsService.js"
import { Pop } from "../utils/Pop.js"

export class RatingsController {
    constructor() {
        console.log('[Ratings controller loaded]')
    }

    async createRating(postId, impression) {
        try {
            const data = {}
            data.impression = impression
            data.postId = postId
            await ratingsService.createRatings(data)
            console.log('[Does this fire on error?]')
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }
}