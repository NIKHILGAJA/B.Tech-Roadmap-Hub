import React from 'react';
import type { YearData, TitledResourceGroup, Resource, ProjectIdea } from '../types';

// SVG Icons for different sections
const Icons = {
  Subject: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  Certificate: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Project: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  Internship: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Placement: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  GitHub: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>,
  Link: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1.5 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
};

interface RoadmapDisplayProps {
  roadmapData: YearData[];
}

const getYearTitle = (year: number): string => {
    const titles = [
      'Foundations',
      'Core Skills',
      'Advanced Concepts',
      'Specialization & Projects'
    ];
    const yearLabel = year === 4 ? 'Final Year' : `Year ${year}`;
    const descriptiveTitle = titles[year - 1] || '';
    return `${yearLabel} – ${descriptiveTitle}`;
};

const DetailSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-6 first:mt-0">
      <h4 className="flex items-center gap-2 font-semibold text-[var(--color-primary-light)]">
        {icon}
        <span>{title}</span>
      </h4>
      <div className="text-sm text-[var(--color-text-secondary)] mt-2 pl-7">{children}</div>
    </div>
  );

const ResourceCard: React.FC<{resource: Resource}> = ({ resource }) => {
    const accessColor = resource.access === 'Free' ? 'text-[var(--color-success-text)] bg-[var(--color-success-bg)]' : 'text-[var(--color-warning-text)] bg-[var(--color-warning-bg)]';
    return (
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block p-3 bg-[var(--color-bg)]/50 border border-[var(--color-border)] rounded-lg group hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-input-bg)] transition-all">
            <div className="flex justify-between items-start">
                <p className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors">{resource.title}</p>
                <Icons.Link/>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{resource.notes}</p>
            <div className="flex items-center gap-2 mt-2 text-xs">
                <span className={`px-2 py-0.5 font-medium rounded-full ${accessColor}`}>{resource.access}</span>
                <span className="px-2 py-0.5 font-medium rounded-full bg-[var(--color-input-bg)] text-[var(--color-text-muted)]">{resource.platform}</span>
                <span className="px-2 py-0.5 font-medium rounded-full bg-[var(--color-input-bg)] text-[var(--color-text-muted)]">{resource.type}</span>
            </div>
        </a>
    )
}

const ResourceGroupList: React.FC<{items: TitledResourceGroup[]}> = ({items}) => (
    <div className="space-y-4">
    {items.map(group => (
        <div key={group.title}>
            <h5 className="font-semibold text-[var(--color-text-primary)] mb-2">{group.title}</h5>
            <div className="space-y-2">
                {group.resources.map(resource => <ResourceCard key={resource.url} resource={resource} />)}
            </div>
        </div>
    ))}
    </div>
)

const RoadmapItem: React.FC<{ yearData: YearData, isLast: boolean }> = ({ yearData, isLast }) => {
  const { year, coreSubjects, skills, certifications, projects, internships, placementPrep } = yearData;

  return (
    <div className="relative pl-8 sm:pl-12 py-6 group year-section">
      <div className="absolute left-0 top-0 h-full w-px bg-[var(--color-border)]">
        {!isLast && <div className="absolute left-[-1px] top-9 h-full w-px bg-gradient-to-b from-[var(--color-primary-light)] to-[var(--color-secondary)]"></div>}
      </div>
      <div className="absolute left-[-8px] sm:left-[-11px] top-6 w-4 h-4 sm:w-6 sm:h-6 bg-[var(--color-bg-alt)] border-2 border-[var(--color-primary-light)] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_15px_var(--color-glow-primary)]">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[var(--color-primary-light)] rounded-full transition-all duration-300 group-hover:scale-110"></div>
      </div>
      
      <div className="relative">
        <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">{getYearTitle(year)}</h3>
        <div className="mt-4 p-4 md:p-6 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl backdrop-blur-lg shadow-lg shadow-[var(--color-shadow)] transition-all duration-300 group-hover:border-[var(--color-primary-light)]/50 group-hover:shadow-[var(--color-glow-primary)]/10">
          
          <DetailSection title="📚 Core Subjects" icon={<Icons.Subject />}>
            <ResourceGroupList items={coreSubjects ?? []} />
          </DetailSection>

          <DetailSection title="💻 Programming & Tools" icon={<Icons.Code />}>
            <h5 className="font-bold text-[var(--color-text-primary)] mt-2 mb-3">Programming:</h5>
            <ResourceGroupList items={skills?.programming ?? []} />
            <h5 className="font-bold text-[var(--color-text-primary)] mt-4 mb-3">Software/Tools:</h5>
            <ResourceGroupList items={skills?.software ?? []} />
            <h5 className="font-bold text-[var(--color-text-primary)] mt-4 mb-3">Soft Skills:</h5>
            <p className="text-[var(--color-text-muted)]">{(skills?.softSkills ?? []).join(', ')}</p>
          </DetailSection>

          <DetailSection title="📜 Certifications" icon={<Icons.Certificate />}>
            <ResourceGroupList items={certifications ?? []} />
          </DetailSection>

          <DetailSection title="⚡ Project Ideas" icon={<Icons.Project />}>
            <div className="space-y-4">
                {(projects ?? []).map(p => (
                    <div key={p.title} className="p-3 bg-[var(--color-bg)]/50 border border-[var(--color-border)] rounded-lg">
                        <h5 className="font-semibold text-[var(--color-secondary-light)] flex justify-between items-center">
                            {p.title}
                            {p.githubLink && (
                                <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors p-1 rounded-full hover:bg-[var(--color-border)]">
                                    <Icons.GitHub />
                                </a>
                            )}
                        </h5>
                        <p className="text-[var(--color-text-muted)] text-xs mt-1">{p.description}</p>
                    </div>
                ))}
            </div>
          </DetailSection>

          <DetailSection title="🏢 Internships" icon={<Icons.Internship />}>
            <p className="text-[var(--color-text-muted)]">{internships ?? 'No specific advice for this year.'}</p>
          </DetailSection>

          <DetailSection title="🎯 Placement Prep" icon={<Icons.Placement />}>
            <ResourceGroupList items={placementPrep ?? []} />
          </DetailSection>
        </div>
      </div>
    </div>
  );
};


const RoadmapDisplay: React.FC<RoadmapDisplayProps> = ({ roadmapData }) => {
  return (
    <div id="roadmap-content-wrapper" className="mt-12">
      <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-secondary-light)] mb-8">
        Your Personalized 4-Year Roadmap
      </h2>
      <div className="relative">
        {roadmapData.map((yearData, index) => (
          <RoadmapItem key={yearData.year} yearData={yearData} isLast={index === roadmapData.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default RoadmapDisplay;
