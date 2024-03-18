
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
        "title": "I will do hyper realistic pencil portrait by hand drawing",
        "about": "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
        "price": 172,
        "owner": {
          "fullname": "frederickkessie",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
          "level": "basic/premium",
          "rate": 2,
          "userStory": "We are PixxelStudio, A full-service design and developing web agency. From designing logos to developing websites to satisfying our customer’s every digital need is what we thrive for. We’ve worked not only with brilliant individuals but also with top companies all around the world. Our mission is to become an indispensable partner to our clients by offering the best ideas, skills and services they could possibly get.",
          "country": "China",
          "responseTime": "1 hour",
          "languages": "Chinese,English",
          "joined": "Dec 2021",
          "lastDelivery": "45 minutes"
        },
        "country": "Ghana",
        "daysToMake": 26,
        "description": "Hello ! Much obliged for visiting my gig :)\nIn this gig I'm offering you an exceptionally 3 one of a kind, best and reasonable bundles.\nIn case you are thinking for giving somebody uncommon an extremely delightful, eye getting gift( hyper practical hand drawing pencil sketch picture)?\nKindly select the helpful bundle and submit your request at this moment and I'll give you an ideal picture sketch, hand drawing, practical drawing, pencil attracting high goal JPEG/PNG advanced document.\nI will give hand-drawn dark and White or hued reasonable pictures.\nSympathetically give me clear reference photograph however much as could be expected.\nThe material I utilized for Creating pencil representations are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, mono eraser, brush, mixing stump, mechanical pencil, graphite powder and so on .\nYou can give me anything:\nPicture photographs\nFamily photographs\nCreature photographs\nAny item photographs\nScene photographs\nEngineering photographs\nAnything you envision\nKindly reach me prior to submitting your request! Much appreciated.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
        "services": [
          "100% Clean Responsive Design",
          "Ecommerce site Design (Standard and Premium Plans Only)",
          "Multiple Payment Methods (PayPal, Stripe, Bank, Credit Card, etc.)",
        ],
        "imgUrl": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg",
        "tags": [
          "pencil drawing",
          "realistic drawing",
          "hand drawing",
          "portrait drawing",
          "pencil sketch"
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
        "likedByUsers": ["mini-user"],
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
        "title": "I will do hyper realistic pencil sketch portrait by hand drawing",
        "about": "Hello, this is Masuk, stand up for vividstore,I am a young and enthusiastic graphic artist and realistic pencil sketch artist. I am certified as graphic designer from George Washington University, USA. I have almost 11 years experience in this field since my university life. I really love to work with Adobe Illustrator, Adobe Photoshop, and so on as a full time online freelancer. And also passionate about sketching. Thank you.",
        "price": 151,
        "owner": {
          "fullname": "vividstore",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/83cc7c97f9873bdb052590a94d32f84c-1576419363871/ed47443e-0f9b-42ab-beaf-ec0a0acccfe8.jpeg",
          "level": "basic/premium",
          "rate": 4,
          "userStory": "At NexusDesign, we specialize in creating immersive digital experiences that captivate audiences worldwide. From crafting compelling brand identities to building cutting-edge websites, we're committed to exceeding our clients' expectations every step of the way. With a track record of success working with diverse clientele, we strive to be the go-to partner for all digital design and development needs.",
          "country": "Brazil",
          "responseTime": "30 minutes",
          "languages": "Portuguese, Spanish, English",
          "joined": "Jan 2022",
          "lastDelivery": "20 minutes"
        },
        "country": "Bangladesh",
        "daysToMake": 24,
        "description": "Hey ! Thanks for visiting my gig :)\nIn this gig i'm offering you a very 3 unique, preferable and affordable packages.\nIf you are thinking for giving someone special a very beautiful, eye catching gift( hyper realistic hand drawing pencil sketch portrait)?\nPlease select the desirable package and place your order right now and i'll give you a perfect portrait sketch, hand drawing, realistic drawing,pencil drawing in high resolution JPEG/PNG digital file.\nI will provide hand-drawn black & White or colored realistic portraits.\nKindly provide me clear reference photo as much as possible.\nThe material I used for Creating pencil portraits are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, tombomono eraser, brush, blending stump, mechanical pencil, graphite powder etc .\nYou can give me anything:\nPortrait photos\nFamily photos\nAnimal photos\nAny product photos\nLandscape photos\nArchitecture photos\nAnything you imagine\nPlease contact me before placing your order! Thanks.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITAL FILE, IF YOU WANT THE ORIGINAL ONE THEN MESSAGE ME FOR DETAILS.\nFeel free to ask me anything! :)\nThank You...\nvividstore",
        "services": [
          "Custom Graphic Design Solutions",
          "Mobile App Development (iOS and Android)",
          "Search Engine Optimization (SEO) Services",
          "Social Media Integration and Marketing"
      ],
        "imgUrl": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197422311/original/1907136f4b9684daa164acfa5cfedc6035b771b1.jpg",
        "tags": [
          "pencil drawing",
          "realistic drawing",
          "pencil portrait",
          "sketch",
          "pencil sketch"
        ],
        "packages": {
          "basic": {
              "header": "Basic (10 products & 4 pages)",
              "price": "500.00",
              "description": "Build 10 products store + 4 pages + Responsive + Speed Optimization + 30 days free support",
              "time": "5 Days Delivery",
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
              "header": "Standard (15 products & 6 pages)",
              "price": "750.00",
              "description": "Build 15 products store + 6 pages + Responsive + Speed Optimization + 60 days free support",
              "time": "7 Days Delivery",
              "included": [
                  "Functional website",
                  "6 pages",
                  "Responsive design",
                  "E-commerce functionality",
                  "15 products",
                  "Payment processing"
              ]
          },
          "premium": {
              "header": "Premium (20 products & 8 pages)",
              "price": "1000.00",
              "description": "Build 20 products store + 8 pages + Responsive + Speed Optimization + 90 days free support",
              "time": "10 Days Delivery",
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
        "likedByUsers": ["mini-user"]
      },
      {
        "_id": "i103",
        "title": "I will draw a hyperrealistic portrait of face or entire body and animals",
        "about": "Hello! I'm a brazilian artist specialized in hyperrealistic drawings and paintings of human figures and animals, i use a diversity of techniques like Oil painting, dry pastel drawing and pencil. I have over 30 years of experience, check out my portfolio.",
        "price": 198,
        "owner": {
          "fullname": "andreacarvalho_",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg",
          "level": "basic/premium",
          "rate": 5,
          "userStory": "Welcome to TechCrafters, your premier destination for innovative digital solutions. From sleek logo designs to robust website development, we are dedicated to elevating your online presence and exceeding your expectations. With a global clientele spanning industries, we are committed to delivering unparalleled creativity and expertise to every project.",
          "country": "Australia",
          "responseTime": "45 minutes",
          "languages": "English",
          "joined": "Feb 2020",
          "lastDelivery": "1 hour"
        },
        "country": "Brazil",
        "daysToMake": 4,
        "description": "Desenho de lápis hiperrealista da sua foto, posso adicionar detalhes de fundo e personalizar o desenho do jeito que você quiser.",
        "services": [
          "UI/UX Design Consultation and Prototyping",
          "Content Management System (CMS) Integration",
          "Secure Payment Gateway Integration",
          "Website Maintenance and Support Packages"
      ],
        "imgUrl": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/155512325/original/9d62fbdec2b0bffd0318f9af43c2de023b62f5f0.jpg",
        "tags": ["pencil", "drawing", "portrait", "realistic", "painting"],
        "packages": {
          "basic": {
              "header": "Basic (10 products & 4 pages)",
              "price": "400.00",
              "description": "Build 10 products store + 4 pages + Responsive + Speed Optimization + 30 days free support",
              "time": "5 Days Delivery",
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
              "header": "Standard (15 products & 6 pages)",
              "price": "600.00",
              "description": "Build 15 products store + 6 pages + Responsive + Speed Optimization + 60 days free support",
              "time": "7 Days Delivery",
              "included": [
                  "Functional website",
                  "6 pages",
                  "Responsive design",
                  "E-commerce functionality",
                  "15 products",
                  "Payment processing"
              ]
          },
          "premium": {
              "header": "Premium (20 products & 8 pages)",
              "price": "800.00",
              "description": "Build 20 products store + 8 pages + Responsive + Speed Optimization + 90 days free support",
              "time": "10 Days Delivery",
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
        "likedByUsers": ["mini-user"],
        "reviews": [
          {
            "name": "rachelrbarnes1",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Incredibly grateful for the amazing experience working with you . You are so talented and a kind soul! I highly recommend if you want high quality art to work with her every time",
            "reviewedAt": "Published 1 month ago"
          },
          {
            "name": "mark001994",
            "country": "Austria",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
            "review": "The artist was very kind and polite also very fast at the communication. The delivery of the project was on time. And her work is worth the money. I'm really excited about the painting she did. I can truely recommend the Aritst and her work. Big Thanks! :)",
            "reviewedAt": "Published 1 month ago"
          },
          {
            "name": "thurstonrobby",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "incredible on how precise that art is, picture perfect. 100% amazing job and I will use your services again ...",
            "reviewedAt": "Published 3 weeks ago"
          },
          {
            "name": "gavrielm",
            "country": "Israel",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png",
            "review": "amazing saller and great work",
            "reviewedAt": "Published 6 days ago"
          },
          {
            "name": "garebear52",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Beautiful drawing! Just what I wanted.",
            "reviewedAt": "Published 1 week ago"
          }
        ]
      },
      {
        "_id": "i104",
        "title": "I will write sociology,psychology and social sciences articles",
        "about": "My name is Mary , a graduate from Mount Kenya University, I am professional writer and my focus is to every single detail. I will transform your dream to reality. I am experienced in article, project/content writing for a couple of years. Furthermore, I have a long history of writing research-focused content and projects. My ultimate goal is to closely with my client to deliver quality and comprehensive project. Let's take your business to the next level. Thank you",
        "price": 116,
        "owner": {
          "fullname": "winny_writer",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/e34531bf0bbed9d144dba7384f6473b6-1621577835789/60307055-cde9-4dc2-9e9e-4daa421991d3.jpg",
          "level": "basic/premium",
          "rate": 2,
          "userStory": "At CreativeSolutions, we are committed to turning your digital dreams into reality. From stunning website designs to seamless user experiences, we're here to exceed your expectations. With a global clientele and a passion for innovation, we're your go-to partner for all things digital.",
          "country": "United States",
          "responseTime": "2 hours",
          "languages": "English",
          "joined": "Jan 2022",
          "lastDelivery": "1 hour"
        },
        "country": "Kenya",
        "daysToMake": 28,
        "description": "Hello, welcome to my Gig, I write sociology psychology and all social sciences content\nI am an expert writer who can help you with writing essays, research projects, and articles on criminology, sociology, and psychology. I gained so much experience over the time. i can handle papers from undergraduate all the way to PHD in criminology and sociology and psychology.\nI always strive to provide best quality to my clients and provide plagiarism-free work. I am also familiar with the following reference formats: APA, MLA, HARVARD, CHICAGO\nPlease contact me before placing an order, thank you.",
        "services": [
          "Custom Logo Design",
          "Mobile App Development",
          "Search Engine Optimization (SEO)"
      ]
    ,  
        "imgUrl": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/207813409/original/9557f50a12d8fccb5c52fb65b35f91cc036f99c6.jpg",
        "tags": ["technical writing"],
        "packages": {
          "basic": {
              "header": "Basic Package",
              "price": "200.00",
              "description": "Includes basic features",
              "time": "5 Days Delivery",
              "included": [
                  "Feature 1",
                  "Feature 2",
                  "Feature 3"
              ]
          },
          "standard": {
              "header": "Standard Package",
              "price": "400.00",
              "description": "Includes standard features",
              "time": "7 Days Delivery",
              "included": [
                  "Feature 1",
                  "Feature 2",
                  "Feature 3",
                  "Feature 4"
              ]
          },
          "premium": {
              "header": "Premium Package",
              "price": "600.00",
              "description": "Includes premium features",
              "time": "10 Days Delivery",
              "included": [
                  "Feature 1",
                  "Feature 2",
                  "Feature 3",
                  "Feature 4",
                  "Feature 5"
              ]
          }
      }
    ,  
        "likedByUsers": ["mini-user"],
        "reviews": [
          {
            "name": "far832013",
            "country": "Canada",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png",
            "review": "I had a bad experience…. The work doesn’t match the requirement at all. Although l sent a specific and detailed question, l received a general answer. Not recommend and will not deal again.",
            "reviewedAt": "Published 2 months ago"
          },
          {
            "name": "rehanmirdk",
            "country": "Denmark",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1f0.png",
            "review": "She was excellent in communicating, using my references to write a proper academic paper in sociology, and finish in only 15 hours after getting questions. Most recommended seller!",
            "reviewedAt": "Published 3 weeks ago"
          },
          {
            "name": "raevyn22",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Exactly what I asked for",
            "reviewedAt": "Published 8 hours ago"
          },
          {
            "name": "raevyn22",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Always gets the job done",
            "reviewedAt": "Published 1 day ago"
          },
          {
            "name": "junyeongcho",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "She could understand the contents and write well",
            "reviewedAt": "Published 3 days ago"
          }
        ]
      },
      {
        "_id": "i105",
        "title": "I will do data entry, copy paste, web research as your VA",
        "about": "Hello! This is Rashin Faria, a Data Entry Specialist & Virtual Assistant at your service. I have excellent experience in Data Entry, Data Processing, Data Uploading, MS Word/Excel, Google Spreadsheet, PDF, Web Research, Ecommerce Product Entry, Data Scraping and others. With a 24/7 supporting team we work together for the betterment of the projects. We have extensive experience to do our project very fast and professionally. Client satisfaction is our first priority. Order Now! Regards Rashin Faria",
        "price": 200,
        "owner": {
          "fullname": "rashin07",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/1fe02234f0b300905f098d1c2eef2599-1621414093019/30dd09bd-748a-49c0-b3bc-ee3071bdfadb.jpg",
          "level": "basic/premium",
          "rate": 5,
          "userStory": "Welcome to TechGenius, where creativity meets technology. Our team of experts is dedicated to delivering cutting-edge digital solutions that drive results. From sleek website designs to powerful e-commerce platforms, we're here to elevate your online presence.",
          "country": "Canada",
          "responseTime": "45 minutes",
          "languages": "English, French",
          "joined": "Mar 2020",
          "lastDelivery": "30 minutes"
        },
        "country": "Bangladesh",
        "daysToMake": 9,
        "description": "Hello Sir/Ma'am,\nHave a cordial welcome to Rashin07’s outstanding services on Fiverr.\nAre you searching for a trustworthy virtual assistant for your projects regarding data entry? I’m here to help. I’m an enthusiastic, hard-working and detail-oriented working person who has developed a mature and responsible approach to any task that I undertake. With excellent teamwork, we always try to work with dedication to achieve a certain objective on time. We are always at your service to provide budget-friendly qualitative work. Check out the following services & Order Now.\nOur Services:\nWeb Research\nCopy Paste Jobs\nData Entry\nData Scraping\nData Conversion (PDF/Image to excel)\nProduct Listing\nShopify / Woo-commerce Product Entry\nLead Generation\nMS Excel (Data Cleaning/Formatting /Chart/Macro)\nManual Typing\nAnd more!\nOur Specialties:\n24/7 customer service\nUnlimited Revisions\nOn-time delivery\nWork efficiently\nPrompt response\nNOTE – Please contact me before placing an order. Feel free to discuss the project & set the right estimations for you.\nRegards\nRashin Faria\nData Entry | Copy Paste | Web Scraping | Web Research | Product Entry",
        "services": [
          "Social Media Marketing",
          "Content Writing",
          "Website Maintenance"
      ]
    ,  
        "imgUrl": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/207580502/original/6d05bb9cde191b9423733c6b49d0e11892e35ee0.jpg",
        "tags": [
          "web research",
          "manual typing",
          "data entry",
          "copy paste",
          "product listing"
        ],
        "packages": {
          "basic": {
              "header": "Basic Plan",
              "price": "250.00",
              "description": "Includes basic services",
              "time": "3 Days Delivery",
              "included": [
                  "Service A",
                  "Service B"
              ]
          },
          "standard": {
              "header": "Standard Plan",
              "price": "500.00",
              "description": "Includes standard services",
              "time": "5 Days Delivery",
              "included": [
                  "Service A",
                  "Service B",
                  "Service C"
              ]
          },
          "premium": {
              "header": "Premium Plan",
              "price": "750.00",
              "description": "Includes premium services",
              "time": "7 Days Delivery",
              "included": [
                  "Service A",
                  "Service B",
                  "Service C",
                  "Service D"
              ]
          }
      }
    ,  
        "likedByUsers": ["mini-user"],
        "reviews": [
          {
            "name": "threeangelsuk",
            "country": "United Kingdom",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
            "review": "Daisy accept the job. However, I think my job could have been done in the hours set and it was not. I would not use again from this experience.",
            "reviewedAt": "Published 1 month ago"
          },
          {
            "name": "kasper711",
            "country": "Netherlands",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f1.png",
            "review": "Clear communication, did the job!",
            "reviewedAt": "Published 1 day ago"
          },
          {
            "name": "jmorgenstern82",
            "country": "New Zealand",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1ff.png",
            "review": "Provided exactly what was required, quickly, and with great communication. Thank you.",
            "reviewedAt": "Published 2 days ago"
          },
          {
            "name": "philipgrewin",
            "country": "Sweden",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f8-1f1ea.png",
            "review": "Great, faster than expected!",
            "reviewedAt": "Published 4 days ago"
          },
          {
            "name": "beanfiver",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Efficient! Great communicator! Highly recommended!",
            "reviewedAt": "Published 1 week ago"
          }
        ]
      },
      {
        "_id": "i106",
        "title": "I will do data entry,web research and lead generation work in excel",
        "about": "Hello fiverr community,my name is Muhammad Waqar and i'm here to help you with your lead generation, web research and data entry projects. We are a group of experts which work together for the betterment of the projects we take from our clients. So don't forget to reach out me for your next project. Thank you very much",
        "price": 134,
        "owner": {
          "fullname": "waqarcreatives",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/7928a9bdb9e68c7dcc870f7dac91d92b-768025031598387384699/JPEG_20200826_012943_1616096493516260103.jpg",
          "level": "basic/premium",
          "rate": 4,
          "userStory": "At DigitalDreams, we're passionate about creating digital experiences that inspire and engage. With a focus on innovation and creativity, we strive to deliver solutions that exceed your expectations. Partner with us and let's bring your vision to life.",
          "country": "Australia",
          "responseTime": "1 hour",
          "languages": "English",
          "joined": "Nov 2021",
          "lastDelivery": "40 minutes"
        },
        "country": "Pakistan",
        "daysToMake": 10,
        "description": "Looking for an experienced data entry expert? don't waste your time, just hire me and relax.\nWe are team of qualified professionals for guaranteed high quality work to our clients\nI will provide professional data entry work, data collecting from web, table graphs and all type of internet research like research related to businesses, companies information and enter into excel within fastest possible time.\nWhether you have big project like thousands of rows entries in excel or very tiny project like minutes of work, i'm here to provide you highly satisfied experience for your project.\nHere are the services we offer:\nData Entry\nWeb Research\nLead Generation\nCopy Paste Work\nCompanies Data Research\nInternet Research\nData Conversion into Excel\nTyping in Excel\nProperty Research\nCopy Paste Work\nPDF to Excel\nFormatting of excel sheets\nWhy hire me?\nGuaranteed quality work\nAll time communication during the project within Fiverr\nQuick Turnaround\nI will give my best and 100% to the project\nI can provide sample for the satisfaction before the order\nFeel free and don't hesitate to contact us for superior work\nNote: All communication and payment should be done via the fiverr platform.",
        "services": [
          "Graphic Design",
          "UI/UX Design",
          "Print Design"
      ]
    ,  
        "imgUrl": "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/125727662/original/b6712086c2fe1a26a51cb660bc38cc87c1ff5cbc/design-a-unique-sports-mascot-esports-and-gaming-logo.jpg",
        "tags": [
          "web research",
          "data entry",
          "lead generation",
          "data entry excel",
          "data entry typing"
        ],
        "packages": {
          "basic": {
              "header": "Basic Bundle",
              "price": "300.00",
              "description": "Includes basic features",
              "time": "4 Days Delivery",
              "included": [
                  "Feature X",
                  "Feature Y"
              ]
          },
          "standard": {
              "header": "Standard Bundle",
              "price": "600.00",
              "description": "Includes standard features",
              "time": "6 Days Delivery",
              "included": [
                  "Feature X",
                  "Feature Y",
                  "Feature Z"
              ]
          },
          "premium": {
              "header": "Premium Bundle",
              "price": "900.00",
              "description": "Includes premium features",
              "time": "8 Days Delivery",
              "included": [
                  "Feature X",
                  "Feature Y",
                  "Feature Z",
                  "Feature W"
              ]
          }
      }
    ,  
        "likedByUsers": ["mini-user"],
        "reviews": [
          {
            "name": "elliottbz",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "He cared a lot and asked questions, which showed me he wants to give quality work. That was really appreciated.",
            "reviewedAt": "Published 1 month ago"
          },
          {
            "name": "jeradg21",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Muhammad was responsive and did a good job collecting the information for a very reasonable price. His English isn't perfect, but we didn't struggle to communicate. If you give good directions, you'll get good results.",
            "reviewedAt": "Published 1 month ago"
          },
          {
            "name": "dustinolsen1",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "This was my second time working with waqarcreatives and I love the quickness and level of accuracy. If he doesn't understand something, he asks for clarification before starting the project.",
            "reviewedAt": "Published 2 months ago"
          },
          {
            "name": "kenneth8239",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Outstanding work. This is the 2nd project that WaqarCreatives completed for me, and I will be back to hire them again!",
            "reviewedAt": "Published 1 week ago"
          },
          {
            "name": "heirloomclean",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Super efficient - Does amazing work. Have several orders with this seller and they always perform. Thank you so much",
            "reviewedAt": "Published 2 months ago"
          }
        ]
      },
      {
        "_id": "i107",
        "title": "I will do data entry, copy paste and excel data entry work for you",
        "about": "I've been working as a Data entry operator for many years. I have a big team with so many professional people for managing data entry tasks. We believe that high quality and customer satisfaction is the most important thing for us. Feel free to drop a message for discussing your needs and objectives.",
        "price": 73,
        "owner": {
          "fullname": "masum245",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/8a1623fd3276ad7297d7647a8727bdf0-1589096119095/6c637953-9dc0-4c9c-b04d-c13c947fdc43.jpg",
          "level": "basic/premium",
          "rate": 2,
          "userStory": "Welcome to CodeCrafters, your trusted partner for all things digital. From website design to mobile app development, we're here to bring your ideas to life. Our team combines creativity and expertise to deliver solutions that drive success.",
          "country": "United Kingdom",
          "responseTime": "30 minutes",
          "languages": "English",
          "joined": "Feb 2023",
          "lastDelivery": "20 minutes"
        },
        "country": "Bangladesh",
        "daysToMake": 24,
        "description": "Hi, Welcome to my Gig page on Fiverr.com!\nNote: Please contact me first before placing an order to check the availability and price estimate of your project.\nDescription:\nDo you need a perfect and professional virtual assistant for Data Entry,Excel Data Entry, Copy Paste Work, Typing Work , Data mining, Data collection using MS Excel, MS Word, Google Spreadsheet or Google doc? Yes, you are in the right place. Please check out my expertise below and the gig extras I'm offering.\nData Entry\nCopy Paste Work\nExcel Data Entry\nProduct Listing\nShopify Product listing\nCRM Data Entry\nData Scraping\nData Conversion\nPDF to Excel or Word\nJPEG to Excel or Word\nTyping in Excel or Word\nBusiness Card Entry\nWordPress Data Entry\nE-commerce Products Listing\nWeb Research and Web Scrapping\nData Collection from Linkedln/Instagram\nProperty Research, Public Record Search\nReal Estate Research and Data Entry (Name, Email, Phone, Address, etc)\nWhy trust me?\nPositive Customer Reviews\nQuick Reply.\nOn-time delivery\nQuality Customer Support\nEfficient time of working\nP.S. - We don't deal with anything outside of Fiverr. Never share your personal information. Thanks!",
        "services": [
          "Website Redesign",
          "E-commerce Integration",
          "Payment Gateway Setup"
      ]
    ,  
        "imgUrl": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/156250659/original/694e80206bfd8cebf4e950fd073d382ed0fcd20a.jpg",
        "tags": [
          "typing job",
          "excel data entry",
          "virtual assistant",
          "data entry",
          "copy paste"
        ],
        "packages": {
          "basic": {
              "header": "Basic Subscription",
              "price": "150.00",
              "description": "Includes basic services",
              "time": "7 Days Delivery",
              "included": [
                  "Service M",
                  "Service N"
              ]
          },
          "standard": {
              "header": "Standard Subscription",
              "price": "300.00",
              "description": "Includes standard services",
              "time": "10 Days Delivery",
              "included": [
                  "Service M",
                  "Service N",
                  "Service O"
              ]
          },
          "premium": {
              "header": "Premium Subscription",
              "price": "450.00",
              "description": "Includes premium services",
              "time": "14 Days Delivery",
              "included": [
                  "Service M",
                  "Service N",
                  "Service O",
                  "Service P"
              ]
          }
      }
    ,  
        "likedByUsers": ["mini-user"],
        "reviews": [
          {
            "name": "rechtlogisch",
            "country": "Germany",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png",
            "review": "There was no communication besides delivering. Receiving a short message with an estimate on delivery time would help to make the process more transparent. Otherwise it seems that the task was forgotten.",
            "reviewedAt": "Published 2 months ago"
          },
          {
            "name": "barcoxx",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Pros: Communication response time was amazing. Project delivered in the time promised. Quick Response to revision requests. Cons: Got a little bit impatient with me for asking for consecutive revisions, which was actually due to his own oversight, but it all worked out in the end.",
            "reviewedAt": "Published 2 months ago"
          },
          {
            "name": "teamcafelist",
            "country": "Singapore",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f8-1f1ec.png",
            "review": "Seller was committed to the task despite the scope stretching beyond the 2hours. He spent more time and completed the sheet, but was very nice about it. I had to tip him because the work done was definitely worth more. Despite having some inaccuracy and formatting issues, I think he did his best",
            "reviewedAt": "Published 2 months ago"
          },
          {
            "name": "brisbanerrr",
            "country": "Singapore",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f8-1f1ec.png",
            "review": "Seller went above and beyond, super fast and did much more work than we expected he would be able to get done within the allotted hours. Reordering immediately.",
            "reviewedAt": "Published 1 month ago"
          },
          {
            "name": "treydurden",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Masum really came through on this task, painful and time consuming, he stayed on it and made it happen. So Happy. Thank you a 1000 times.",
            "reviewedAt": "Published 2 weeks ago"
          }
        ]
      },
      {
        "_id": "i108",
        "title": "I will do excel data entry, copypaste, and any type of data entry",
        "about": "I'm glad you're here! My name is Abrar Hussain. I’m a professional Transcriptionist and data entry expert. I’ve a BS degree in Mechanical engineering. From last more than three years, I’ve been working as a Data entry operator and English language transcriptionist. To me, customer satisfaction and providing the best quality work are always my top priorities. I’m really good at MS Office and Transcript. Get yourselves a skillful creator and professional Assistant by simply contacting me. So, drop a message, and let's get started. I am also available for long term projects. Thanks!",
        "price": 106,
        "owner": {
          "fullname": "abrar_029",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/798a61194492b92313c2f5b27d5397bb-1615924783131/a6a1c7f0-0cc0-4c50-95e1-2693d183ee1c.jpg",
          "level": "basic/premium",
          "rate": 2,
          "userStory": "At PixelPerfect, we believe in the power of great design. From sleek websites to eye-catching graphics, we're here to make your brand stand out. Let's work together to create something amazing.",
          "country": "Germany",
          "responseTime": "1 hour",
          "languages": "German, English",
          "joined": "May 2022",
          "lastDelivery": "50 minutes"
        },
        "country": "Pakistan",
        "daysToMake": 28,
        "description": "I will do excel data entry, copy paste, and any type of data entry\nHello, Welcome to my Gig. Are you looking for a professional virtual assistant for, Excel Data Entry, Typing Work Copy Paste Work, Data Entry, Data collection, Data mining, using MS Word, MS Excel, Google doc, or Google Spreadsheet? Then, you are at the right place. Following are the services that I'm offering.\nExcel Data Entry\nCopy Paste Work\nShopify Product listing\nProduct Listing\nData Entry\nData Conversion\nData Scraping\nJPEG to Excel or Word\nPDF to Excel or Word\nTyping in Excel or Word\nWordPress Data Entry\nWeb Research and Web Scrapping\nE-commerce Products Listing\nProperty Research, Public Record Search\nData Collection from LinkedIn/Instagram\nReal Estate Research and Data Entry (Name, Email, Phone, Address, etc.)\nWhy chose me?\nExtra fast delivery\n100% Quality assurance\nlowest possible rates\nQuick Reply.\nUnlimited Revisions to make sure Maximum customer satisfaction\nData Security\nPlease contact me before placing an order and get my free consultancy about the project how to do it in the best possible way. Also If you need sample work Please feel free to demand.\nThanks & Regards,\nAbrar Hussain",
        "services": [
          "Blog Development",
          "Email Marketing Campaigns",
          "Video Production"
      ]
    ,  
        "imgUrl": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/199776653/original/b710f145db1a54491e2d777831107c0174c78565.png",
        "tags": [
          "excel data entry",
          "virtual assistant",
          "data entry",
          "copy paste",
          "typing jobs"
        ],
        "packages": {
          "basic": {
              "header": "Basic Bundle",
              "price": "280.00",
              "description": "Includes basic features",
              "time": "5 Days Delivery",
              "included": [
                  "Feature A",
                  "Feature B",
                  "Feature C"
              ]
          },
          "standard": {
              "header": "Standard Bundle",
              "price": "520.00",
              "description": "Includes standard features",
              "time": "7 Days Delivery",
              "included": [
                  "Feature A",
                  "Feature B",
                  "Feature C",
                  "Feature D"
              ]
          },
          "premium": {
              "header": "Premium Bundle",
              "price": "780.00",
              "description": "Includes premium features",
              "time": "10 Days Delivery",
              "included": [
                  "Feature A",
                  "Feature B",
                  "Feature C",
                  "Feature D",
                  "Feature E"
              ]
          }
      }
    ,  
        "likedByUsers": ["mini-user"],
        "reviews": [
          {
            "name": "mac_x711",
            "country": "Thailand",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png",
            "review": "As usual, Abrar has been totally amazing in every work that's assigned to him. Words can't be expressed how awesome he is in doing anything that's assigned of him. I'm just thankful that he's always there for me and he goes above and beyond on what I asked of him. He's simply the best. Looking forward to our next projects 😊😊",
            "reviewedAt": "Published 1 month ago"
          },
          {
            "name": "applist22",
            "country": "Austria",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
            "review": "Abrar and his team did an amazing job. The communication was great and he was every time available to discuss the project and when problems popped up he was flexible and agile to solve them with great effort & motivation. He provided first-class delivery and project management skills and is a reliable partner for any kind of project! I will work with him in the near future again - was a great pleasure and I'm very satisfied!",
            "reviewedAt": "Published 2 months ago"
          },
          {
            "name": "brandersongroup",
            "country": "United Kingdom",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
            "review": "I’ve worked with Abrar before, and once again he did a great job with what I’d asked him to do. Will definitely be working with him again.",
            "reviewedAt": "Published 2 months ago"
          },
          {
            "name": "schneida",
            "country": "Austria",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
            "review": "It was a pleasure to work with Abrar and his team. He is fast responding and an awesome problem solver who always reaches the goals for his clients. He is on my shortlist for other jobs in the future for sure.",
            "reviewedAt": "Published 1 month ago"
          },
          {
            "name": "jarrodrandol238",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "This is my second project with him. Delivered on time and exactly how I asked. I would hire him if he lived in Florida!!!",
            "reviewedAt": "Published 2 days ago"
          }
        ]
      },
      {
        "_id": "i109",
        "title": "I will design 3 modern minimalist flat logo designs",
        "about": "Hello! My name is VD. I am a connoisseur of art and music. I love being around nature and my pets. I have a team of professional graphic designers with an experience of 8+ years. We specialize in logo designing. We're available exclusively on fiverr to rock your world with our designing skills. Come and experience it for yourself!",
        "price": 170,
        "owner": {
          "fullname": "design_desk",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/044fb5914a845a4eb59fc2b69f7f7b32-1634120039750/4dbc2acb-7322-4cd0-9afb-e5190e8e8a0d.jpg",
          "level": "basic/premium",
          "rate": 3,
          "userStory": "At PixelPerfect, we believe in the power of great design. From sleek websites to eye-catching graphics, we're here to make your brand stand out. Let's work together to create something amazing.",
          "country": "Germany",
          "responseTime": "1 hour",
          "languages": "German, English",
          "joined": "May 2022",
          "lastDelivery": "50 minutes"
        },
        "country": "India",
        "daysToMake": 16,
        "description": "Hi there ! Thanks for stopping by !!\nA Team of Talented Graphic Designer with 8+ years of experience in Graphic Industry, expertise as Logo Maker, You'll get creative & AWESOME logo design for your business.\nMy portfolio : https://www.fiverr.com/users/design_desk/portfolio/NjFiYjE4NmMwZTgwMDUwMDAxZTMzMjJh\n★ Why Us? ★\nTalented Logo Maker Team\nFully custom made, creative, original, UNIQUE and AWESOME designs\nProfessional customer support 24/7\nHigh Quality work\n100% money back policy if not satisfied\n★ WHAT DO YOU GET? ★\n✔ Highly Professional, UNIQUE & High Quality designs\n✔ UNLIMITED revisions until u r 100% satisfied\n✔ Fast turn around time 24 to 48 hours only.\n✔ 100% original & unique vector design from Adobe Illustrator\n✔ Vector Source Files (scalable without any quality loss) (AI, EPS, PDF) for the final design ✔ PROFESSIONAL Communication & Outstanding Customer Support ✔ Guaranteed High Quality work\nIf you have any question,\nFeel free to★ Contact Me! ★I'll be happy to help !\nLet's get started!\n-Your Logo Maker",
        "services": [
          "Web Hosting Services",
          "Domain Registration",
          "Copywriting"
      ]
    ,  
        "imgUrl": "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/243230998/original/614d3e3325f660976fc3000e1c2ecfedd0639fee/design-esports-twitch-mascot-and-gaming-logo.jpg",
        "tags": [
          "minimalist",
          "flat",
          "logo design",
          "modern",
          "unique",
          "logo maker"
        ],
        "packages": {
          "basic": {
              "header": "Basic Plan",
              "price": "180.00",
              "description": "Includes basic services",
              "time": "3 Days Delivery",
              "included": [
                  "Service X",
                  "Service Y"
              ]
          },
          "standard": {
              "header": "Standard Plan",
              "price": "360.00",
              "description": "Includes standard services",
              "time": "5 Days Delivery",
              "included": [
                  "Service X",
                  "Service Y",
                  "Service Z"
              ]
          },
          "premium": {
              "header": "Premium Plan",
              "price": "540.00",
              "description": "Includes premium services",
              "time": "7 Days Delivery",
              "included": [
                  "Service X",
                  "Service Y",
                  "Service Z",
                  "Service W"
              ]
          }
      }
    ,  
        "likedByUsers": ["mini-user"],
        "reviews": [
          {
            "name": "airbornesnow",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "The seller's communication was EXCELLENT and the service was exactly as described. When I wanted revisions, they did not hesitate to provide me with alterations of the design. Although they were nice and kind when I asked for the revisions, all the revisions were half a**ed and sloppy. Even when I provided a concept drawing for them to TRACE, the results were still not what I expected. Buyers BEWARE: The seller's communication is excellent, friendly, and VERY kind. However, if you ask for any revisions, the revisions you will receive will be sloppy and half-a**ed.",
            "reviewedAt": "Published 4 days ago"
          },
          {
            "name": "jacobmnb",
            "country": "United Kingdom",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
            "review": "I thought this service was amazing, I bought the basic option just hoping for a basic logo, but the seller went above my expectations and provided me with a bunch of concepts that were better than I could have imagined, for £7.90 I think this service is a must-buy for anyone needing a professional-looking logo and not wanting to spend a huge amount",
            "reviewedAt": "Published 2 months ago"
          },
          {
            "name": "ashtonpeckham",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "The seller was very responsive. We had revisions after the initial designs were delivered and the seller made them very quickly. The logo we selected is perfect for our current needs. Recommend including your vision in the initial request so you don't end up with ideas that you don't like. There were only 2 real contenders because the Fiverr site wouldn't allow me to attach my hand drawn idea. The paperclip icon was essentially rendered inactive, even after several attempts. This is no fault of the designers; i should have been even more descriptive with my request when I was unable to attach files.",
            "reviewedAt": "Published 1 week ago"
          },
          {
            "name": "borowski10",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Ultimately, I am very happy with the final logo I received. However, the seller's communication could have been better. There were a few times I asked for specific revisions and I was sent the same thing or something else that I didn't ask for. It took about 2 weeks for me to finally get what I was looking for. In the end, I got what I paid for and I am grateful for the service!",
            "reviewedAt": "Published 2 days ago"
          },
          {
            "name": "fowlplay_uk",
            "country": "United Kingdom",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
            "review": "VD was great. I had a very specific design in mind already that I needed recreating professionally and they did not disappoint. Even when I started to get picky with the design, nothing I requested was ever too much trouble. We went through many revisions to get it to exactly how I wanted it and every interaction we had was effortless. This is the first project I'd commissioned so wasn't really sure on the correct etiquette, yet VD made things so easy for me. Can't recommend these guys enough for that",
            "reviewedAt": "Published 2 months ago"
          }
        ]
      },
      {
        "_id": "i110",
        "title": "I will create modern unique and creative logo design",
        "about": "I am a professional graphics designer from PakIsTaN... Designing is not only my job, it's my Passion. All I need from you is a rough sketch of your idea. Then you can just relax and see the magic happening. Not only you'll get stunning and professional designs, but also you'll have top class custome",
        "price": 61,
        "owner": {
          "fullname": "soduzai_gfx1",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/a2dd1a0482bbfe54e61c6c2d6e64696e-1640431251801/943f73b5-dc43-4fe4-9728-9a58f0aafdbc.jpg",
          "level": "basic/premium",
          "rate": 3,
          "userStory": "Welcome to WebWizards, where innovation meets expertise. Our team of skilled professionals is dedicated to delivering high-quality digital solutions that drive growth. Partner with us and take your online presence to the next level.",
          "country": "Spain",
          "responseTime": "1 hour",
          "languages": "Spanish, English",
          "joined": "Aug 2021",
          "lastDelivery": "55 minutes"
        },
        "country": "Pakistan",
        "daysToMake": 2,
        "description": "Hi esteemed buyer!\nLooking for modern unique and creative 2d or 3d logo design? Yes, you're at the right place.\nHaving a vast experience with hundreds of satisfied customers across the globe, I extend my services to design modern unique and creative logo design to represent your brand idea in a befitting manner.\nWhat proves my individuality over others?\nQuick delivery, quality work and transforming your brain idea into a 3d creative unique and modern logo design are my attributes.\nMY GIG OFFERINGS ARE:\nBest customer care\nRevisions within 24 Hours\n100% satisfaction guaranteed\nModern unique and creative designing ideas\nLogically and aesthetically hypnotizing logos\n1 free revision after completion of order\nEditable and re-sizeable vector files\nFont download link included\nHigh resolution final files in zip\nNote: For Complex Illustrations and Mascots, please discuss in inbox before placing order! It is also not included in our packages.\nHave queries? Contact us in inbox anytime!\n★Hearing from you would be an absolute pleasure, Go ahead and ORDER NOW!★",
        "services": [
          "Custom Web Application Development",
          "CRM Integration",
          "Chatbot Development"
      ]
    ,  
        "imgUrl": "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/288950630/original/923220b5a5dc5f5a1af2c2e7ab491fba9af2bc38/design-a-playful-and-modern-logo-and-brand-identity-for-you.jpg",
        "tags": [
          "modern logo",
          "creative logo",
          "logo design",
          "unique logo",
          "logo maker"
        ],
        "packages": {
          "basic": {
              "header": "Basic Package",
              "price": "250.00",
              "description": "Includes basic features",
              "time": "4 Days Delivery",
              "included": [
                  "Feature P",
                  "Feature Q"
              ]
          },
          "standard": {
              "header": "Standard Package",
              "price": "500.00",
              "description": "Includes standard features",
              "time": "6 Days Delivery",
              "included": [
                  "Feature P",
                  "Feature Q",
                  "Feature R"
              ]
          },
          "premium": {
              "header": "Premium Package",
              "price": "750.00",
              "description": "Includes premium features",
              "time": "8 Days Delivery",
              "included": [
                  "Feature P",
                  "Feature Q",
                  "Feature R",
                  "Feature S"
              ]
          }
      }
    ,  
        "likedByUsers": ["mini-user"],
        "reviews": [
          {
            "name": "devsreads",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Thank you SO MUCH to the seller. He was so patient and willing to work and correct as many times as we needed as some things got miscommunicated and he easily fixed them. Thank you!!!",
            "reviewedAt": "Published 3 days ago"
          },
          {
            "name": "raymondyslas",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "This designer is awesome. I have got my idea materialised in an efficient manner and the way I wanted. Seeing this logo, I would say this is the best designer to do any kind of graphics work.",
            "reviewedAt": "Published 1 month ago"
          },
          {
            "name": "gbsol579",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "This designer is so quick and efficient in his work. My order was delivered in few hours. The design is hypnotizing and truly reflects my business idea. Highly recommended!",
            "reviewedAt": "Published 1 month ago"
          },
          {
            "name": "antoniodixon65",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "This is a really good design. The designer owes the skills needed to actually understand and then materailize a buyer's idea. Commendable and highly recommended.",
            "reviewedAt": "Published 1 month ago"
          },
          {
            "name": "allendrozdowski",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "This designer has done a fantastic job. I like the design sense and colour combination of the designer. This is what I was looking for. I highly recommend him for graphics related work.",
            "reviewedAt": "Published 1 month ago"
          }
        ]
      },
      {
        "_id": "i111",
        "title": "I will design 3 modern minimalist logo design",
        "about": "I am a professional artist having rich experience in hand sketched and digital artwork. I have served tons of businesses with smarter business solutions. I am here to get the global exposure and would like to contribute more towards our creative community. Thanks.",
        "price": 89,
        "owner": {
          "fullname": "modernmarvel",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d366617946e54cbc9aa114f27259e3ef-1552848300306/3c155f72-15c9-47d0-8f68-b75a519a7999.jpg",
          "level": "basic/premium",
          "rate": 4,
          "userStory": "Welcome to WebWorks, your digital solutions partner. From website design to e-commerce development, we're here to help you succeed online. Let's collaborate and build something amazing together.",
          "country": "Brazil",
          "responseTime": "1 hour",
          "languages": "Portuguese, English",
          "joined": "Dec 2019",
          "lastDelivery": "35 minutes"
        },
        "country": "India",
        "daysToMake": 11,
        "description": "ModernMarvel heartily welcomes you to Minimalist Modern Logo Design gig.\nWe are Brand Creators and professional business consultants. Each business has his own story to tell and having high recall value is prime purpose behind getting a LOGO. Thus, We believe in creating simple yet effective masterpiece which blown away your customers mind.\nYour idea of getting Modern memorable and attractive logo design is just one step away. So, Lets discuss and choose a best design for your business.\nOur recommendation BRANDING PACK @ $65 ONLY:\n5 BRANDED logos with minimal designs + vector source files\nAttractive Social media covers (FB + Twitter)\nProfessional stationery design (B card + letterhead)\nUnlimited revision rounds\nExclusive customer support\nRefund & Package selection guidelines:\nIf the designs are as per your initial shared brief, refund wont be a possible option. You can ask for revision if i missed out anything.\nMy samples are from my premium / standard package.\nWe are closed on Sunday.\nMy key skills:\nMinimalist Modern Logo Design | Minimal | Modern | Typography | Line art | Custom logo | Vintage |\nKeen to Get Started!",
        "services": [
          "Responsive Email Templates",
          "Local SEO Services",
          "PPC Campaign Management"
      ]
    ,  
        "imgUrl": "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/229132321/original/96776d631a542573d7faf7e1a71189e9c7a83af1/design-a-feminine-botanical-boho-hand-drawn-logo-for-you.jpg",
        "tags": [
          "modern logo",
          "custom logo",
          "logo design",
          "minimalist logo",
          "website logo",
          "logo maker"
        ],
        "packages": {
          "basic": {
              "header": "Basic Bundle",
              "price": "220.00",
              "description": "Includes basic features",
              "time": "6 Days Delivery",
              "included": [
                  "Feature F",
                  "Feature G"
              ]
          },
          "standard": {
              "header": "Standard Bundle",
              "price": "440.00",
              "description": "Includes standard features",
              "time": "8 Days Delivery",
              "included": [
                  "Feature F",
                  "Feature G",
                  "Feature H"
              ]
          },
          "premium": {
              "header": "Premium Bundle",
              "price": "660.00",
              "description": "Includes premium features",
              "time": "10 Days Delivery",
              "included": [
                  "Feature F",
                  "Feature G",
                  "Feature H",
                  "Feature I"
              ]
          }
      }
      
        ,
        "likedByUsers": ["mini-user"],
        "reviews": [
          {
            "name": "bartstrijbos",
            "country": "Netherlands",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f1.png",
            "review": "Use your revisions and communication, and you will have something that works for you! I recommend modernmarvel for the price they ask! I did not know what to expect from my first buy on FIverr. The previews where what I was going for, so I thought why not give it a try. The initial delivery had two good concepts and three concepts I did not like. The two good concepts however, where not really what I wanted though. I submitted a revision proposal and hoped for the best. This is where this seller shines! From the initial designs, he worked quickly with every suggestion I made for revisions and was good in communication. I slowly saw my project evolving to something I love. Recommended!",
            "reviewedAt": "Published 2 months ago"
          },
          {
            "name": "v_winko33",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Working with this seller was a great experience in that he was quick to respond (considering the 11+ hr time zone difference), friendly, reliable, and professional. He created some concepts with literally no reference the first time around, and the second time around I gave him more of an idea of what I was looking for and found the ideal logo. You get what you pay for, and the price I think is a very good deal that's hard to find. Communication +asking questions is key to get all that you want and need from this great offer. Although I am satisfied with the logo, I probably would've liked something more like the work he shows in his second picture on his profile/gigs. I do recommend him!",
            "reviewedAt": "Published 3 weeks ago"
          },
          {
            "name": "brendanpaull",
            "country": "Japan",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ef-1f1f5.png",
            "review": "Seller was extremely communicative and always responded very quickly even on his/her day off (Sunday). While I got something that will get my started and I suppose I got what I paid for (the price was definitely quite low), I would be hard pressed to call the designs I got as \"modern\" or \"minimalist\" like the logo presented in the profile. They felt like clip-art from 10 to 15 years ago attached to my website name.",
            "reviewedAt": "Published 1 month ago"
          },
          {
            "name": "tracyblehm",
            "country": "Canada",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png",
            "review": "I was a little nervous as I had never hired anyone before and have had bad experiences on other platforms. However this was absolutely marvelous. I loved the design. It was shocking how fast it was done and how amazing it turned out. I will definitely be hiring them again for my other projects that are coming up. Thank-you!!",
            "reviewedAt": "Published 2 months ago"
          },
          {
            "name": "jai_s22",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Using this service was a pretty decent experience. It took a bit longer than I wanted to finally get the final design. I had to go back and forth for a week trying to find the correct revision of the design. At first, I thought the experience of the designer was not the best due to finding some logos with minimal effort. Once I messaged the designer that I felt that the designs that they were producing were not satisfying me, they then were able to put a lot of effort into my ideas. I personally had to come up with the design of my logo instead of them using their experience and trusting them to come up with one themselves. Eventually, they did deliver so I am happy with the way it finished.",
            "reviewedAt": "Published 2 weeks ago"
          }
        ]
      },
      {
        "_id": "i112",
        "title": "I will do professional modern business logo design with copyrights",
        "about": "Welcome to Budding Solutions. An agency of 15+ Graphic Designers with great expertise. We strive to provide unique & graphically rich designs with exceptional & lifetime customer service. Let us be your GO-TO option for your graphic design needs and you won't be disappointed.",
        "price": 105,
        "owner": {
          "fullname": "shailene_george",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/3ec0d56f436079ef157dbcc1d21c4c62-1625030446037/1c926a30-7aa5-4de8-9a3b-6565be7ddd5b.jpg",
          "level": "basic/premium",
          "rate": 5,
          "userStory": "At DigitalGenius, we're dedicated to pushing the boundaries of digital innovation. From cutting-edge website designs to immersive VR experiences, we're here to make your ideas a reality. Partner with us and let's create something extraordinary.",
          "country": "India",
          "responseTime": "30 minutes",
          "languages": "Hindi, English",
          "joined": "Jun 2023",
          "lastDelivery": "15 minutes"
        },
        "country": "Pakistan",
        "daysToMake": 21,
        "description": "Greetings!! Welcome to Budding Solutions.\n\"Your one-stop-shop for all your graphic needs\"\nIf you are looking for a Modern and Professional Business logo design, then you are at the right place. We focus on creating simple yet effective designs that elevate your business outlook and leave an everlasting impression.\nWe stand out from our competition due to our best-in-class Customer Support and Quality Designs.\nWhy Us?\n✔ Combination of experience and creativity\n✔ Unique and original designs\n✔ Superior customer care and satisfaction\n✔ Transparent and High-resolution image types\n✔ Different types of source files (AI, EPS, PDF and SVG)\n✔ Complete Branding Guide\n✔ Unlimited revisions until you are 100% satisfied\n✔ Full Copyrights\nMASCOT DESIGNS ARE NOT INCLUDED IN BASIC OR STANDARD GIGS.\nTHE DESIGNS SHOWN ON THE PORTFOLIO ARE FROM STANDARD OR PREMIUM PACKS.\nLogo Design | Professional Logo | Modern Logo | Badge | Hand drawn | Feminine | Signature | Business Logo\nWe look forward to working with you. Please don't hesitate to reach out at any time with any questions.\nPlease review the FAQ section for further clarification.",
        "services": [
          "Conversion Rate Optimization (CRO)",
          "Social Media Advertising",
          "Online Reputation Management"
      ]
    ,  
        "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/delivery/asset/d2111161cdf3a16052d4dcc9fe5d1df8-1704743105/jobprofit-01-min.jpg",
        "tags": [
          "modern logo",
          "logo",
          "custom logo",
          "creative logo",
          "professional logo",
          "logo maker"
        ],
        "packages": {
          "basic": {
              "header": "Basic Subscription",
              "price": "300.00",
              "description": "Includes basic services",
              "time": "5 Days Delivery",
              "included": [
                  "Service H",
                  "Service I"
              ]
          },
          "standard": {
              "header": "Standard Subscription",
              "price": "600.00",
              "description": "Includes standard services",
              "time": "8 Days Delivery",
              "included": [
                  "Service H",
                  "Service I",
                  "Service J"
              ]
          },
          "premium": {
              "header": "Premium Subscription",
              "price": "900.00",
              "description": "Includes premium services",
              "time": "12 Days Delivery",
              "included": [
                  "Service H",
                  "Service I",
                  "Service J",
                  "Service K"
              ]
          }
      }
    ,  
        "likedByUsers": ["mini-user"],
        "reviews": [
          {
            "name": "bossymouse",
            "country": "Netherlands",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f1.png",
            "review": "I'd recommend this seller. She was skilled and very communicative. Also I got tons of revisions as promised and always quickly. Sometimes it was hard to get her to polish the details as I intended, I think because of the language barrier, but if a revision turned out different than I expected she started working on it again without asking questions. Lastly she gave tips about branding when needed. To be honest I'm not quite sure if the social media kit and website optimized image were worth my money, because those were mostly the same image in different ratios. But I probably had unrealistic expectations. On the other hand the copyright document is very polished and accurate!",
            "reviewedAt": "Published 1 week ago"
          },
          {
            "name": "coastalcleaners",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "I'm so grateful & thrilled that I can say, my experience was a sucess! I love my LOGO that Shailene created, I couldn't be happier! I reached out and let her know exactly what I needed, she promptly responded and made me an offer. I couldn't refuse, as she was more than willing to accommodate my budget. She sent me the drafts soon after, and I was pleased to see the results! I didn't need any revisions and I'm pleased to say that I've now got a NEW LOGO For my Brand/Company. I officially feel Accomplished! Thank you SO Much Shailene and Fiverr! You have made this journey so much lighter on my feet, and I would definitely recommend Shailene as an Artist and the Fiverr company!",
            "reviewedAt": "Published 3 weeks ago"
          },
          {
            "name": "ndethlefs",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "This was the first time I've used Fiverr and was a little worried how it would go. This was by far the best experience I've had working with someone remote and at a fair price. shailene_george always got back to me right away. I couldn't be happier with my experience and will also being recommending George to anyone I can and using again when needed. 5 stars all the way here!",
            "reviewedAt": "Published 3 weeks ago"
          },
          {
            "name": "mrmikevh",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Shailene is awesome to work with. Very professional and attentive. She deliveries amazing work at a value you just can't find anywhere else. As a busy front-end developer, I find buying her premium GIG is the way to go. My clients are always blown away with her work. She has made me a customer for life with her work and her friendly personality. Thank you Shailene and bless you. Can't wait for our next GIG together.",
            "reviewedAt": "Published 2 months ago"
          },
          {
            "name": "j_powell23",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "A friend of mine (Maximum Performance Productions) recommended Fiverr. I'm starting a new business and needed a design to catapult us to new heights. It didn't take long to find the right artist. Shallene was able to capture my idea and interpret it into the design that I am very pleased with. Her communication skills and response time are second to none. She is very informative and answered all my questions satisfactorily. Shallene performed her tasks timely and without delay. I am forever grateful for the outstanding designs she has provided and would highly recommend her to anyone. Thank You Shallene!",
            "reviewedAt": "Published 1 week ago"
          }
        ]
      },
      {
        "_id": "i113",
        "title": "I will write you an attractive instagram bio",
        "about": "Thanks for stopping by! I'm a Social Media Specialist with 8+ years experience. I can help with all your Social Media related tasks! Send me a message. Let's get it done!",
        "price": 155,
        "owner": {
          "fullname": "bellavida123",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/9e2d7f453419c08e138fbfe9e65347df-696051281638594671.588431/DD8E6DDC-C231-47D3-B61A-97274452D3BF",
          "level": "basic/premium",
          "rate": 2,
          "userStory": "Welcome to WebNinja, where creativity meets technology. Our team of skilled professionals is committed to delivering top-notch digital solutions that drive results. Partner with us and let's build something amazing together.",
          "country": "South Africa",
          "responseTime": "1 hour",
          "languages": "English",
          "joined": "Apr 2021",
          "lastDelivery": "40 minutes"
        },
        "country": "Jamaica",
        "daysToMake": 25,
        "description": "The FIRST thing a potential follower sees on your page is your bio.\nStand out, and build trust with a bio that informs and captivates everyone who views it. This will not only attract new people to your page, but it will keep them there!\nYou've seen those profiles on Instagram that look amazing, and you deserve that for your business too.\nGet the Instagram bio you need, and with it, more followers and clients!\nWhat you'll receive:\n⭐ One unique, professionally designed bio\n⭐ A captivating layout that engages your viewers\n⭐ A call to action, if required\n⭐ 24 hour delivery\n⭐ 100% Satisfaction Guarantee\nLet's build you a great Instagram page that is sure to bring AND KEEP followers.\nIf you BUY a gig from me always feel free to request a revision if you need any part of your order revised. Thank you.",
        "services": [
          "WordPress Website Development",
          "Shopify Store Setup",
          "Magento Customization"
      ]
    ,  
        "imgUrl": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/157827646/original/8f14f50a81ddd1a60b4af990ea5154a26975d150.jpg",
        "tags": [
          "bio",
          "instagram marketing",
          "instagram",
          "social media",
          "social network"
        ],
        "packages": {
          "basic": {
              "header": "Basic Plan",
              "price": "270.00",
              "description": "Includes basic services",
              "time": "7 Days Delivery",
              "included": [
                  "Service L",
                  "Service M"
              ]
          },
          "standard": {
              "header": "Standard Plan",
              "price": "540.00",
              "description": "Includes standard services",
              "time": "10 Days Delivery",
              "included": [
                  "Service L",
                  "Service M",
                  "Service N"
              ]
          },
          "premium": {
              "header": "Premium Plan",
              "price": "810.00",
              "description": "Includes premium services",
              "time": "14 Days Delivery",
              "included": [
                  "Service L",
                  "Service M",
                  "Service N",
                  "Service O"
              ]
          }
      }
    ,  
        "likedByUsers": ["mini-user"],
        "reviews": [
          {
            "name": "bswoll51",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "She was amazing! Told me exactly when she would start. Got it done and over-delivered! Tips to grow my following and exclusive tailoring of my bio. She can call me The Terminator because I'll be back. 🤣",
            "reviewedAt": "Published 1 month ago"
          },
          {
            "name": "dawnmichaela",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "My bio turned out better than I could have hoped for! She took all my words and ideas and turned it in to a clear and powerful bio. I highly recommend working with her. She is easy to communicate with, responds quickly, and got it done fast. I would definitely use her again.",
            "reviewedAt": "Published 1 week ago"
          },
          {
            "name": "iidark",
            "country": "United Kingdom",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
            "review": "Wonderful working with this seller. The work is as promised and delivered on time and on point. I would definitely recommend their work, in fact I'm about to book another gig from them.",
            "reviewedAt": "Published 2 weeks ago"
          },
          {
            "name": "singh_manu1313",
            "country": "New Zealand",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1ff.png",
            "review": "She is really good. I ordered two bio and both are amazing. Very easy to convey the message. And she did exactly what i was looking for. Definitely recommend",
            "reviewedAt": "Published 1 week ago"
          },
          {
            "name": "charliericeiii",
            "country": "United States",
            "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            "review": "Thank you so much for creating my bios for me on my social media pages. We got it right how we wanted it to I appreciate that. God bless!",
            "reviewedAt": "Published 3 weeks ago"
          }
        ]
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
      },
       {
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

      // Old 13 gigs
      // {
      //   "_id": "i101",
      //   "title": "I will do hyper realistic pencil portrait by hand drawing",
      //   "about": "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
      //   "price": 172,
      //   "owner": {
      //     "fullname": "frederickkessie",
      //     "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
      //     "level": "basic/premium",
      //     "rate": 2,
      //     "userStory": "We are PixxelStudio, A full-service design and developing web agency. From designing logos to developing websites to satisfying our customer’s every digital need is what we thrive for. We’ve worked not only with brilliant individuals but also with top companies all around the world. Our mission is to become an indispensable partner to our clients by offering the best ideas, skills and services they could possibly get.",
      //     "country": "China",
      //     "responseTime": "1 hour",
      //     "languages": "Chinese,English",
      //     "joined": "Dec 2021",
      //     "lastDelivery": "45 minutes"
      //   },
      //   "country": "Ghana",
      //   "daysToMake": 26,
      //   "description": "Hello ! Much obliged for visiting my gig :)\nIn this gig I'm offering you an exceptionally 3 one of a kind, best and reasonable bundles.\nIn case you are thinking for giving somebody uncommon an extremely delightful, eye getting gift( hyper practical hand drawing pencil sketch picture)?\nKindly select the helpful bundle and submit your request at this moment and I'll give you an ideal picture sketch, hand drawing, practical drawing, pencil attracting high goal JPEG/PNG advanced document.\nI will give hand-drawn dark and White or hued reasonable pictures.\nSympathetically give me clear reference photograph however much as could be expected.\nThe material I utilized for Creating pencil representations are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, mono eraser, brush, mixing stump, mechanical pencil, graphite powder and so on .\nYou can give me anything:\nPicture photographs\nFamily photographs\nCreature photographs\nAny item photographs\nScene photographs\nEngineering photographs\nAnything you envision\nKindly reach me prior to submitting your request! Much appreciated.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
      //   "services": [
      //     "100% Clean Responsive Design",
      //     "Ecommerce site Design (Standard and Premium Plans Only)",
      //     "Multiple Payment Methods (PayPal, Stripe, Bank, Credit Card, etc.)",
      //   ],
      //   "imgUrl": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg",
      //   "tags": [
      //     "pencil drawing",
      //     "realistic drawing",
      //     "hand drawing",
      //     "portrait drawing",
      //     "pencil sketch"
      //   ],
      //   "packages": {
      //   "basic": {
      //     "header": "Basic (10 products & 4 pages)",
      //     "price": "451.37",
      //     "description": "Build 10 products store + 4 pages + Responsive + Speed Optimization + 30 days free support",
      //     "time": "3 Days Delivery",
      //     "included": [
      //       "Functional website",
      //       "4 pages",
      //       "Responsive design",
      //       "E-commerce functionality",
      //       "10 products",
      //       "Payment processing"
      //     ]
      //   },
      //   "standard": {
      //     "header": "standard (16 products & 6 pages)",
      //     "price": "580.40",
      //     "description": "Build 16 products store + 6 pages + Responsive + Speed Optimization + 60 days free support",
      //     "time": "3 Days Delivery",
      //     "included": [
      //       "Functional website",
      //       "6 pages",
      //       "Responsive design",
      //       "E-commerce functionality",
      //       "16 products",
      //       "Payment processing"
      //     ]
      //   },
      //   "premium": {
      //     "header": "standard (16 products & 6 pages)",
      //     "price": "720.60",
      //     "description": "Build 20 products store + 8 pages + Responsive + Speed Optimization + 90 days free support",
      //     "time": "3 Days Delivery",
      //     "included": [
      //       "Functional website",
      //       "8 pages",
      //       "Responsive design",
      //       "E-commerce functionality",
      //       "20 products",
      //       "Payment processing",
      //       "Chat bot"
      //     ]
      //   }
      // },
      //   "likedByUsers": ["mini-user"],
      //   "reviews": [
      //     {
      //       "name": "tobiaspille300",
      //       "country": "Thailand",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png",
      //       "review": "frederickkessie ist a super kind artist doing the process he was super professional and only took him 1 shot to deliver a perfect result ! Highly recommended work with this guy !",
      //       "reviewedAt": "Published 2 months ago"
      //     },
      //     {
      //       "name": "liam31",
      //       "country": "United Kingdom",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
      //       "review": "I requested a slightly earlier delivery on this and once again Frederick came through and provided a fantastic delivery. Thanks so much!",
      //       "reviewedAt": "Published 3 weeks ago"
      //     },
      //     {
      //       "name": "liam31",
      //       "country": "United Kingdom",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
      //       "review": "Frederick is amazing and extremely talented. This is the second time working with him and he has been a pleasure yet again!",
      //       "reviewedAt": "Published 3 weeks ago"
      //     },
      //     {
      //       "name": "larsonraz",
      //       "country": "United States",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
      //       "review": "Very detailed",
      //       "reviewedAt": "Published 1 week ago"
      //     },
      //     {
      //       "name": "stevekaszycki",
      //       "country": "United States",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
      //       "review": "very nice portrait, very good quality.",
      //       "reviewedAt": "Published 2 weeks ago"
      //     }
      //   ]
      // },
      // {
      //   "_id": "i102",
      //   "title": "I will do hyper realistic pencil sketch portrait by hand drawing",
      //   "about": "Hello, this is Masuk, stand up for vividstore,I am a young and enthusiastic graphic artist and realistic pencil sketch artist. I am certified as graphic designer from George Washington University, USA. I have almost 11 years experience in this field since my university life. I really love to work with Adobe Illustrator, Adobe Photoshop, and so on as a full time online freelancer. And also passionate about sketching. Thank you.",
      //   "price": 151,
      //   "owner": {
      //     "fullname": "vividstore",
      //     "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/83cc7c97f9873bdb052590a94d32f84c-1576419363871/ed47443e-0f9b-42ab-beaf-ec0a0acccfe8.jpeg",
      //     "level": "basic/premium",
      //     "rate": 4,
      //     "userStory": "At NexusDesign, we specialize in creating immersive digital experiences that captivate audiences worldwide. From crafting compelling brand identities to building cutting-edge websites, we're committed to exceeding our clients' expectations every step of the way. With a track record of success working with diverse clientele, we strive to be the go-to partner for all digital design and development needs.",
      //     "country": "Brazil",
      //     "responseTime": "30 minutes",
      //     "languages": "Portuguese, Spanish, English",
      //     "joined": "Jan 2022",
      //     "lastDelivery": "20 minutes"
      //   },
      //   "country": "Bangladesh",
      //   "daysToMake": 24,
      //   "description": "Hey ! Thanks for visiting my gig :)\nIn this gig i'm offering you a very 3 unique, preferable and affordable packages.\nIf you are thinking for giving someone special a very beautiful, eye catching gift( hyper realistic hand drawing pencil sketch portrait)?\nPlease select the desirable package and place your order right now and i'll give you a perfect portrait sketch, hand drawing, realistic drawing,pencil drawing in high resolution JPEG/PNG digital file.\nI will provide hand-drawn black & White or colored realistic portraits.\nKindly provide me clear reference photo as much as possible.\nThe material I used for Creating pencil portraits are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, tombomono eraser, brush, blending stump, mechanical pencil, graphite powder etc .\nYou can give me anything:\nPortrait photos\nFamily photos\nAnimal photos\nAny product photos\nLandscape photos\nArchitecture photos\nAnything you imagine\nPlease contact me before placing your order! Thanks.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITAL FILE, IF YOU WANT THE ORIGINAL ONE THEN MESSAGE ME FOR DETAILS.\nFeel free to ask me anything! :)\nThank You...\nvividstore",
      //   "services": [
      //     "Custom Graphic Design Solutions",
      //     "Mobile App Development (iOS and Android)",
      //     "Search Engine Optimization (SEO) Services",
      //     "Social Media Integration and Marketing"
      // ],
      //   "imgUrl": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197422311/original/1907136f4b9684daa164acfa5cfedc6035b771b1.jpg",
      //   "tags": [
      //     "pencil drawing",
      //     "realistic drawing",
      //     "pencil portrait",
      //     "sketch",
      //     "pencil sketch"
      //   ],
      //   "packages": {
      //     "basic": {
      //         "header": "Basic (10 products & 4 pages)",
      //         "price": "500.00",
      //         "description": "Build 10 products store + 4 pages + Responsive + Speed Optimization + 30 days free support",
      //         "time": "5 Days Delivery",
      //         "included": [
      //             "Functional website",
      //             "4 pages",
      //             "Responsive design",
      //             "E-commerce functionality",
      //             "10 products",
      //             "Payment processing"
      //         ]
      //     },
      //     "standard": {
      //         "header": "Standard (15 products & 6 pages)",
      //         "price": "750.00",
      //         "description": "Build 15 products store + 6 pages + Responsive + Speed Optimization + 60 days free support",
      //         "time": "7 Days Delivery",
      //         "included": [
      //             "Functional website",
      //             "6 pages",
      //             "Responsive design",
      //             "E-commerce functionality",
      //             "15 products",
      //             "Payment processing"
      //         ]
      //     },
      //     "premium": {
      //         "header": "Premium (20 products & 8 pages)",
      //         "price": "1000.00",
      //         "description": "Build 20 products store + 8 pages + Responsive + Speed Optimization + 90 days free support",
      //         "time": "10 Days Delivery",
      //         "included": [
      //             "Functional website",
      //             "8 pages",
      //             "Responsive design",
      //             "E-commerce functionality",
      //             "20 products",
      //             "Payment processing",
      //             "Chat bot"
      //         ]
      //     }
      // },  
      //   "likedByUsers": ["mini-user"]
      // },
      // {
      //   "_id": "i103",
      //   "title": "I will draw a hyperrealistic portrait of face or entire body and animals",
      //   "about": "Hello! I'm a brazilian artist specialized in hyperrealistic drawings and paintings of human figures and animals, i use a diversity of techniques like Oil painting, dry pastel drawing and pencil. I have over 30 years of experience, check out my portfolio.",
      //   "price": 198,
      //   "owner": {
      //     "fullname": "andreacarvalho_",
      //     "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg",
      //     "level": "basic/premium",
      //     "rate": 5,
      //     "userStory": "Welcome to TechCrafters, your premier destination for innovative digital solutions. From sleek logo designs to robust website development, we are dedicated to elevating your online presence and exceeding your expectations. With a global clientele spanning industries, we are committed to delivering unparalleled creativity and expertise to every project.",
      //     "country": "Australia",
      //     "responseTime": "45 minutes",
      //     "languages": "English",
      //     "joined": "Feb 2020",
      //     "lastDelivery": "1 hour"
      //   },
      //   "country": "Brazil",
      //   "daysToMake": 4,
      //   "description": "Desenho de lápis hiperrealista da sua foto, posso adicionar detalhes de fundo e personalizar o desenho do jeito que você quiser.",
      //   "services": [
      //     "UI/UX Design Consultation and Prototyping",
      //     "Content Management System (CMS) Integration",
      //     "Secure Payment Gateway Integration",
      //     "Website Maintenance and Support Packages"
      // ],
      //   "imgUrl": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/155512325/original/9d62fbdec2b0bffd0318f9af43c2de023b62f5f0.jpg",
      //   "tags": ["pencil", "drawing", "portrait", "realistic", "painting"],
      //   "packages": {
      //     "basic": {
      //         "header": "Basic (10 products & 4 pages)",
      //         "price": "400.00",
      //         "description": "Build 10 products store + 4 pages + Responsive + Speed Optimization + 30 days free support",
      //         "time": "5 Days Delivery",
      //         "included": [
      //             "Functional website",
      //             "4 pages",
      //             "Responsive design",
      //             "E-commerce functionality",
      //             "10 products",
      //             "Payment processing"
      //         ]
      //     },
      //     "standard": {
      //         "header": "Standard (15 products & 6 pages)",
      //         "price": "600.00",
      //         "description": "Build 15 products store + 6 pages + Responsive + Speed Optimization + 60 days free support",
      //         "time": "7 Days Delivery",
      //         "included": [
      //             "Functional website",
      //             "6 pages",
      //             "Responsive design",
      //             "E-commerce functionality",
      //             "15 products",
      //             "Payment processing"
      //         ]
      //     },
      //     "premium": {
      //         "header": "Premium (20 products & 8 pages)",
      //         "price": "800.00",
      //         "description": "Build 20 products store + 8 pages + Responsive + Speed Optimization + 90 days free support",
      //         "time": "10 Days Delivery",
      //         "included": [
      //             "Functional website",
      //             "8 pages",
      //             "Responsive design",
      //             "E-commerce functionality",
      //             "20 products",
      //             "Payment processing",
      //             "Chat bot"
      //         ]
      //     }
      // },  
      //   "likedByUsers": ["mini-user"],
      //   "reviews": [
      //     {
      //       "name": "rachelrbarnes1",
      //       "country": "United States",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
      //       "review": "Incredibly grateful for the amazing experience working with you . You are so talented and a kind soul! I highly recommend if you want high quality art to work with her every time",
      //       "reviewedAt": "Published 1 month ago"
      //     },
      //     {
      //       "name": "mark001994",
      //       "country": "Austria",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
      //       "review": "The artist was very kind and polite also very fast at the communication. The delivery of the project was on time. And her work is worth the money. I'm really excited about the painting she did. I can truely recommend the Aritst and her work. Big Thanks! :)",
      //       "reviewedAt": "Published 1 month ago"
      //     },
      //     {
      //       "name": "thurstonrobby",
      //       "country": "United States",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
      //       "review": "incredible on how precise that art is, picture perfect. 100% amazing job and I will use your services again ...",
      //       "reviewedAt": "Published 3 weeks ago"
      //     },
      //     {
      //       "name": "gavrielm",
      //       "country": "Israel",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png",
      //       "review": "amazing saller and great work",
      //       "reviewedAt": "Published 6 days ago"
      //     },
      //     {
      //       "name": "garebear52",
      //       "country": "United States",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
      //       "review": "Beautiful drawing! Just what I wanted.",
      //       "reviewedAt": "Published 1 week ago"
      //     }
      //   ]
      // },
      // {
      //   "id": "i100",
      //   "title": "I will do hyper realistic pencil portrait by hand drawing",
      //   "about": "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
      //   "price": 172,
      //   "owner": {
      //     "id": "u100",
      //     "fullname": "frederickkessie",
      //     "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
      //     "level": "basic/premium",
      //     "rate": 2,
      //   },
      //   "country": "Ghana",
      //   "daysToMake": 26,
      //   "description": "Hello ! Much obliged for visiting my gig :)\nIn this gig I'm offering you an exceptionally 3 one of a kind, best and reasonable bundles.\nIn case you are thinking for giving somebody uncommon an extremely delightful, eye getting gift( hyper practical hand drawing pencil sketch picture)?\nKindly select the helpful bundle and submit your request at this moment and I'll give you an ideal picture sketch, hand drawing, practical drawing, pencil attracting high goal JPEG/PNG advanced document.\nI will give hand-drawn dark and White or hued reasonable pictures.\nSympathetically give me clear reference photograph however much as could be expected.\nThe material I utilized for Creating pencil representations are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, mono eraser, brush, mixing stump, mechanical pencil, graphite powder and so on .\nYou can give me anything:\nPicture photographs\nFamily photographs\nCreature photographs\nAny item photographs\nScene photographs\nEngineering photographs\nAnything you envision\nKindly reach me prior to submitting your request! Much appreciated.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
      //   "imgUrl": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg",
      //   "tags": [
      //     "pencil drawing",
      //     "realistic drawing",
      //     "hand drawing",
      //     "portrait drawing",
      //     "pencil sketch"
      //   ],
      //   "likedByUsers": [
      //     "mini-user"
      //   ],
      //   "packages": {
      //     "basic": {
      //       "header": "Basic (10 products & 4 pages)",
      //       "price": "451.37",
      //       "description": "Build 10 products store + 4 pages + Responsive + Speed Optimization + 30 days free support",
      //       "time": "3 Days Delivery",
      //       "included": [
      //         "Functional website",
      //         "4 pages",
      //         "Responsive design",
      //         "E-commerce functionality",
      //         "10 products",
      //         "Payment processing"
      //       ]
      //     },
      //     "standard": {
      //       "header": "standard (16 products & 6 pages)",
      //       "price": "580.40",
      //       "description": "Build 16 products store + 6 pages + Responsive + Speed Optimization + 60 days free support",
      //       "time": "3 Days Delivery",
      //       "included": [
      //         "Functional website",
      //         "6 pages",
      //         "Responsive design",
      //         "E-commerce functionality",
      //         "16 products",
      //         "Payment processing"
      //       ]
      //     },
      //     "premium": {
      //       "header": "standard (16 products & 6 pages)",
      //       "price": "720.60",
      //       "description": "Build 20 products store + 8 pages + Responsive + Speed Optimization + 90 days free support",
      //       "time": "3 Days Delivery",
      //       "included": [
      //         "Functional website",
      //         "8 pages",
      //         "Responsive design",
      //         "E-commerce functionality",
      //         "20 products",
      //         "Payment processing",
      //         "Chat bot"
      //       ]
      //     }
      //   },
      //   "services": [
      //     "100% Clean Responsive Design",
      //     "Ecommerce site Design (Standard and Premium Plans Only)",
      //     "Multiple Payment Methods (PayPal, Stripe, Bank, Credit Card, etc.)",
      //   ],
      //   "reviews": [
      //     {
      //       "name": "tobiaspille300",
      //       "country": "Thailand",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png",
      //       "review": "frederickkessie ist a super kind artist doing the process he was super professional and only took him 1 shot to deliver a perfect result ! Highly recommended work with this guy !",
      //       "reviewedAt": "Published 2 months ago"
      //     },
      //     {
      //       "name": "liam31",
      //       "country": "United Kingdom",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
      //       "review": "I requested a slightly earlier delivery on this and once again Frederick came through and provided a fantastic delivery. Thanks so much!",
      //       "reviewedAt": "Published 3 weeks ago"
      //     },
      //     {
      //       "name": "liam31",
      //       "country": "United Kingdom",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
      //       "review": "Frederick is amazing and extremely talented. This is the second time working with him and he has been a pleasure yet again!",
      //       "reviewedAt": "Published 3 weeks ago"
      //     },
      //     {
      //       "name": "larsonraz",
      //       "country": "United States",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
      //       "review": "Very detailed",
      //       "reviewedAt": "Published 1 week ago"
      //     },
      //     {
      //       "name": "stevekaszycki",
      //       "country": "United States",
      //       "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
      //       "review": "very nice portrait, very good quality.",
      //       "reviewedAt": "Published 2 weeks ago"
      //     }
      //   ]
      // },
      // {
      //   "_id": "i102",
      //   "title": "I will edit professional videos for any occasion",
      //   "price": 20,
      //   "owner": {
      //     "_id": "u102",
      //     "fullname": "John Doe",
      //     "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
      //     "level": "premium",
      //     "rate": 4.5
      //   },
      //   "daysToMake": 7,
      //   "description": "Transform your raw footage into polished, professional videos! Whether it's for weddings, events, or marketing purposes, we've got you covered. Our editing services include color correction, audio enhancement, and seamless transitions to create engaging content.",
      //   "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
      //   "tags": [
      //     "video-editing",
      //     "professional",
      //     "wedding",
      //     "marketing"
      //   ],
      //   "likedByUsers": []
      // },
      // {
      //   "_id": "i103",
      //   "title": "I will create modern and impactful logo designs",
      //   "price": 15,
      //   "owner": {
      //     "_id": "u101",
      //     "fullname": "Alice Smith",
      //     "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
      //     "level": "premium",
      //     "rate": 4.8
      //   },
      //   "daysToMake": 5,
      //   "description": "Need a unique logo that represents your brand? Look no further! We specialize in creating modern, memorable, and impactful logo designs. Our designs are tailored to your brand's identity, ensuring that you stand out from the competition.",
      //   "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
      //   "tags": [
      //     "Logo Design",
      //     "branding",
      //     "modern",
      //     "unique"
      //   ],
      //   "likedByUsers": []
      // },
      // {
      //   "_id": "i104",
      //   "title": "I will manage your social media accounts effectively",
      //   "price": 25,
      //   "owner": {
      //     "_id": "u103",
      //     "fullname": "Emily Johnson",
      //     "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
      //     "level": "premium",
      //     "rate": 4.9
      //   },
      //   "daysToMake": 7,
      //   "description": "Maximize your online presence with our social media management services! We'll handle everything from content creation and scheduling to audience engagement and analytics. Let us take the stress out of managing your social media accounts.",
      //   "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
      //   "tags": [
      //     "social-media-management",
      //     "content-creation",
      //     "audience-engagement",
      //     "analytics"
      //   ],
      //   "likedByUsers": []
      // },
      // {
      //   "_id": "i105",
      //   "title": "I will design eye-catching graphics for your brand",
      //   "price": 18,
      //   "owner": {
      //     "_id": "u104",
      //     "fullname": "Michael Brown",
      //     "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
      //     "level": "premium",
      //     "rate": 4.7
      //   },
      //   "daysToMake": 4,
      //   "description": "Elevate your brand with stunning graphics! From posters and flyers to social media graphics and infographics, we'll bring your ideas to life. Our designs are tailored to your brand's aesthetic and messaging, ensuring maximum impact.",
      //   "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
      //   "tags": [
      //     "graphic-design",
      //     "branding",
      //     "marketing",
      //     "visuals"
      //   ],
      //   "likedByUsers": []
      // },
      // {
      //   "_id": "i106",
      //   "title": "I will build a custom e-commerce website for your business",
      //   "price": 30,
      //   "owner": {
      //     "_id": "u106",
      //     "fullname": "David Wilson",
      //     "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
      //     "level": "premium",
      //     "rate": 4.9
      //   },
      //   "daysToMake": 10,
      //   "description": "Take your business online with a custom e-commerce website! Our solutions are tailored to your specific needs, whether you're selling products or services. From user-friendly interfaces to secure payment gateways, we've got you covered.",
      //   "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
      //   "tags": [
      //     "e-commerce",
      //     "website-development",
      //     "custom-solutions",
      //     "online-shopping"
      //   ],
      //   "likedByUsers": []
      // },
      // {
      //   "_id": "i107",
      //   "title": "I will create innovative mobile apps for iOS and Android",
      //   "price": 35,
      //   "owner": {
      //     "_id": "u107",
      //     "fullname": "Daniel Harris",
      //     "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
      //     "level": "premium",
      //     "rate": 4.8
      //   },
      //   "daysToMake": 14,
      //   "description": "Bring your app idea to life with our mobile app development services! Whether it's for iOS or Android, we'll create innovative and user-friendly apps that stand out in the crowded app market. From concept to launch, we'll guide you every step of the way.",
      //   "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
      //   "tags": [
      //     "mobile-app-development",
      //     "iOS",
      //     "Android",
      //     "innovative"
      //   ],
      //   "likedByUsers": []
      // },
      // {
      //   "_id": "i108",
      //   "title": "I will optimize your website for search engines",
      //   "price": 20,
      //   "owner": {
      //     "_id": "u108",
      //     "fullname": "Jessica Lee",
      //     "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
      //     "level": "premium",
      //     "rate": 4.7
      //   },
      //   "daysToMake": 5,
      //   "description": "Increase your online visibility with our SEO optimization services! We'll analyze your website, identify opportunities for improvement, and implement strategies to boost your search engine rankings. Get ready to attract more organic traffic and grow your business.",
      //   "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
      //   "tags": [
      //     "SEO",
      //     "search-engine-optimization",
      //     "organic-traffic",
      //     "website-ranking"
      //   ],
      //   "likedByUsers": []
      // },
      // {
      //   "_id": "i109",
      //   "title": "I will be your dedicated virtual assistant",
      //   "price": 18,
      //   "owner": {
      //     "_id": "u109",
      //     "fullname": "Sarah Johnson",
      //     "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
      //     "level": "premium",
      //     "rate": 4.6
      //   },
      //   "daysToMake": 7,
      //   "description": "Hire a virtual assistant to handle your administrative tasks efficiently! From managing emails and scheduling appointments to data entry and research, we'll take care of the details so you can focus on what matters most – growing your business.",
      //   "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698676353/sohib-1_pw15oz.webp",
      //   "tags": [
      //     "virtual-assistant",
      //     "administrative-tasks",
      //     "efficiency",
      //     "remote-support"
      //   ],
      //   "likedByUsers": []
      // },
      // {
      //   "_id": "i110",
      //   "title": "I will design your logo1",
      //   "price": 12,
      //   "owner": {
      //     "_id": "u102",
      //     "fullname": "Dudu Da",
      //     "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
      //     "level": "basic/premium",
      //     "rate": 4
      //   },
      //   "daysToMake": 3,
      //   "description": "Make a unique logo1...",
      //   "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
      //   "tags": [
      //     "Logo Design",
      //     "artistic",
      //     "professional",
      //     "accessible"
      //   ],
      //   "likedByUsers": ['mini-user'] // for user-wishlist: use $in
      // },
      // {
      //   "_id": "i111",
      //   "title": "I will design your logo2",
      //   "price": 12,
      //   "owner": {
      //     "_id": "u103",
      //     "fullname": "Dudu Da",
      //     "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
      //     "level": "basic/premium",
      //     "rate": 4
      //   },
      //   "daysToMake": 3,
      //   "description": "Make a unique logo2...",
      //   "imgUrl": "https://res.cloudinary.com/de2rdmsca/image/upload/v1698329461/promote-your-facebook-page-to-country-targeted-audience_oppvsc.jpg",
      //   "tags": [
      //     "Logo Design",
      //     "artistic",
      //     "professional",
      //     "accessible"
      //   ],
      //   "likedByUsers": ['mini-user'] // for user-wishlist: use $in
      // },
      // {
      //   "_id": "i112",
      //   "title": "I will design your logo3",
      //   "price": 12,
      //   "owner": {
      //     "_id": "u104",
      //     "fullname": "Dudu Da",
      //     "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
      //     "level": "basic/premium",
      //     "rate": 4
      //   },
      //   "daysToMake": 3,
      //   "description": "Make a unique logo3...",
      //   "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698679092/tom-1_c1nyop.webp",
      //   "tags": [
      //     "Logo Design",
      //     "artistic",
      //     "professional",
      //     "accessible"
      //   ],
      //   "likedByUsers": ['mini-user'] // for user-wishlist: use $in
      // }, {
      //   "_id": "i113",
      //   "title": "I will design your logo",
      //   "price": 12,
      //   "owner": {
      //     "_id": "u101",
      //     "fullname": "Dudu Da",
      //     "imgUrl": "https://res.cloudinary.com/dgsfbxsed/image/upload/v1698678643/slik_fpytey.webp",
      //     "level": "basic/premium",
      //     "rate": 4
      //   },
      //   "daysToMake": 3,
      //   "description": "Make a unique logo...",
      //   "imgUrl": "https://res.cloudinary.com/de2rdmsca/image/upload/v1698329461/promote-your-facebook-page-to-country-targeted-audience_oppvsc.jpg",
      //   "tags": [
      //     "Logo Design",
      //     "artistic",
      //     "professional",
      //     "accessible"
      //   ],
      //   "likedByUsers": ['mini-user'] // for user-wishlist: use $in
      // },


