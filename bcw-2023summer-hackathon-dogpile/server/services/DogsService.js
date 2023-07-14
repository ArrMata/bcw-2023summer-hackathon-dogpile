import { dbContext } from "../db/DbContext.js"

class DogsPostsService {
  async getDogPosts() {
    const dogPosts = await dbContext.DogPosts.find()
    return dogPosts

  }
  async createDogPost(dogData) {
    const dogPost = await dbContext.DogPosts.create(dogData)
    await dogPost.populate('poster', 'name picture')   // 'account' comes from virtual in dog post schema
    return dogPost
  }

}

export const dogsPostsService = new DogsPostsService()