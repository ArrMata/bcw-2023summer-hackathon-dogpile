export class Comment {
  constructor(data) {
    console.log('comment data', data);
    this.content = data.content
    this.id = data.id
    this.commentorId = data.commentorId
    this.commentorName = data.commentor.name
    this.commentorPicture = data.commentor.picture
    this.postId = data.postId
  }

  get CommentTemplate() {
    return `
    <div class="comment">
      <div class="comment-user">
        <img src="${this.commentorPicture}" alt="${this.commentorName}" />
        <h5>${this.commentorName}</h5>
      </div>
      <p class="fs-4">${this.content}</p>
    </div>
`
  }
}

