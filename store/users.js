/* eslint-disable no-console */
import Cookie from 'js-cookie'
import firebase from 'firebase/app'
import { auth, firestore } from '@/services/firebase'

export const state = () => ({
  user: null,
  userLocations: []
})

export const mutations = {
  SET_USER (state, account) {
    state.user = account
  },
  SET_USER_LOCATIONS (state, locations) {
    console.log(locations)
    state.userLocations = ['test', 'test']
  }
}

export const actions = {
  async login ({ commit, dispatch }, account) {
    try {
      // login user
      await auth.signInWithEmailAndPassword(account.email, account.password)
      // set JWT from firebase auth
      const token = await auth.currentUser.getIdToken()
      const { email, uid } = auth.currentUser
      commit('SET_USER', { email, uid })
      Cookie.set('bsy__access_token', token)

      const userLocations = await dispatch('loadLocations', uid)
      // set JWT to cookie
      Cookie.set('bsy__user_locations', JSON.stringify(userLocations))
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  async register ({ app }, account) {
    try {
      await auth.createUserWithEmailAndPassword(account.email, account.password).then((res) => {
        firestore.collection('customers').doc(res.user.uid).set(
          {
            locations: [],
            name: 'test new',
            premium: false
          }
        )
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  loadLocations ({ state, commit }) {
    const uid = state.user.uid.slice()
    try {
      firestore.collection('customers').doc(uid).get().then((snapshot) => {
        const userLocations = snapshot.data().locations
        const locationDetails = []
        const locations = firestore.collection('locations')
        locations.where(firebase.firestore.FieldPath.documentId(), 'in', userLocations).get()
          .then((snapshot) => {
            if (snapshot.empty) {
              console.log('No matching documents.')
              return
            }

            snapshot.forEach((doc) => {
              locationDetails.push(doc.data())
            })
          })
          .then(() => {
            commit('SET_USER_LOCATIONS', locationDetails)
          })
          .catch((err) => {
            console.log('Error getting documents', err)
            commit('SET_USER_LOCATIONS', [])
          })
      })
    } catch (error) {
      console.error(error)
    }
  },
  async saveLocationToUser ({ state, commit }, destId) {
    console.log(destId, state.user, state.userLocations)
    const newSaved = state.userLocations.slice()
    newSaved.push(destId)
    commit('SET_USER_LOCATIONS', newSaved)

    try {
      const docUpdate = await firestore.collection('customers').doc(state.user.uid).set(
        { locations: state.userLocations },
        { merge: true }
      )
      return docUpdate
    } catch (error) {
      console.error(error)
    }
  }
}
