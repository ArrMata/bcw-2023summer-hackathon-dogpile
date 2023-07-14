export class Post {
  constructor(data) {
    this.id = data._id
    this.caption = data.caption
    this.pictureUrl = data.pictureUrl
    this.accountId = data.accountId
  }

  get postCardTemplate() {
    return `
    <div class="card" style="width: 18rem;">
    <div>${this.accountId}</div>
    <img class="card-img-top img-fluid"
      src="${this.pictureUrl}"
      alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${this.caption}</h5>
      <p class="card-text"></p>
      <button class="btn btn-success">Like</button>
      <button class="btn btn-danger">Dislike</button>
    </div>
  </div>
</div>
    `
  }

}