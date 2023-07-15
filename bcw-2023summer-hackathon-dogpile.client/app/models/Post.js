export class Post {
  constructor(data) {
    this.id = data._id
    this.caption = data.caption
    this.pictureUrl = data.pictureUrl
    this.posterName = data.poster.name
    this.posterPicture = data.poster.picture
    this.likeCount = data.likeCount
    this.dislikeCount = data.dislikeCount
    this.commentCount = data.commentCount
  }

  get postCardTemplate() {
    return `
    <div class="col-3">
        <div class="dog-card">
          <div class="dog-user px-2"> 
            <h4>${this.posterName}</h4>
            <img class="rounded-circle" src="${this.posterPicture}" alt="${this.posterName}" />
          </div>
          <div class='dog-img-container'>
            <img class="selectable" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="app.PostsController.setActivePost('${this.id}')"
              src="${this.pictureUrl}"
              alt="Card image cap">
          </div>
          <div class="card-body">
            <h5>${this.caption}</h5>
            <span class="fs-2">${this.likeCount} - </span>
            <span class="fs-2">${this.dislikeCount}</span>
          </div>
        </div>
      </div>
    `
  }

  get ActiveCardTemplate() {
    return `
    <div class="modal-header pb-2">
      <div class="d-flex justify-content-end">
        <img class="rounded-circle active-user-img" src="${this.posterPicture}" alt="${this.posterName}" />
        <p class="ms-2 mb-0 active-user-name" id="exampleModalLabel">${this.posterName}</p>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body p-0">
      <div class="active-img-container">
        <img src="${this.pictureUrl}" alt="${this.posterName}">
      </div>
      <p class="p-3 mb-0 fs-3">
        ${this.caption}
      </p>
      <div class="d-flex justify-content-end">
      <div>
        <span class="fs-2">${this.likeCount}</span>
        <button onclick="app.RatingsController.createRating('${this.id}','${true}')" class="like-button me-3"><i class="mdi mdi-heart"></i></button>
      </div>
      <div>
        <span class="fs-2">${this.dislikeCount}</span>
        <button onclick="app.RatingsController.createRating('${this.id}','${false}')" class="dislike-button me-3"><i class="mdi mdi-heart-broken"></i></button>
      </div>
    </div>
    </div>
    <form class="mx-2" onsubmit="app.CommentsController.createComment(event)">
        <div class="d-flex mb-2">
          <input type="text" class="form-control" id="comment-content" aria-describedby="commentHelp"
            placeholder="Comment" minlength="3" maxlength="150" name="content">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    <div id= "commentArea">
    
    </div>
    <div class="modal-footer">
    </div>
    `
  }

}