
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
  addGigMsg,
  getDefaultFilter,
  getFilterFromParams

}
window.cs = gigService

_createGigs()
async function query(filterBy = {}) {
  const gigs = await storageService.query(STORAGE_KEY)
  let gigsToReturn = [...gigs]

  if (filterBy.txt) {
    const regexTitle = new RegExp(filterBy.txt, 'i')
    gigsToReturn = gigsToReturn.filter(gig => regexTitle.test(gig.title))
  }

  if (filterBy.tags && filterBy.tags.length > 0) {
    gigsToReturn = gigsToReturn.filter(gig => {
      return filterBy.tags.some(tag => gig.tags.includes(tag))
    })
  }
  return gigsToReturn
}

function getById(gigId) {
  return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, gigId)
}

function getDefaultFilter() {
  return {
    tags: [],
    txt: ''
  }
}

// function getFilterFromParams(searchParams) {
//   const defaultFilter = getDefaultFilter()
//   const filterBy = {}
//   for (const field in defaultFilter) {
//       filterBy[field] = searchParams.get(field) || defaultFilter[field]
//   }
//   return filterBy
// }
function getFilterFromParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}

  for (const field in defaultFilter) {
    const fieldValue = searchParams.get(field)

    if (field === "tags") {
      // Convert tags to an array
      filterBy[field] = fieldValue ? fieldValue.split(",") : defaultFilter[field]
    } else {
      // Keep other parameters as they are
      filterBy[field] = fieldValue || defaultFilter[field]
    }
  }

  return filterBy
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
  const tags = ['Logo Design', 'Artistic', 'Professional', 'Accessible'];
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
        "title": "I will design, redesign, build, rebuild, clone, edit, fix or revamp wordpress website",
        "price": 12,
        "owner": {
          "_id": "u101",
          "fullname": "Dudu Da",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
          "level": "basic/premium",
          "rate": 4,
          "userStory": "We are PixxelStudio, A full-service design and developing web agency. From designing logos to developing websites to satisfying our customer’s every digital need is what we thrive for. We’ve worked not only with brilliant individuals but also with top companies all around the world. Our mission is to become an indispensable partner to our clients by offering the best ideas, skills and services they could possibly get."
        },
        "daysToMake": 3,
        "description": "Greetings! We are passionate, hardworking and professional bunch of people working together side by side to provide our clients the absolute best. Our products are always CLEAN HIGH-QUALITY RESPONSIVE DESIGN.We don't just deliver a WordPress site, we make sure that you can easily manage your website by yourself, which results in you managing it on your own without any help. We also provide small video tutorials on demand explaining the complete know-hows of your website.",
        "services": [
          "100% Clean Responsive Design",
          "Ecommerce site Design (Standard and Premium Plans Only)",
          "Multiple Payment Methods (PayPal, Stripe, Bank, Credit Card, etc.)",
        ],
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
        "tags": [
          "website-design",
          "WordPress",
          "professional",
          "accessible"
        ],
        "packages": {
          "basic": {
            "header": "Basic (10 products & 4 pages)",
            "price": "451.37",
            "description": "Build 10 products store + 4 pages + Responsive + Speed Optimization + 30 days free support",
            "time": "3 Days Delivery",
            "included": [
              "Functional website",
              "4 pages",
              "Responsive design",
              "E-commerce functionality",
              "10 products",
              "Payment processing"
            ]
          },
          "standard": {
            "header": "standard (16 products & 6 pages)",
            "price": "580.40",
            "description": "Build 16 products store + 6 pages + Responsive + Speed Optimization + 60 days free support",
            "time": "3 Days Delivery",
            "included": [
              "Functional website",
              "6 pages",
              "Responsive design",
              "E-commerce functionality",
              "16 products",
              "Payment processing"
            ]
          },
          "premium": {
            "header": "standard (16 products & 6 pages)",
            "price": "720.60",
            "description": "Build 20 products store + 8 pages + Responsive + Speed Optimization + 90 days free support",
            "time": "3 Days Delivery",
            "included": [
              "Functional website",
              "8 pages",
              "Responsive design",
              "E-commerce functionality",
              "20 products",
              "Payment processing",
              "Chat bot"
            ]
          }
        },
        "likedByUsers": ['mini-user'] // for user-wishlist: use $in
      },
      {
        "id": "i100",
        "title": "I will do hyper realistic pencil portrait by hand drawing",
        "about": "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
        "price": 172,
        "owner": {
          "id": "u100",
          "fullname": "frederickkessie",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
          "level": "basic/premium",
          "rate": 2,
        },
        "country": "Ghana",
        "daysToMake": 26,
        "description": "Hello ! Much obliged for visiting my gig :)\nIn this gig I'm offering you an exceptionally 3 one of a kind, best and reasonable bundles.\nIn case you are thinking for giving somebody uncommon an extremely delightful, eye getting gift( hyper practical hand drawing pencil sketch picture)?\nKindly select the helpful bundle and submit your request at this moment and I'll give you an ideal picture sketch, hand drawing, practical drawing, pencil attracting high goal JPEG/PNG advanced document.\nI will give hand-drawn dark and White or hued reasonable pictures.\nSympathetically give me clear reference photograph however much as could be expected.\nThe material I utilized for Creating pencil representations are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, mono eraser, brush, mixing stump, mechanical pencil, graphite powder and so on .\nYou can give me anything:\nPicture photographs\nFamily photographs\nCreature photographs\nAny item photographs\nScene photographs\nEngineering photographs\nAnything you envision\nKindly reach me prior to submitting your request! Much appreciated.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
        "imgUrl": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg",
        "tags": [
          "pencil drawing",
          "realistic drawing",
          "hand drawing",
          "portrait drawing",
          "pencil sketch"
        ],
        "likedByUsers": [
          "mini-user"
        ],
        "packages": {
          "basic": {
            "header": "Basic (10 products & 4 pages)",
            "price": "451.37",
            "description": "Build 10 products store + 4 pages + Responsive + Speed Optimization + 30 days free support",
            "time": "3 Days Delivery",
            "included": [
              "Functional website",
              "4 pages",
              "Responsive design",
              "E-commerce functionality",
              "10 products",
              "Payment processing"
            ]
          },
          "standard": {
            "header": "standard (16 products & 6 pages)",
            "price": "580.40",
            "description": "Build 16 products store + 6 pages + Responsive + Speed Optimization + 60 days free support",
            "time": "3 Days Delivery",
            "included": [
              "Functional website",
              "6 pages",
              "Responsive design",
              "E-commerce functionality",
              "16 products",
              "Payment processing"
            ]
          },
          "premium": {
            "header": "standard (16 products & 6 pages)",
            "price": "720.60",
            "description": "Build 20 products store + 8 pages + Responsive + Speed Optimization + 90 days free support",
            "time": "3 Days Delivery",
            "included": [
              "Functional website",
              "8 pages",
              "Responsive design",
              "E-commerce functionality",
              "20 products",
              "Payment processing",
              "Chat bot"
            ]
          }
        },
        "services": [
          "100% Clean Responsive Design",
          "Ecommerce site Design (Standard and Premium Plans Only)",
          "Multiple Payment Methods (PayPal, Stripe, Bank, Credit Card, etc.)",
        ],
        "reviews": [
          {
            "name": "tobiaspille300",
            "country": "Thailand",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png",
            "review": "frederickkessie ist a super kind artist doing the process he was super professional and only took him 1 shot to deliver a perfect result ! Highly recommended work with this guy !",
            "reviewedAt": "Published 2 months ago"
          },
          {
            "name": "liam31",
            "country": "United Kingdom",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
            "review": "I requested a slightly earlier delivery on this and once again Frederick came through and provided a fantastic delivery. Thanks so much!",
            "reviewedAt": "Published 3 weeks ago"
          },
          {
            "name": "liam31",
            "country": "United Kingdom",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
            "review": "Frederick is amazing and extremely talented. This is the second time working with him and he has been a pleasure yet again!",
            "reviewedAt": "Published 3 weeks ago"
          },
          {
            "name": "larsonraz",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Very detailed",
            "reviewedAt": "Published 1 week ago"
          },
          {
            "name": "stevekaszycki",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "very nice portrait, very good quality.",
            "reviewedAt": "Published 2 weeks ago"
          }
        ]
      },
      {
        "_id": "i102",
        "title": "I will edit professional videos for any occasion",
        "price": 20,
        "owner": {
          "_id": "u102",
          "fullname": "John Doe",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
          "level": "premium",
          "rate": 4.5
        },
        "daysToMake": 7,
        "description": "Transform your raw footage into polished, professional videos! Whether it's for weddings, events, or marketing purposes, we've got you covered. Our editing services include color correction, audio enhancement, and seamless transitions to create engaging content.",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
        "tags": [
          "video-editing",
          "professional",
          "wedding",
          "marketing"
        ],
        "likedByUsers": []
      },
      {
        "_id": "i103",
        "title": "I will create modern and impactful logo designs",
        "price": 15,
        "owner": {
          "_id": "u101",
          "fullname": "Alice Smith",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
          "level": "premium",
          "rate": 4.8
        },
        "daysToMake": 5,
        "description": "Need a unique logo that represents your brand? Look no further! We specialize in creating modern, memorable, and impactful logo designs. Our designs are tailored to your brand's identity, ensuring that you stand out from the competition.",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
        "tags": [
          "Logo Design",
          "branding",
          "modern",
          "unique"
        ],
        "likedByUsers": []
      },
      {
        "_id": "i104",
        "title": "I will manage your social media accounts effectively",
        "price": 25,
        "owner": {
          "_id": "u103",
          "fullname": "Emily Johnson",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
          "level": "premium",
          "rate": 4.9
        },
        "daysToMake": 7,
        "description": "Maximize your online presence with our social media management services! We'll handle everything from content creation and scheduling to audience engagement and analytics. Let us take the stress out of managing your social media accounts.",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
        "tags": [
          "social-media-management",
          "content-creation",
          "audience-engagement",
          "analytics"
        ],
        "likedByUsers": []
      },
      {
        "_id": "i105",
        "title": "I will design eye-catching graphics for your brand",
        "price": 18,
        "owner": {
          "_id": "u104",
          "fullname": "Michael Brown",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
          "level": "premium",
          "rate": 4.7
        },
        "daysToMake": 4,
        "description": "Elevate your brand with stunning graphics! From posters and flyers to social media graphics and infographics, we'll bring your ideas to life. Our designs are tailored to your brand's aesthetic and messaging, ensuring maximum impact.",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
        "tags": [
          "graphic-design",
          "branding",
          "marketing",
          "visuals"
        ],
        "likedByUsers": []
      },
      {
        "_id": "i106",
        "title": "I will build a custom e-commerce website for your business",
        "price": 30,
        "owner": {
          "_id": "u106",
          "fullname": "David Wilson",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
          "level": "premium",
          "rate": 4.9
        },
        "daysToMake": 10,
        "description": "Take your business online with a custom e-commerce website! Our solutions are tailored to your specific needs, whether you're selling products or services. From user-friendly interfaces to secure payment gateways, we've got you covered.",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
        "tags": [
          "e-commerce",
          "website-development",
          "custom-solutions",
          "online-shopping"
        ],
        "likedByUsers": []
      },
      {
        "_id": "i107",
        "title": "I will create innovative mobile apps for iOS and Android",
        "price": 35,
        "owner": {
          "_id": "u107",
          "fullname": "Daniel Harris",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
          "level": "premium",
          "rate": 4.8
        },
        "daysToMake": 14,
        "description": "Bring your app idea to life with our mobile app development services! Whether it's for iOS or Android, we'll create innovative and user-friendly apps that stand out in the crowded app market. From concept to launch, we'll guide you every step of the way.",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
        "tags": [
          "mobile-app-development",
          "iOS",
          "Android",
          "innovative"
        ],
        "likedByUsers": []
      },
      {
        "_id": "i108",
        "title": "I will optimize your website for search engines",
        "price": 20,
        "owner": {
          "_id": "u108",
          "fullname": "Jessica Lee",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
          "level": "premium",
          "rate": 4.7
        },
        "daysToMake": 5,
        "description": "Increase your online visibility with our SEO optimization services! We'll analyze your website, identify opportunities for improvement, and implement strategies to boost your search engine rankings. Get ready to attract more organic traffic and grow your business.",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
        "tags": [
          "SEO",
          "search-engine-optimization",
          "organic-traffic",
          "website-ranking"
        ],
        "likedByUsers": []
      },
      {
        "_id": "i109",
        "title": "I will be your dedicated virtual assistant",
        "price": 18,
        "owner": {
          "_id": "u109",
          "fullname": "Sarah Johnson",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
          "level": "premium",
          "rate": 4.6
        },
        "daysToMake": 7,
        "description": "Hire a virtual assistant to handle your administrative tasks efficiently! From managing emails and scheduling appointments to data entry and research, we'll take care of the details so you can focus on what matters most – growing your business.",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
        "tags": [
          "virtual-assistant",
          "administrative-tasks",
          "efficiency",
          "remote-support"
        ],
        "likedByUsers": []
      },
      {
        "_id": "i110",
        "title": "I will design your logo1",
        "price": 12,
        "owner": {
          "_id": "u102",
          "fullname": "Dudu Da",
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo1...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo2...",
        "imgUrl": "https://res.cloudinary.com/de2rdmsca/image/upload/v1698329461/promote-your-facebook-page-to-country-targeted-audience_oppvsc.jpg",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo3...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
        "tags": [
          "Logo Design",
          "artistic",
          "professional",
          "accessible"
        ],
        "likedByUsers": ['mini-user'] // for user-wishlist: use $in
      }, {
        "_id": "i113",
        "title": "I will design your logo",
        "price": 12,
        "owner": {
          "_id": "u101",
          "fullname": "Dudu Da",
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo...",
        "imgUrl": "https://res.cloudinary.com/de2rdmsca/image/upload/v1698329461/promote-your-facebook-page-to-country-targeted-audience_oppvsc.jpg",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo1...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo2...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo3...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
        "tags": [
          "Logo Design",
          "artistic",
          "professional",
          "accessible"
        ],
        "likedByUsers": ['mini-user'] // for user-wishlist: use $in
      }, {
        "_id": "i117",
        "title": "I will design your logo",
        "price": 12,
        "owner": {
          "_id": "u101",
          "fullname": "Dudu Da",
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo1...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679340/t-1_ozhsab.webp",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo2...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676247/jason-2_ykqz4t.webp",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo3...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
        "tags": [
          "Logo Design",
          "artistic",
          "professional",
          "accessible"
        ],
        "likedByUsers": ['mini-user'] // for user-wishlist: use $in
      }, {
        "_id": "i121",
        "title": "I will design your logo",
        "price": 12,
        "owner": {
          "_id": "u101",
          "fullname": "Dudu Da",
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676247/jason-2_ykqz4t.webp",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo1...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679340/t-1_ozhsab.webp",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo2...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo3...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676247/jason-2_ykqz4t.webp",
        "tags": [
          "Logo Design",
          "artistic",
          "professional",
          "accessible"
        ],
        "likedByUsers": ['mini-user'] // for user-wishlist: use $in
      }, {
        "_id": "i125",
        "title": "I will design your logo",
        "price": 12,
        "owner": {
          "_id": "u101",
          "fullname": "Dudu Da",
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo1...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo2...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679340/t-1_ozhsab.webp",
        "tags": [
          "Logo Design",
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
          "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make a unique logo3...",
        "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676247/jason-2_ykqz4t.webp",
        "tags": [
          "Logo Design",
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




