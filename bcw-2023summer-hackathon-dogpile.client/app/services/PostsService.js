import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostServices {
    async createPost(formData) {
        const res = await api.post('api/dogPosts', formData)
        AppState.posts = [...AppState.posts, new Post(res.data)]
        console.log('[NEW DOG POST ADDED]', AppState.posts)
    }
    async getPosts() {
        const res = await api.get('api/dogPosts')
        console.log(res.data)
    }
}
export const postServices = new PostServices()