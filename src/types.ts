export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'backend' | 'creative' | 'fullstack';
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface Skill {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'tools' | 'design';
  level: number; // 0 - 100 for visual progress bars or indicators
  iconName: string; // Lucide icon reference
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
