import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostServices {

    async createPost(formData) {
        const res = await api.post('api/dogPosts', formData)
        console.log(res.data)
        AppState.posts = [...AppState.posts, new Post(res.data)]
        console.log('[NEW DOG POST ADDED]', AppState.posts)
    }
    async getPosts() {
        const res = await api.get('api/dogPosts')
        console.log('[DATA GOT]', res.data)
        AppState.posts = res.data.map(dogData => new Post(dogData))
        console.log('[GOT DOGOS]', AppState.posts)
    }

    async setActivePost(postId) {
        const foundPost = AppState.posts.find(post => post.id == postId)
        AppState.activePost = foundPost
        console.log('this is my active post', AppState.activePost);
    }
}
export const postServices = new PostServices()