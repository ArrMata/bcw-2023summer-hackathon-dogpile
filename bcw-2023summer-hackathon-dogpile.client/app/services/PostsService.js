import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "../controllers/AxiosService.js"

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
        console.log('[GOT DOGGOS]', AppState.posts)
    }

    async setActivePost(postId) {
        const foundPost = AppState.posts.find(post => post.id == postId)
        AppState.activePost = foundPost
        console.log('this is my active post', AppState.activePost);
    }
    async deletePost(postId) {
        const res = await api.delete(`api/dogPosts/${postId}`)
        console.log('post to delete: ', res.data);
        const postToDelete = AppState.posts.findIndex(post => post.id == postId)

        if (postToDelete == -1) {
            throw new Error('Cannot find post')
        }

        AppState.posts.splice(postToDelete, 1)
        AppState.emit('posts')
    }
}
export const postServices = new PostServices()