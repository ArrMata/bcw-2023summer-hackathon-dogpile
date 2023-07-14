import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class DogsPostsService {
  async getDogPostById(dogPostId) {
    const dogPost = await dbContext.DogPosts.findById(dogPostId)

    return dogPost
  }
  async getDogPosts() {
    const dogPosts = await dbContext.DogPosts.find()
    return dogPosts

  }
  async createDogPost(dogData) {
    const dogPost = await dbContext.DogPosts.create(dogData)
    await dogPost.populate('poster', 'name picture')   // 'account' comes from virtual in dog post schema
    return dogPost
  }

  async deleteDogPost(dogPostId, userId) {

    const dogPostToDelete = await this.getDogPostById(dogPostId)

    if (dogPostToDelete.posterId.toString() != userId) {

      throw new Forbidden("You are not the owner of the post and cannot delete")
    }

    await dogPostToDelete.remove()

  }
}

export const dogsPostsService = new DogsPostsService()