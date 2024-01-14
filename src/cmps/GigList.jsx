import React, { useEffect, useState } from 'react';

const GigList = () => {
  const [gigs, setGigs] = useState([]);

  // Mock data for a gig
  const mockGig = {
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
  };

  // Mock function to fetch gig data
  const fetchGigData = async () => {
    // Simulate API call delay (you can remove this in a real implementation)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate fetching data from the server
    setGigs([mockGig]);
  };

  useEffect(() => {
    // Fetch gig data when the component mounts
    fetchGigData();
  }, []);

  return (
    <div>
      <h2>Gig List</h2>
      <ul>
        {gigs.map(gig => (
          <li key={gig._id}>
            <h3>{gig.title}</h3>
            <p>Price: ${gig.price}</p>
            {/* Additional gig details can be displayed here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GigList;