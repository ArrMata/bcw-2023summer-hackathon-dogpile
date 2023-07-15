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


}

export const ratingsService = new RatingsService()