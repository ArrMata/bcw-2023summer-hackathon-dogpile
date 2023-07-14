import { AppState } from "../AppState.js"
import { setHTML } from "../utils/Writer.js"

function _drawPosts() {
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
}