import React from 'react';
import { Accessibility, Scale as MaleFemale, Droplets, File as Toilet, Star } from 'lucide-react';

interface FilterBarProps {
  filters: {
    accessibility: boolean;
    maleOnly: boolean;
    femaleOnly: boolean;
    toiletPaper: boolean;
    water: boolean;
    minRating: number;
  };
  onFilterChange: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    // Handle mutual exclusivity for gender filters
    if (name === 'maleOnly' && checked) {
      onFilterChange({ ...filters, maleOnly: true, femaleOnly: false });
    } else if (name === 'femaleOnly' && checked) {
      onFilterChange({ ...filters, femaleOnly: true, maleOnly: false });
    } else {
      onFilterChange({ ...filters, [name]: checked });
    }
  };
  
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, minRating: parseInt(e.target.value) });
  };
  
  const clearFilters = () => {
    onFilterChange({
      accessibility: false,
      maleOnly: false,
      femaleOnly: false,
      toiletPaper: false,
      water: false,
      minRating: 0,
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Clear all filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Accessibility Filter */}
        <div className="flex items-center">
          <input
            id="accessibility"
            name="accessibility"
            type="checkbox"
            checked={filters.accessibility}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="accessibility" className="ml-2 flex items-center text-sm text-gray-700">
            <Accessibility className="h-4 w-4 mr-1" />
            Accessible
          </label>
        </div>
        
        {/* Gender Filters */}
        <div className="flex items-center">
          <input
            id="maleOnly"
            name="maleOnly"
            type="checkbox"
            checked={filters.maleOnly}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="maleOnly" className="ml-2 flex items-center text-sm text-gray-700">
            <MaleFemale className="h-4 w-4 mr-1" />
            Male Only
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="femaleOnly"
            name="femaleOnly"
            type="checkbox"
            checked={filters.femaleOnly}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="femaleOnly" className="ml-2 flex items-center text-sm text-gray-700">
            <MaleFemale className="h-4 w-4 mr-1" />
            Female Only
          </label>
        </div>
        
        {/* Amenities Filters */}
        <div className="flex items-center">
          <input
            id="toiletPaper"
            name="toiletPaper"
            type="checkbox"
            checked={filters.toiletPaper}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="toiletPaper" className="ml-2 flex items-center text-sm text-gray-700">
            <Toilet className="h-4 w-4 mr-1" />
            Toilet Paper
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="water"
            name="water"
            type="checkbox"
            checked={filters.water}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="water" className="ml-2 flex items-center text-sm text-gray-700">
            <Droplets className="h-4 w-4 mr-1" />
            Water Available
          </label>
        </div>
      </div>
      
      {/* Minimum Rating Slider */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <label htmlFor="minRating" className="text-sm font-medium text-gray-700 flex items-center">
            <Star className="h-4 w-4 mr-1" />
            Minimum Cleanliness Rating
          </label>
          <span className="text-sm text-gray-500">{filters.minRating}/5</span>
        </div>
        <input
          type="range"
          id="minRating"
          name="minRating"
          min="0"
          max="5"
          step="1"
          value={filters.minRating}
          onChange={handleRatingChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Any</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;