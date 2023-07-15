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

  async createComment(formData) {
    const activePost = AppState.activePost
    formData.postId = activePost?.id
    // const res = await api.get(`api/dogPosts/${activePost.id}`)
    const res = await api.post(`api/dogComments`, formData)
    // console.log(res.data);
    const newComment = new Comment(res.data)
    AppState.comments.push(newComment)
    AppState.emit('comments')
    // const newComment = new Comment(res.data)

    //   console.log('[[creating comment!]]', res.data);
    //   // const new
  }
}

export const commentsService = new CommentsService()