export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  technology: string;
  description: string;
  keyConcepts: string[];
  pythonCode: string;
  demoType: 'voter' | 'calculator' | 'atm' | 'grade';
}

export interface SkillItem {
  name: string;
  level: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface JourneyMilestone {
  step: string;
  title: string;
  status: 'completed' | 'in-progress' | 'future';
  description: string;
}

export interface ExperienceCard {
  title: string;
  category: string;
  description: string;
  highlights: string[];
}
