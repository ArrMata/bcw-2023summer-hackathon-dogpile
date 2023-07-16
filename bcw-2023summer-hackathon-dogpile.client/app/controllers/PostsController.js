import { AppState } from "../AppState.js"
import { postServices } from "../services/PostsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawPosts() {
  let posts = AppState.posts
  let template = ''
  posts.forEach(p => template += p.postCardTemplate)
  setHTML('posts', template)
}

function _drawActiveContent() {
  setHTML('modalGuts', AppState.activePost?.ActiveCardTemplate)
}

export class PostsController {
  constructor() {
    console.log(`[Post controller]`)
    this.getPosts()
    AppState.on('posts', _drawPosts)
    AppState.on('activePost', _drawActiveContent)
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

  async setActivePost(postId) {
    try {
      await postServices.setActivePost(postId)
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
}