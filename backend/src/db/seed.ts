import { sequelize } from '../config/database';
import { Experience, Slot } from '../models';

const seedData = async () => {
  try {
    console.log('🌱 Starting database seed...');

    // Clear existing data
    await sequelize.sync({ force: true });
    console.log('✅ Database cleared');

    // Seed Experiences
    const experiences = await Experience.bulkCreate([
      {
        title: 'Sunrise Hot Air Balloon Ride',
        description: 'Experience the magic of floating above the clouds during sunrise. This unforgettable hot air balloon adventure offers breathtaking panoramic views of the landscape below. Perfect for couples, families, and adventure seekers looking for a unique perspective of the world.',
        location: 'Jaipur, Rajasthan',
        price: 8500,
        duration: '3 hours',
        category: 'Adventure',
        imageUrl: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800&q=80',
        rating: 4.8,
        reviewCount: 342,
        highlights: [
          'Witness stunning sunrise views',
          'Professional pilot and crew',
          'Champagne celebration after landing',
          'Flight certificate included'
        ],
        included: [
          'Hotel pickup and drop-off',
          'Pre-flight refreshments',
          'Flight certificate',
          'Champagne toast',
          'Insurance coverage'
        ]
      },
      {
        title: 'Scuba Diving in Andaman',
        description: 'Dive into the crystal-clear waters of the Andaman Sea and explore vibrant coral reefs teeming with marine life. This scuba diving experience is suitable for both beginners and certified divers, with professional instructors ensuring your safety throughout.',
        location: 'Havelock Island, Andaman',
        price: 4500,
        duration: '4 hours',
        category: 'Water Sports',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
        rating: 4.9,
        reviewCount: 567,
        highlights: [
          'Explore vibrant coral reefs',
          'Spot exotic marine life',
          'Professional PADI instructors',
          'All equipment provided'
        ],
        included: [
          'Diving equipment rental',
          'Professional instructor',
          'Underwater photography',
          'Safety briefing',
          'Refreshments'
        ]
      },
      {
        title: 'Himalayan Trekking Adventure',
        description: 'Embark on a thrilling trek through the majestic Himalayas. This multi-day adventure takes you through pristine forests, remote villages, and offers spectacular mountain views. Perfect for experienced trekkers seeking an authentic mountain experience.',
        location: 'Manali, Himachal Pradesh',
        price: 12000,
        duration: '5 days',
        category: 'Trekking',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        rating: 4.7,
        reviewCount: 234,
        highlights: [
          'Trek through pristine valleys',
          'Camp under the stars',
          'Visit remote mountain villages',
          'Experienced trek leader'
        ],
        included: [
          'Camping equipment',
          'All meals during trek',
          'Professional guide',
          'Permits and fees',
          'First aid kit'
        ]
      },
      {
        title: 'Wildlife Safari in Ranthambore',
        description: 'Experience the thrill of spotting Bengal tigers in their natural habitat. This guided safari takes you through Ranthambore National Park, one of India\'s premier wildlife destinations, where you can also see leopards, deer, and various bird species.',
        location: 'Ranthambore, Rajasthan',
        price: 3500,
        duration: '6 hours',
        category: 'Wildlife',
        imageUrl: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
        rating: 4.6,
        reviewCount: 445,
        highlights: [
          'Spot Bengal tigers',
          'Expert naturalist guide',
          'Morning and evening safaris',
          'Photography opportunities'
        ],
        included: [
          'Safari jeep with driver',
          'Park entry fees',
          'Naturalist guide',
          'Binoculars',
          'Refreshments'
        ]
      },
      {
        title: 'Paragliding in Bir Billing',
        description: 'Soar like a bird over the stunning Kangra Valley. Bir Billing is renowned as one of the best paragliding sites in the world. Experience the thrill of flying with experienced pilots in tandem flights suitable for beginners.',
        location: 'Bir Billing, Himachal Pradesh',
        price: 2500,
        duration: '2 hours',
        category: 'Adventure',
        imageUrl: 'https://images.unsplash.com/photo-1512225530990-13c4a0f6c3c8?w=800&q=80',
        rating: 4.9,
        reviewCount: 678,
        highlights: [
          'Tandem flight with expert pilot',
          'Breathtaking valley views',
          'GoPro video recording',
          'Safety certified equipment'
        ],
        included: [
          'Tandem paragliding flight',
          'Safety equipment',
          'Professional pilot',
          'Flight video',
          'Insurance'
        ]
      },
      {
        title: 'Backwater Houseboat Cruise',
        description: 'Relax and unwind on a traditional Kerala houseboat as you cruise through the serene backwaters. Enjoy authentic Kerala cuisine, witness village life along the banks, and experience the tranquility of this unique ecosystem.',
        location: 'Alleppey, Kerala',
        price: 15000,
        duration: '24 hours',
        category: 'Leisure',
        imageUrl: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
        rating: 4.8,
        reviewCount: 523,
        highlights: [
          'Traditional Kerala houseboat',
          'Authentic local cuisine',
          'Overnight stay on water',
          'Scenic backwater views'
        ],
        included: [
          'Houseboat accommodation',
          'All meals (lunch, dinner, breakfast)',
          'Crew and guide',
          'Sightseeing stops',
          'Welcome drinks'
        ]
      },
      {
        title: 'Desert Camping in Jaisalmer',
        description: 'Experience the magic of the Thar Desert with an overnight camping adventure. Enjoy camel rides, traditional Rajasthani folk performances, stargazing, and authentic desert cuisine under the open sky.',
        location: 'Jaisalmer, Rajasthan',
        price: 3000,
        duration: '18 hours',
        category: 'Camping',
        imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80',
        rating: 4.7,
        reviewCount: 389,
        highlights: [
          'Camel safari at sunset',
          'Traditional folk performances',
          'Stargazing experience',
          'Bonfire and BBQ dinner'
        ],
        included: [
          'Desert camp accommodation',
          'Camel ride',
          'Cultural performances',
          'Dinner and breakfast',
          'Bonfire'
        ]
      },
      {
        title: 'White Water Rafting in Rishikesh',
        description: 'Challenge yourself with an exhilarating white water rafting experience on the Ganges River. Navigate through rapids of varying difficulty levels with experienced guides ensuring your safety and fun.',
        location: 'Rishikesh, Uttarakhand',
        price: 1500,
        duration: '3 hours',
        category: 'Water Sports',
        imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
        rating: 4.8,
        reviewCount: 712,
        highlights: [
          'Grade II-III rapids',
          'Professional river guides',
          'Safety equipment provided',
          'Beach camping option'
        ],
        included: [
          'Rafting equipment',
          'Life jackets and helmets',
          'Professional guide',
          'Safety briefing',
          'Changing rooms'
        ]
      }
    ]);

    console.log(✅ Created  experiences);

    // Seed Slots for each experience
    const today = new Date();
    const slots = [];

    for (const experience of experiences) {
      // Create slots for next 30 days
      for (let i = 1; i <= 30; i++) {
        const slotDate = new Date(today);
        slotDate.setDate(today.getDate() + i);

        // Morning slot
        slots.push({
          experienceId: experience.id,
          date: slotDate,
          startTime: '06:00',
          endTime: '09:00',
          availableSpots: Math.floor(Math.random() * 8) + 3, // 3-10 spots
          totalSpots: 10
        });

        // Afternoon slot
        slots.push({
          experienceId: experience.id,
          date: slotDate,
          startTime: '14:00',
          endTime: '17:00',
          availableSpots: Math.floor(Math.random() * 8) + 3,
          totalSpots: 10
        });

        // Evening slot (for some experiences)
        if (['Adventure', 'Leisure', 'Camping'].includes(experience.category)) {
          slots.push({
            experienceId: experience.id,
            date: slotDate,
            startTime: '18:00',
            endTime: '21:00',
            availableSpots: Math.floor(Math.random() * 6) + 2,
            totalSpots: 8
          });
        }
      }
    }

    await Slot.bulkCreate(slots);
    console.log(✅ Created  slots);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
