export class Post {
  constructor(data) {
    this.id = data._id
    this.caption = data.caption
    this.pictureUrl = data.pictureUrl
    this.posterId = data.posterId
  }

  get postCardTemplate() {
    return `
    <div class="col-3">
        <div class="dog-card">
          <div class="dog-name"> <h4>${this.posterId}</h4></div>
          <img class="selectable" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="app.PostsController.setActivePost('${this.id}')"
            src="${this.pictureUrl}"
            alt="Card image cap">
          <div class="card-body">
            <h5>${this.caption}</h5>
            <button class="like-button"><i class="mdi mdi-heart"></i></button>
            <button class="dislike-button"><i class="mdi mdi-heart-broken"></i></button>
          </div>
        </div>
      </div>
    `
  }

  get ActiveCardTemplate() {
    return `
    <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">${this.posterId}</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <div>
      <img
        src="${this.pictureUrl}"
        alt="">
      <p>
        ${this.caption}
      </p>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary">Save changes</button>
  </div>
    `
  }

}