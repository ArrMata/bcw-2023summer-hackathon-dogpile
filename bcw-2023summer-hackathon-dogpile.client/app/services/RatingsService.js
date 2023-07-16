import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class RatingsService {

    async createRatings(data) {
        // TODO Was trying  to change the function based on Appstate.activepost ~ rating, if create fails -> update or delete
        // const getRatingById = api.get(`api/ratings/${data.postId}`)
        const foundPost = AppState.posts.find(p => p.id == data.postId)
        const res = await api.post('api/ratings', data)
        console.log(res.data)

        if (!res.data.impression) {
            console.log('[dislike]')
            foundPost.dislikeCount++
        } else {
            console.log('[like]')
            foundPost.likeCount++
        }
        AppState.emit('activePost')
        AppState.emit('posts')
    }

    async getUserRatings() {
        const res = await api.get('account/ratings')
        AppState.accountPostRatings = res.data
        // console.log("[LOGGED IN USER RATINGS GOT]", AppState.accountPostRatings)
    }

    async createPositiveRating(postId) {
        const res = await api.post('api/ratings', { postId, impression: true })
        AppState.accountPostRatings.push(res.data)
        // @ts-ignore
        AppState.activePost.likeCount++
        // console.log("[CREATED NEW POSITIVE RATING]", AppState.accountPostRatings)
        AppState.emit('activePost')
        AppState.emit('posts')
    }
    async createNegativeRating(postId) {
        const res = await api.post('api/ratings', { postId, impression: false })
        AppState.accountPostRatings.push(res.data)
        // @ts-ignore
        AppState.activePost.dislikeCount++
        // console.log("[CREATED NEW NEGATIVE RATING]", AppState.accountPostRatings)
        AppState.emit('activePost')
        AppState.emit('posts')
    }

    async deleteRating(postId) {
        const foundRating = AppState.accountPostRatings.find(rating => rating.postId == postId)
        // @ts-ignore
        const res = await api.delete(`api/ratings/${foundRating._id}`)
        AppState.accountPostRatings = AppState.accountPostRatings.filter(rating => rating != foundRating)
        // console.log("[DELETED A RATING]", AppState.accountPostRatings)
        if (foundRating.impression)
            // @ts-ignore
            AppState.activePost.likeCount--
        else
            // @ts-ignore
            AppState.activePost.dislikeCount--
        AppState.emit('activePost')
        AppState.emit('posts')
    }


    async updateRating(postId) {
        const foundRating = AppState.accountPostRatings.find(rating => rating.postId == postId)
        // @ts-ignore
        const res = await api.put(`api/ratings/${foundRating._id}`, { impression: !foundRating.impression })
        foundRating.impression = !foundRating.impression
        // console.log("[UPDATED A RATING]", AppState.accountPostRatings)
        if (foundRating.impression) {
            // @ts-ignore
            AppState.activePost.likeCount++
            // @ts-ignore
            AppState.activePost.dislikeCount--
        } else {
            // @ts-ignore
            AppState.activePost.dislikeCount++
            // @ts-ignore
            AppState.activePost.likeCount--
        }
        AppState.emit('activePost')
        AppState.emit('posts')
    }

}

export const ratingsService = new RatingsService()