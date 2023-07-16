import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class DogsPostsService {
  async getDogPostById(dogPostId) {
    const dogPost = await dbContext.DogPosts.findById(dogPostId)
    if (!dogPost) {
      throw new BadRequest("No dog post with that Id found")
    }

    return dogPost
  }
  async getDogPosts() {
    const dogPosts = await dbContext.DogPosts.find().populate('poster', 'name picture').populate('commentCount').populate('likeCount').populate('dislikeCount')
    return dogPosts

  }
  async createDogPost(dogData) {
    const dogPost = await dbContext.DogPosts.create(dogData)

    await dogPost.populate('poster', 'name picture')   // 'account' comes from virtual in dog post schema
    await dogPost.populate('commentCount')
    await dogPost.populate('likeCount')
    await dogPost.populate('dislikeCount')
    return dogPost
  }

  async deleteDogPost(dogPostId, userId) {

    const dogPostToDelete = await this.getDogPostById(dogPostId)

    if (dogPostToDelete.posterId.toString() != userId) {

      throw new Forbidden("You are not the owner of the post and cannot delete")
    }

    await dogPostToDelete.remove()

    return 'post deleted'
  }
}

export const dogsPostsService = new DogsPostsService()