import { dbContext } from "../db/DbContext.js"

class DogsPostsService {
  async createDogPost(dogData) {
    const dogPost = await dbContext.DogPosts.create(dogData)
    await dogPost.populate('account', 'name picture')   // 'account' comes from virtual in dog post schema
    return dogPost
  }

}

export const dogsPostsService = new DogsPostsService()