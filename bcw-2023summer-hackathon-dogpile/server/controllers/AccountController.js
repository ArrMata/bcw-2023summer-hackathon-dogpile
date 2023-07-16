import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { ratingService } from '../services/RatingService'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/ratings', this.getUserRatings)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUserRatings(req, res, next) {
    try {
      const uid = req.userInfo.id
      const usersRatings = await ratingService.getUserRatings(uid)
      res.send(usersRatings)
    } catch (error) {
      next(error)
    }
  }
}
