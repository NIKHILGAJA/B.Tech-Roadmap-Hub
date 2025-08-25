import React from 'react';
import type { CareerPath } from '../types';

interface CareerCardsProps {
  careerPaths: CareerPath[];
}

const CareerCard: React.FC<{ career: CareerPath }> = ({ career }) => {
    return (
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-6 backdrop-blur-lg h-full flex flex-col transform hover:-translate-y-2 transition-transform duration-300 group">
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-[var(--color-primary-light)] group-hover:text-[var(--color-primary)] transition-colors">{career.title}</h3>
                <p className="text-sm mt-1 text-[var(--color-secondary-light)] font-semibold">{career.avgSalary}</p>
                <p className="text-[var(--color-text-secondary)] mt-3 text-sm">{career.description}</p>
                <div className="mt-4">
                    <h4 className="font-semibold text-[var(--color-text-primary)] text-sm">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {career.skills.map(skill => (
                            <span key={skill} className="px-2 py-1 text-xs bg-[var(--color-primary)]/20 text-[var(--color-primary-light)] rounded-full">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] text-sm">Portfolio Project Idea:</h4>
                <p className="text-[var(--color-text-secondary)] mt-1 text-sm">{career.projectIdea}</p>
            </div>
        </div>
    );
};

const CareerCards: React.FC<CareerCardsProps> = ({ careerPaths }) => {
  return (
    <div id="career-cards-wrapper" className="mt-16">
      <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-secondary-light)] mb-8">
        Potential Career Paths
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {careerPaths.map(career => (
          <CareerCard key={career.title} career={career} />
        ))}
      </div>
    </div>
  );
};

export default CareerCards;