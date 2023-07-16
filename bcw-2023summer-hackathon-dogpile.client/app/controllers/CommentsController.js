import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawComments() {
  let comments = AppState.comments
  let template = ''
  comments.forEach(comment => template += comment.CommentTemplate)
  setHTML('commentArea', template)
}
export class CommentsController {
  constructor() {
    console.log('Comments Controller Loaded');

    AppState.on('activePost', this.getCommentsByActivePost)
    AppState.on('comments', _drawComments)
  }
  async getCommentsByActivePost() {
    try {
      await commentsService.getCommentsByActivePost()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async createComment(event) {
    try {
      event.preventDefault()
      let form = event.target
      let formData = getFormData(form)
      // console.log(formData);
      await commentsService.createComment(formData)
      form.reset()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }
}