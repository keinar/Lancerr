
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
        // gig.owner = userService.getLoggedinUser()
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
function createGig(model = '', type = '', batteryStatus = 100) {
  return {
      model,
      batteryStatus,
      type
  }
}

function getEmptyGig() {
  const title = '';
  const price = '';
  const owner = {
    _id: 'u101',
    fullname: 'Dudu Da',
    imgUrl: 'url',
    level: 'basic/premium',
    rate: 4
  };
  const daysToMake = '3';
  const description = '';
  const imgUrl = 'https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp';
  const tags = ['logo-design', 'artistic', 'professional', 'accessible'];
  const likedByUsers = ['mini-user'];

  return {
    title,
    price,
    owner,
    daysToMake,
    description,
    imgUrl,
    tags,
    likedByUsers // for user-wishlist: use $in
  };
}
// Catagorey DATA
export const gigCategories = [
  {
    name: 'Web Development',
    subcategories: ['Front-end Development', 'Back-end Development', 'Full-stack Development', 'UI/UX Design', 'Responsive Design', 'Web Security', 'E-commerce Development', 'CMS Development', 'Website Maintenance', 'Website Redesign']
  },
  {
    name: 'Graphic Design',
    subcategories: ['Logo Design', 'Brand Identity', 'Print Design', 'Illustration', 'Packaging Design', 'Infographics', 'Social Media Graphics', 'Motion Graphics', 'Brochure Design', 'Poster Design']
  },
  {
    name: 'Digital Marketing',
    subcategories: ['SEO (Search Engine Optimization)', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'PPC (Pay-per-Click) Advertising', 'Affiliate Marketing', 'Online Reputation Management', 'Marketing Analytics', 'Influencer Marketing', 'Video Marketing']
  },
  {
    name: 'Writing & Translation',
    subcategories: ['Copywriting', 'Content Writing', 'Blog Writing', 'Technical Writing', 'Creative Writing', 'Translation', 'Proofreading', 'Editing', 'Resume Writing', 'Transcription']
  },
  {
    name: 'Video & Animation',
    subcategories: ['Video Editing', 'Animation', 'Motion Graphics', 'Explainer Videos', 'Whiteboard Animation', 'Product Animation', 'Logo Animation', 'Short Films', 'Video Production', 'Subtitles & Captions']
  },
  {
    name: 'Music & Audio',
    subcategories: ['Music Production', 'Audio Editing', 'Sound Design', 'Voice Over', 'Podcast Editing', 'Audio Mixing', 'Jingles & Intros', 'Original Compositions', 'Singer-Songwriter', 'Remixing & Mashups']
  },
  {
    name: 'Programming & Tech',
    subcategories: ['Mobile App Development', 'Game Development', 'Software Development', 'Database Design', 'API Development', 'Scripting & Automation', 'IT Support', 'Network Administration', 'Cybersecurity', 'Web Scraping']
  },
  {
    name: 'Business',
    subcategories: ['Business Planning', 'Market Research', 'Financial Consulting', 'Legal Consulting', 'Business Analysis', 'Virtual Assistant', 'Project Management', 'Business Support', 'Business Coaching', 'HR Consulting']
  },
  {
    name: 'Data Science & Analytics',
    subcategories: ['Data Analysis', 'Machine Learning', 'Data Visualization', 'Big Data', 'Statistical Analysis', 'Predictive Modeling', 'Quantitative Research', 'Data Engineering', 'Data Mining', 'Text Analytics']
  },
  {
    name: 'Sales & Marketing',
    subcategories: ['Sales Strategy', 'Lead Generation', 'Email Campaigns', 'Cold Calling', 'Sales Funnel Optimization', 'Market Research', 'Marketing Strategy', 'Branding Strategy', 'Sales Presentations', 'Customer Retention']
  }
];

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
                "_id": "i105",
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
                "_id": "i106",
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
                "_id": "i107",
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
                "imgUrl": "https://res.cloudinary.com/de2rdmsca/image/upload/v1698329461/promote-your-facebook-page-to-country-targeted-audience_oppvsc.jpg",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i108",
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
                "_id": "i109",
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
                "_id": "i110",
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
                "_id": "i111",
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
                "imgUrl": "https://res.cloudinary.com/de2rdmsca/image/upload/v1698329461/promote-your-facebook-page-to-country-targeted-audience_oppvsc.jpg",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i112",
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
                "_id": "i113",
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
                "imgUrl": "https://res.cloudinary.com/de2rdmsca/image/upload/v1698329461/promote-your-facebook-page-to-country-targeted-audience_oppvsc.jpg",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i114",
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
                "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i115",
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
                "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i116",
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
                "_id": "i117",
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
                "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i118",
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
                "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679340/t-1_ozhsab.webp",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i119",
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
                "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676247/jason-2_ykqz4t.webp",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i120",
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
                "_id": "i121",
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
                "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676247/jason-2_ykqz4t.webp",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i122",
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
                "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679340/t-1_ozhsab.webp",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i123",
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
                "_id": "i124",
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
                "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676247/jason-2_ykqz4t.webp",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },            {
                "_id": "i125",
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
                "_id": "i126",
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
                "_id": "i127",
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
                "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679340/t-1_ozhsab.webp",
                "tags": [
                  "logo-design",
                  "artistic",
                  "professional",
                  "accessible"
                ],
                "likedByUsers": ['mini-user'] // for user-wishlist: use $in
              },
              {
                "_id": "i128",
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
                "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676247/jason-2_ykqz4t.webp",
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




