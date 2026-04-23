export const playerProfile = {
  name: "Peter Abbas",
  avatar: "/images/profile.jpeg",
  firstName: "Peter",
  lastName: "Abbas",
  email: "peter.abbas@scoutflair.com",
  phone: "+234 8034 000 000",
  address: "Abuja, Nigeria",
  position: "Midfielder",
  shirtNumber: 8,
  age: 22,
  dateOfBirth: "August 21, 2002",
  nationality: "Nigerian",
  preferredFoot: "Left",
  height: "167 cm",
  weight: "200 lbs",
  status: "Independent",
  bio: "Peter Abbas is an energetic central midfielder who links play with quick decision-making, calm ball control, and disciplined work out of possession.",
  activityPosts: [
    {
      id: 1,
      date: "August 21, 2024 | 9:30PM",
      image: "/images/post_1.png",
      content:
        "Wrapped up an intense evening session focused on receiving under pressure, moving the ball quickly, and staying sharp in transition. Feeling strong and ready for the next match opportunity.",
    },
    {
      id: 2,
      date: "August 18, 2024 | 6:15PM",
      image: "/images/post_2.png",
      content:
        "Solid work on defensive positioning and late midfield runs today. Small improvements are adding up, and I am staying locked in on consistency every time I step on the pitch.",
    },
  ],
  recommendation: {
    name: "Joshua Fayomi",
    email: "joshuafayomi@gmail.com",
    phone: "+2347067******",
  },
} as const;
