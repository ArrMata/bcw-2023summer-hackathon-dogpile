import { AppState } from "../AppState.js"


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
    <div class="col-3 mb-3">
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
            <div class="px-4 d-flex justify-content-end">
              <p class="fs-3 me-3"><span class="px-2"><i class="mdi mdi-heart post-like-count"></i></span>${this.likeCount}</p>
              <p class="fs-3"><span class="px-2"><i class="mdi mdi-heart-broken post-dislike-count"></i></span>${this.dislikeCount}</p>
            </div>
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
      <p class="p-3 mb-0 fs-3">${this.caption}</p>
      <div class="d-flex justify-content-end px-3 mb-2">
        ${this.ComputedLikeSection}
      </div>
      <div class="p-2 mb-1 fs-3">
      ${this.ComputedDeleteButton}
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

  get ComputedLikeSection() {
    const account = AppState.account
    if (account)
      return `
      <div class="me-4">
      ${this.ComputedLikeButton}
        <span class="fs-2 ms-1">${this.likeCount}</span>
      </div>
      <div class="ms-4">
        ${this.ComputedDislikeButton}
        <span class="fs-2 ms-1">${this.dislikeCount}</span>
      </div>
      `
    return `
      <p class="fs-3 me-3"><span class="px-2"><i class="mdi mdi-heart post-like-count"></i></span>${this.likeCount}</p>
      <p class="fs-3"><span class="px-2"><i class="mdi mdi-heart-broken post-dislike-count"></i></span>${this.dislikeCount}</p>
    `
  }

  get ComputedDeleteButton() {
    const account = AppState.account
    if (account) {
      return `
      <button onclick="app.PostsController.deletePost('${this.id}')" class="btn btn-danger">Delete Post</button>
      `
    }
    else return ``
  }

  get ComputedLikeButton() {
    const activePost = AppState.activePost
    const account = AppState.account

    if (!account) {
      return ``
    }

    if (activePost && AppState.accountPostRatings.find(rating => rating.postId == activePost.id && rating.impression == true))
      return `
      <label class="rating-switch">
        <input checked id="likeCheckbox" type="checkbox" onChange="app.RatingsController.togglePositiveRating('${this.id}')"/>
        <span class="like-toggle"><i class="fs-4 mdi mdi-heart"></i></span>
      </label>

    `
    return `
    <label class="rating-switch">
      <input id="likeCheckbox" type="checkbox" onChange="app.RatingsController.togglePositiveRating('${this.id}')"/>
      <span class="like-toggle"><i class="fs-4 mdi mdi-heart"></i></span>
    </label>
    `
  }

  get ComputedDislikeButton() {
    const activePost = AppState.activePost
    const account = AppState.account

    if (!account) {
      return ``
    }

    if (activePost && AppState.accountPostRatings.find(rating => rating.postId == activePost.id && rating.impression == false))
      return `
      <label class="rating-switch">
        <input checked id="dislikeCheckbox" type="checkbox" onChange="app.RatingsController.toggleNegativeRating('${this.id}')"/>
        <span class="dislike-toggle"><i class="fs-4 mdi mdi-heart-broken"></i></span>
      </label>

    `
    return `
    <label class="rating-switch">
      <input id="dislikeCheckbox" type="checkbox" onChange="app.RatingsController.toggleNegativeRating('${this.id}')"/>
      <span class="dislike-toggle"><i class="fs-4 mdi mdi-heart-broken"></i></span>
    </label>
    `
  }

}



// <button onclick="app.RatingsController.createRating('${this.id}','${true}')" class="like-button me-3"><i class="mdi mdi-heart"></i></button>
// <button onclick="app.RatingsController.createRating('${this.id}','${false}')" class="dislike-button me-3"><i class="mdi mdi-heart-broken"></i></button>