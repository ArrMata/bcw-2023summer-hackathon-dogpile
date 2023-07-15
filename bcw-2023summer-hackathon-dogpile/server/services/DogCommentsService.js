import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class DogCommentsService {

  async getDogComments() {
    const dogComments = await dbContext.DogComments.find()
    return dogComments
  }
  async getCommentById(commentId) {
    const comment = await dbContext.DogComments.findById(commentId)
    return comment
  }
  async getCommentsByPostId(dogPostId) {
    const comments = await dbContext.DogComments.find({ postId: dogPostId }).populate('commentor', 'name picture')
    return comments
  }

  async createDogComment(commentData) {
    const dogComment = await dbContext.DogComments.create(commentData)
    await dogComment.populate('commentor', 'name picture')
    return dogComment
  }
  async removeComment(commentId, removerId) {
    const getCommentById = await this.getCommentById(commentId)


    if (getCommentById.commentorId != removerId) {
      throw new Forbidden("YOU CAN'T DELETE OTHER DOG'S POSTS! WOOF!")
    }
    await getCommentById.remove()
    return "Comment has been deleted"
  }

}
export const dogCommentsService = new DogCommentsService()