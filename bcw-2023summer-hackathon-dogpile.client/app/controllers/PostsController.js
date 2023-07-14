import { AppState } from "../AppState.js"
import { postServices } from "../services/PostsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawPosts() {
  console.log('drawing')
  let posts = AppState.posts
  let template = ''
  posts.forEach(p => template += p.postCardTemplate)
  setHTML('posts', template)
}

export class PostsController {
  constructor() {
    _drawPosts()
    console.log(`[Post controller]`)
  }

  async createPost(event) {
    try {
      event.preventDefault()
      let form = event.target
      let formData = getFormData(form)
      await postServices.createPost(formData)
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }

  async getPosts() {
    try {
      await postServices.getPosts()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
}