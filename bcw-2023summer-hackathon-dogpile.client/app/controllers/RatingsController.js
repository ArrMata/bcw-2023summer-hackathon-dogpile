import { ratingsService } from "../services/RatingsService.js"
import { Pop } from "../utils/Pop.js"

export class RatingsController {
    constructor() {
        console.log('[Ratings controller loaded]')
    }

    async createRating() {
        try {
            // await ratingsService.getRatings()
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }
}