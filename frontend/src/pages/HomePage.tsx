import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import ExperienceCard from '../components/ExperienceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Experience } from '../types';
import { experiencesAPI } from '../services/api';

const HomePage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['All', 'Adventure', 'Water Sports', 'Trekking', 'Wildlife', 'Leisure', 'Camping'];

  // Fetch experiences when component mounts or category changes
  useEffect(() => {
    fetchExperiences();
  }, [selectedCategory]);

  // Clear error and retry when component becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && error) {
        fetchExperiences();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [error]);

  const fetchExperiences = async (retryCount = 0) => {
    try {
      setLoading(true);
      setError(''); // Clear any previous errors
      const params: any = {};
      if (selectedCategory && selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      const response = await experiencesAPI.getAll(params);
      setExperiences(response.data || []);
      setError('');
    } catch (err: any) {
      console.error('Error fetching experiences:', err);
      
      // Retry once if it's a network error
      if (retryCount === 0 && (err.code === 'ECONNABORTED' || err.code === 'ERR_NETWORK')) {
        console.log('Retrying request...');
        setTimeout(() => fetchExperiences(1), 1000);
        return;
      }
      
      setError('Failed to load experiences. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchExperiences();
      return;
    }
    try {
      setLoading(true);
      const response = await experiencesAPI.getAll({ search: searchQuery });
      setExperiences(response.data || []);
      setError('');
    } catch (err) {
      setError('Failed to search experiences. Please try again.');
      console.error('Error searching:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredExperiences = experiences;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto container-padding section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="block text-gradient bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Experiences
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-12 leading-relaxed">
              Book unforgettable adventures across India's most beautiful destinations
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search experiences, destinations..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/40 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 focus:ring-4 focus:ring-white/20 transition-all shadow-soft"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-secondary-200 sticky top-0 z-40 shadow-soft">
        <div className="max-w-7xl mx-auto container-padding py-6">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 text-secondary-600 flex-shrink-0">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter by:</span>
            </div>
            <div className="flex gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                  className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 ${
                    (category === 'All' && !selectedCategory) || selectedCategory === category 
                      ? 'bg-primary-600 text-white shadow-medium hover:bg-primary-700' 
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 hover:text-secondary-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="max-w-7xl mx-auto container-padding section-padding">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Something went wrong</h3>
              <p className="text-error-600 mb-6">{error}</p>
              <button onClick={() => fetchExperiences()} className="btn-primary">
                Try Again
              </button>
            </div>
          </div>
        ) : filteredExperiences.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">No experiences found</h3>
              <p className="text-secondary-600">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-secondary-900 mb-2">
                {selectedCategory ? `${selectedCategory} Experiences` : 'All Experiences'}
              </h2>
              <p className="text-secondary-600 text-lg">
                {filteredExperiences.length} {filteredExperiences.length === 1 ? 'experience' : 'experiences'} found
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
