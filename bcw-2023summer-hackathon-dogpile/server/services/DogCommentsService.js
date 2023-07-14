import { dbContext } from "../db/DbContext.js"

class DogCommentsService {
  async getDogComments() {
    const dogComments = await dbContext.DogComments.find()
    return dogComments
  }

  async createDogComment(commentData) {
    const dogComment = await dbContext.DogComments.create(commentData)
    return dogComment
  }

}
export const dogCommentsService = new DogCommentsService()