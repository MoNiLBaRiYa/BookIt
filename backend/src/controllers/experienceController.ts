import { Request, Response } from 'express';
import { Experience, Slot } from '../models';
import { Op } from 'sequelize';

// Mock data for when database is not available - Using high-quality royalty-free images
const mockExperiences = [
  {
    id: 1,
    title: "Goa Beach Adventure",
    description: "Experience the pristine beaches of Goa with thrilling water sports, golden sunsets, and vibrant beach culture. Perfect for adventure seekers and beach lovers.",
    location: "Goa, India",
    price: 2500,
    duration: "Full Day",
    category: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    rating: 4.5,
    reviewCount: 128,
    highlights: [
      "Parasailing and jet skiing adventures",
      "Beach volleyball and water games", 
      "Professional sunset photography session",
      "Traditional Goan seafood lunch",
      "Visit to historic spice plantations"
    ],
    included: ["Round-trip AC transportation", "All water sports equipment", "Professional guide", "Lunch and refreshments", "Safety gear and insurance"]
  },
  {
    id: 2,
    title: "Himalayan Trekking Expedition",
    description: "Embark on an unforgettable journey through the majestic Himalayan ranges with experienced guides, breathtaking views, and camping under the stars.",
    location: "Himachal Pradesh, India",
    price: 5000,
    duration: "3 Days",
    category: "Trekking",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    rating: 4.8,
    reviewCount: 89,
    highlights: [
      "Trek to 3000m+ altitude with stunning views",
      "Professional certified mountain guides",
      "Camping under pristine starlit skies",
      "Wildlife spotting and bird watching",
      "Traditional mountain village cultural visits"
    ],
    included: ["High-quality camping equipment", "All meals during trek", "Certified trek guide", "All permits and entry fees", "Comprehensive first aid kit"]
  },
  {
    id: 3,
    title: "Kerala Backwaters Cruise",
    description: "Glide through the tranquil backwaters of Kerala in a traditional houseboat, experiencing the unique ecosystem and local culture of God's Own Country.",
    location: "Alleppey, Kerala",
    price: 3500,
    duration: "2 Days",
    category: "Leisure",
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    rating: 4.6,
    reviewCount: 156,
    highlights: [
      "Traditional Kerala houseboat experience",
      "Authentic Kerala cuisine cooking class",
      "Bird watching and nature photography",
      "Ancient temple and village visits",
      "Relaxing Ayurvedic spa treatments"
    ],
    included: ["Luxury houseboat accommodation", "All meals (breakfast, lunch, dinner)", "Expert local guide", "Village and temple tours", "Welcome drink and refreshments"]
  },
  {
    id: 4,
    title: "Rajasthan Desert Safari",
    description: "Experience the golden sands of Thar Desert with camel rides, cultural performances, and a night under the desert stars in luxury camps.",
    location: "Jaisalmer, Rajasthan",
    price: 4200,
    duration: "2 Days",
    category: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    rating: 4.7,
    reviewCount: 203,
    highlights: [
      "Authentic camel safari in Thar Desert",
      "Traditional Rajasthani folk dance performances",
      "Luxury desert camping with modern amenities",
      "Spectacular sunset and sunrise desert views",
      "Local handicraft shopping and cultural immersion"
    ],
    included: ["Luxury desert camp accommodation", "Camel safari experience", "Cultural performances", "All meals and beverages", "Evening bonfire with music"]
  },
  {
    id: 5,
    title: "Manali Adventure Sports",
    description: "Get your adrenaline pumping with river rafting, paragliding, and mountain biking in the scenic valleys of Manali.",
    location: "Manali, Himachal Pradesh",
    price: 3800,
    duration: "Full Day",
    category: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    rating: 4.4,
    reviewCount: 167,
    highlights: [
      "Grade III white water river rafting",
      "Paragliding with panoramic valley views",
      "Mountain biking on scenic trails",
      "Rock climbing and rappelling sessions",
      "Visit to famous Solang Valley"
    ],
    included: ["All adventure sports equipment", "Professional certified instructors", "Complete safety gear", "Nutritious lunch", "Round-trip transportation"]
  },
  {
    id: 6,
    title: "Munnar Tea Plantation Tour",
    description: "Explore the lush green tea plantations of Munnar, learn about tea processing, and enjoy the cool mountain climate.",
    location: "Munnar, Kerala",
    price: 2800,
    duration: "Full Day",
    category: "Leisure",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    rating: 4.3,
    reviewCount: 134,
    highlights: [
      "Guided walks through tea plantations",
      "Tea factory visits and processing tours",
      "Aromatic spice garden exploration",
      "Echo Point and Top Station sightseeing",
      "Professional tea tasting sessions"
    ],
    included: ["Expert guided plantation tour", "Tea factory visit with demonstrations", "Traditional Kerala lunch", "Comfortable transportation", "Premium tea samples to take home"]
  },
  {
    id: 7,
    title: "Rishikesh Yoga & Wellness Retreat",
    description: "Find inner peace and rejuvenation in the yoga capital of the world with meditation, yoga sessions, and spiritual experiences by the Ganges.",
    location: "Rishikesh, Uttarakhand",
    price: 3200,
    duration: "2 Days",
    category: "Wellness",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    rating: 4.9,
    reviewCount: 245,
    highlights: [
      "Daily yoga and meditation sessions",
      "Spiritual Ganga Aarti ceremony",
      "Ayurvedic massage and treatments",
      "Vegetarian sattvic meals",
      "Visit to ancient ashrams and temples"
    ],
    included: ["Yoga retreat accommodation", "All yoga and meditation sessions", "Ayurvedic treatments", "Vegetarian meals", "Spiritual guidance"]
  },
  {
    id: 8,
    title: "Andaman Scuba Diving Experience",
    description: "Dive into the crystal-clear waters of Andaman Islands and explore vibrant coral reefs, exotic marine life, and underwater wonders.",
    location: "Havelock Island, Andaman",
    price: 6500,
    duration: "Full Day",
    category: "Water Sports",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    rating: 4.8,
    reviewCount: 312,
    highlights: [
      "PADI certified scuba diving",
      "Explore vibrant coral reefs",
      "Encounter exotic marine life",
      "Underwater photography session",
      "Beach relaxation and snorkeling"
    ],
    included: ["Complete diving equipment", "PADI certified instructor", "Underwater camera", "Lunch and refreshments", "Boat transfers"]
  }
];

export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    
    // Try to use database first, fall back to mock data
    let experiences = mockExperiences;
    
    try {
      const whereClause: any = {};
      
      if (category) {
        whereClause.category = category;
      }
      
      if (minPrice || maxPrice) {
        whereClause.price = {};
        if (minPrice) whereClause.price[Op.gte] = parseFloat(minPrice as string);
        if (maxPrice) whereClause.price[Op.lte] = parseFloat(maxPrice as string);
      }
      
      if (search) {
        whereClause[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
          { location: { [Op.iLike]: `%${search}%` } }
        ];
      }
      
      const dbExperiences = await Experience.findAll({
        where: whereClause,
        order: [['rating', 'DESC'], ['reviewCount', 'DESC']]
      });
      
      experiences = dbExperiences;
    } catch (dbError) {
      console.log('Using mock data - database not available');
      
      // Apply filters to mock data
      if (category && category !== 'All') {
        experiences = experiences.filter(exp => exp.category === category);
      }
      
      if (search) {
        const searchTerm = (search as string).toLowerCase();
        experiences = experiences.filter(exp => 
          exp.title.toLowerCase().includes(searchTerm) ||
          exp.description.toLowerCase().includes(searchTerm) ||
          exp.location.toLowerCase().includes(searchTerm)
        );
      }
      
      if (minPrice) {
        experiences = experiences.filter(exp => exp.price >= parseFloat(minPrice as string));
      }
      
      if (maxPrice) {
        experiences = experiences.filter(exp => exp.price <= parseFloat(maxPrice as string));
      }
    }
    
    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch experiences'
    });
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    let experience = null;
    
    try {
      experience = await Experience.findByPk(id, {
        include: [{
          model: Slot,
          as: 'slots',
          where: {
            date: { [Op.gte]: new Date() },
            availableSpots: { [Op.gt]: 0 }
          },
          required: false,
          order: [['date', 'ASC'], ['startTime', 'ASC']]
        }]
      });
    } catch (dbError) {
      console.log('Using mock data - database not available');
      experience = mockExperiences.find(exp => exp.id === parseInt(id));
      
      if (experience) {
        // Add mock slots
        experience = {
          ...experience,
          slots: [
            {
              id: 1,
              experienceId: experience.id,
              date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
              startTime: '09:00',
              endTime: '17:00',
              availableSpots: 8,
              totalSpots: 10
            },
            {
              id: 2,
              experienceId: experience.id,
              date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
              startTime: '10:00',
              endTime: '18:00',
              availableSpots: 5,
              totalSpots: 10
            }
          ]
        };
      }
    }
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        error: 'Experience not found'
      });
    }
    
    res.json({
      success: true,
      data: experience
    });
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch experience details'
    });
  }
};
