export interface Resource {
  title: string;
  url: string;
  platform: string;
  type: 'Playlist' | 'Course' | 'Docs' | 'Article' | 'Repo' | string;
  access: 'Free' | 'Paid' | 'Free audit';
  notes: string;
  last_verified_IST: string;
}

export interface TitledResourceGroup {
  title: string;
  resources: Resource[];
}

export interface ProjectIdea {
  title: string;
  description: string;
  githubLink: string;
}

export interface YearData {
  year: number;
  coreSubjects: TitledResourceGroup[];
  skills: {
    programming: TitledResourceGroup[];
    software: TitledResourceGroup[];
    softSkills: string[];
  };
  certifications: TitledResourceGroup[];
  projects: ProjectIdea[];
  internships: string;
  placementPrep: TitledResourceGroup[];
}

export interface Roadmap {
  roadmap: YearData[];
}

export interface CareerPath {
  title: string;
  description: string;
  skills: string[];
  avgSalary: string;
  projectIdea: string;
}

export interface GeneratedData {
  roadmap: YearData[];
  careerPaths: CareerPath[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}