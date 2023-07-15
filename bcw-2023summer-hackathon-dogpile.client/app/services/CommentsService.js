import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async getCommentsByActivePost() {
    const activePost = AppState.activePost
    // find it with the id

    // console.log('comments for active post', activePost)
    // @ts-ignore
    const res = await api.get(`api/dogPosts/${activePost.id}/comments`)
    console.log('comments!:', res.data)
    AppState.comments = res.data.map(c => new Comment(c))
    console.log('comments in the appstate', AppState.comments)
  }

}

export const commentsService = new CommentsService()