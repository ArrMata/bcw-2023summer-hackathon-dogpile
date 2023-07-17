import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async getCommentsByActivePost() {
    const activePost = AppState.activePost
    // find it with the id
    // @ts-ignore
    const res = await api.get(`api/dogPosts/${activePost.id}/comments`)
    AppState.comments = res.data.map(c => new Comment(c))
  }

  async createComment(formData) {
    const activePost = AppState.activePost
    formData.postId = activePost?.id
    const res = await api.post(`api/dogComments`, formData)
    const newComment = new Comment(res.data)
    AppState.comments.push(newComment)
    AppState.emit('comments')
  }
}

export const commentsService = new CommentsService()