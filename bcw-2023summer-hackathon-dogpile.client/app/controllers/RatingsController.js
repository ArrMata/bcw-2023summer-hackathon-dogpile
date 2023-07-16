import { AppState } from "../AppState.js"
import { ratingsService } from "../services/RatingsService.js"
import { Pop } from "../utils/Pop.js"

export class RatingsController {
    constructor() {
        console.log('[Ratings controller loaded]')
        AppState.on('account', this.getUserRatings)
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

    async toggleNegativeRating(postId) {
        try {
            // @ts-ignore
            const likeCheckedValue = document.getElementById('likeCheckbox').checked
            // @ts-ignore
            const dislikeCheckedValue = document.getElementById('dislikeCheckbox').checked
            const rating = AppState.accountPostRatings.find(rating => rating.postId == postId)
            if (rating && likeCheckedValue) {
                await this.updateRating(postId)
                // @ts-ignore
                document.getElementById('likeCheckbox').checked = false
            } else if (!dislikeCheckedValue) {
                await this.deleteRating(postId)
            }
            else {
                await this.createNegativeRating(postId)
            }
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }

    async togglePositiveRating(postId) {
        try {
            // @ts-ignore
            const likeCheckedValue = document.getElementById('likeCheckbox').checked
            // @ts-ignore
            const dislikeCheckedValue = document.getElementById('dislikeCheckbox').checked
            const rating = AppState.accountPostRatings.find(rating => rating.postId == postId)

            if (rating && dislikeCheckedValue) {
                await this.updateRating(postId)
                // @ts-ignore
                document.getElementById('dislikeCheckbox').checked = false
            }
            else if (!likeCheckedValue) {
                await this.deleteRating(postId)
            }
            else {
                await this.createPositiveRating(postId)
            }

        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }

    async createNegativeRating(postId) {
        try {
            await ratingsService.createNegativeRating(postId)
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }

    async createPositiveRating(postId) {
        try {
            await ratingsService.createPositiveRating(postId)
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }

    async updateRating(postId) {
        try {
            await ratingsService.updateRating(postId)
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }

    async deleteRating(postId) {
        try {
            await ratingsService.deleteRating(postId)
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }

    async getUserRatings() {
        try {
            await ratingsService.getUserRatings()
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }
}