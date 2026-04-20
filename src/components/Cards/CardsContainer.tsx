import React from 'react';
import { PreHarvestingCard } from './PreHarvestingCard';
import { PostHarvestingCard } from './PostHarvestingCard';

export const CardsContainer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <PreHarvestingCard />
      <PostHarvestingCard />
    </div>
  );
};