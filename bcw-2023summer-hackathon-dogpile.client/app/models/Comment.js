export class Comment {
  constructor(data) {
    // console.log('comment data', data);
    this.content = data.content
    this.id = data.id
    this.commentorId = data.commentorId
    this.postId = data.postId
  }

  get CommentTemplate() {
    return `
  <p class="fs-4">${this.content}</p>
`
  }
}

