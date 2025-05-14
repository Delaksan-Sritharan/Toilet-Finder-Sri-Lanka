import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Accessibility, Scale as MaleFemale, Droplets, File as Toilet } from 'lucide-react';
import { Toilet as ToiletType } from '../../types/toilet';

interface ToiletListProps {
  toilets: ToiletType[];
}

const ToiletList: React.FC<ToiletListProps> = ({ toilets }) => {
  return (
    <div className="divide-y divide-gray-200">
      {toilets.length === 0 ? (
        <div className="p-8 text-center">
          <Toilet className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No toilets found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your filters or add a new toilet location.
          </p>
          <div className="mt-6">
            <Link
              to="/add"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Add Toilet
            </Link>
          </div>
        </div>
      ) : (
        toilets.map((toilet) => (
          <div key={toilet.id} className="p-4 hover:bg-gray-50 transition">
            <Link to={`/toilet/${toilet.id}`} className="block">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{toilet.name}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{toilet.address}</p>
                  
                  <div className="mt-2 flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < toilet.cleanliness
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {toilet.cleanliness.toFixed(1)} • {toilet.reviewCount} reviews
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 sm:mt-0 flex flex-wrap gap-2">
                  {toilet.hasAccessibility && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      <Accessibility className="mr-1 h-3 w-3" />
                      Accessible
                    </span>
                  )}
                  
                  {toilet.gender && (
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                      <MaleFemale className="mr-1 h-3 w-3" />
                      {toilet.gender}
                    </span>
                  )}
                  
                  {toilet.hasWater && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      <Droplets className="mr-1 h-3 w-3" />
                      Has Water
                    </span>
                  )}
                  
                  {toilet.hasToiletPaper && (
                    <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                      <Toilet className="mr-1 h-3 w-3" />
                      Toilet Paper
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-2 text-sm text-gray-600">
                <p>Distance: {toilet.distance} km</p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default ToiletList;