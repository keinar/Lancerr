
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'gigs'

export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    addGigMsg
}
window.cs = gigService

_createGigs()
async function query() {
    var gigs = await storageService.query(STORAGE_KEY)
    return gigs
}

function getById(gigId) {
    return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await storageService.put(STORAGE_KEY, gig)
    } else {
        // Later, owner is set by the backend
        gig.owner = userService.getLoggedinUser()
        savedGig = await storageService.post(STORAGE_KEY, gig)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    // Later, this is all done by the backend
    const gig = await getById(gigId)
    if (!gig.msgs) gig.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    gig.msgs.push(msg)
    await storageService.put(STORAGE_KEY, gig)

    return msg
}

function getEmptyGig() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// TEST DATA
function _createGigs() {
    let gigs = utilService.loadFromStorage(STORAGE_KEY)
    if (!gigs || !gigs.length) {
        gigs = [
            {
                "_id": "i101",
                "title": "I will design your logo",
                "price": 12,
                "owner": {
                  "_id": "u101",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo...",
                "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i102",
                "title": "I will design your logo1",
                "price": 12,
                "owner": {
                  "_id": "u102",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo1...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i103",
                "title": "I will design your logo2",
                "price": 12,
                "owner": {
                  "_id": "u103",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo2...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i104",
                "title": "I will design your logo3",
                "price": 12,
                "owner": {
                  "_id": "u104",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo3...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i101",
                "title": "I will design your logo",
                "price": 12,
                "owner": {
                  "_id": "u101",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i102",
                "title": "I will design your logo1",
                "price": 12,
                "owner": {
                  "_id": "u102",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo1...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i103",
                "title": "I will design your logo2",
                "price": 12,
                "owner": {
                  "_id": "u103",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo2...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i104",
                "title": "I will design your logo3",
                "price": 12,
                "owner": {
                  "_id": "u104",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo3...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },            {
                "_id": "i101",
                "title": "I will design your logo",
                "price": 12,
                "owner": {
                  "_id": "u101",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i102",
                "title": "I will design your logo1",
                "price": 12,
                "owner": {
                  "_id": "u102",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo1...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i103",
                "title": "I will design your logo2",
                "price": 12,
                "owner": {
                  "_id": "u103",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo2...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i104",
                "title": "I will design your logo3",
                "price": 12,
                "owner": {
                  "_id": "u104",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo3...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },            {
                "_id": "i101",
                "title": "I will design your logo",
                "price": 12,
                "owner": {
                  "_id": "u101",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i102",
                "title": "I will design your logo1",
                "price": 12,
                "owner": {
                  "_id": "u102",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo1...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i103",
                "title": "I will design your logo2",
                "price": 12,
                "owner": {
                  "_id": "u103",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo2...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i104",
                "title": "I will design your logo3",
                "price": 12,
                "owner": {
                  "_id": "u104",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo3...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },            {
                "_id": "i101",
                "title": "I will design your logo",
                "price": 12,
                "owner": {
                  "_id": "u101",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i102",
                "title": "I will design your logo1",
                "price": 12,
                "owner": {
                  "_id": "u102",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo1...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i103",
                "title": "I will design your logo2",
                "price": 12,
                "owner": {
                  "_id": "u103",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo2...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i104",
                "title": "I will design your logo3",
                "price": 12,
                "owner": {
                  "_id": "u104",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo3...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },            {
                "_id": "i101",
                "title": "I will design your logo",
                "price": 12,
                "owner": {
                  "_id": "u101",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i102",
                "title": "I will design your logo1",
                "price": 12,
                "owner": {
                  "_id": "u102",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo1...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i103",
                "title": "I will design your logo2",
                "price": 12,
                "owner": {
                  "_id": "u103",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo2...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i104",
                "title": "I will design your logo3",
                "price": 12,
                "owner": {
                  "_id": "u104",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo3...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },            {
                "_id": "i101",
                "title": "I will design your logo",
                "price": 12,
                "owner": {
                  "_id": "u101",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i102",
                "title": "I will design your logo1",
                "price": 12,
                "owner": {
                  "_id": "u102",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo1...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i103",
                "title": "I will design your logo2",
                "price": 12,
                "owner": {
                  "_id": "u103",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo2...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i104",
                "title": "I will design your logo3",
                "price": 12,
                "owner": {
                  "_id": "u104",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                "daysToMake": 3,
                "description": "Make a unique logo3...",
                "imgUrl": "",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
        ]
        utilService.saveToStorage(STORAGE_KEY, gigs)
    }


}



// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




