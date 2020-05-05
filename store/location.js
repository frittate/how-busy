/* eslint-disable no-console */
import firebase from 'firebase/app'
import { auth, firestore } from '@/services/firebase'

export const state = () => ({
  location: null
})

export const mutations = {
  SET_LOCATION: (state, location) => {
    state.location = location
  }
}

export const actions = {
  getLocation ({ commit }, uid) {
    console.log(uid, auth)

    let location = []

    const docRef = firestore.collection('locations')
    const queryRef = docRef.where('code', '==', uid.toUpperCase())

    queryRef.onSnapshot((snapshot) => {
      location = []
      snapshot.forEach((doc) => {
        location.push({
          id: doc.id,
          current: doc.data().current
        })
      })
      commit('SET_LOCATION', location[0])
    })
  },
  changeVisitorCount ({ state }, change) {
    let newCurrent = state.location.current
    if (change === 'add') {
      newCurrent++
    } else {
      newCurrent--
    }

    firestore.collection('locations').doc(state.location.id).update({
    // created: firebase.firestore.Timestamp.now(),
      current: newCurrent
    })
  },
  async saveNewLocation ({ state }, newLocation) {
    // const userKey = auth.currentUser.uid
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    // const userRef = firestore.collection('customers').doc(userKey).ref
    const ref = await firestore.collection('locations')
      .add({
        createdAt: timestamp,
        address: newLocation.address,
        name: newLocation.name,
        maximum: newLocation.maximum,
        make_current_number_public: newLocation.make_current_number_public,
        make_maximum_number_public: newLocation.make_maximum_number_public,
        code: newLocation.code,
        owner: auth.currentUser.uid,
        current: 0
      })
    return ref.id
  }
}
