import { Link } from 'react-router-dom';
import { MapPin, Clock, Star } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <Link to={`/experience/${experience.id}`} className="card-elevated group cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4 badge-primary shadow-soft">
          {experience.category}
        </div>
        <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold text-secondary-900">{experience.rating}</span>
          <span className="text-xs text-secondary-600">({experience.reviewCount})</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
          {experience.title}
        </h3>

        <div className="flex items-center text-secondary-600 mb-3">
          <MapPin className="w-4 h-4 mr-2 text-primary-500" />
          <span className="text-sm font-medium line-clamp-1">{experience.location}</span>
        </div>

        <p className="text-secondary-600 mb-4 line-clamp-2 leading-relaxed">
          {experience.description}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm text-secondary-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1.5 text-primary-500" />
            <span className="font-medium">{experience.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
          <div>
            <span className="text-sm text-secondary-500 font-medium">Starting from</span>
            <p className="text-2xl font-bold text-secondary-900">
              ₹{experience.price.toLocaleString()}
              <span className="text-sm font-normal text-secondary-500 ml-1">per person</span>
            </p>
          </div>
          <div className="btn-primary group-hover:bg-primary-700 group-hover:shadow-medium transition-all">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExperienceCard;
