/* eslint-disable no-console */
import JWTDecode from 'jwt-decode'
import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit ({ commit, dispatch, state }, { req, app }) {
    /*  await dispatch('destinations/loadPrismic', app.$prismic)
    await dispatch('destinations/loadRoads', app.$axios) */
    if (process.server && process.static) { return }
    if (!req.headers.cookie) { return }

    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.bsy__access_token
    const userSavedCookie = parsed.bsy__user_locations

    if (!accessTokenCookie) { return }
    const decoded = JWTDecode(accessTokenCookie)

    if (decoded) {
      commit('users/SET_USER', {
        uid: decoded.user_id,
        email: decoded.email
      })
      if (!userSavedCookie) { return }
      commit('users/SET_USER_LOCATIONS', JSON.parse(userSavedCookie))
    }
  }
}
