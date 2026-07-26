import { Project, Experience, Skill } from './types';
import details from '../Details.json';

const avatarUrl = new URL('./profile.jpg', import.meta.url).href;
const resumeUrl = new URL('./Rezume.pdf', import.meta.url).href;
const projectImages: Record<string, string> = {
  'Ai virtual Keyboard document': new URL('./aivk.jpg', import.meta.url).href,
  'Task Sync': new URL('./tasksync.jpg', import.meta.url).href,
};

export const PERSONAL_INFO = {
  name: details.personal_information.name,
  title: details.personal_information.role,
  location: details.personal_information.location,
  email: details.personal_information.email,
  mobile: details.personal_information.mobile,
  tagline: details.summary,
  bio: details.summary,
  avatar: avatarUrl,
  education: details.education[0],
  resumeUrl,
  socials: {
    github: '#',
    linkedin: '#',
    twitter: '#',
    email: details.personal_information.email,
  }
};

export const PROJECTS: Project[] = details.projects.map((project, index) => ({
  id: `${index + 1}`,
  title: project.title,
  description: project.description ?? project.highlights.join(' '),
  category: project.category ?? 'fullstack',
  tags: project.technologies,
  image: project.image ? new URL(`./${project.image}`, import.meta.url).href : avatarUrl,
  demoUrl: '#',
  githubUrl: '#',
  featured: index === 0,
}));

export const EXPERIENCES: Experience[] = details.experience.map((exp, index) => ({
  id: `e${index + 1}`,
  role: exp.role,
  company: exp.company,
  duration: exp.duration,
  location: exp.location,
  description: exp.highlights,
  skills: ['LaTeX', 'XML', 'Web Layout', 'HTML', 'CSS'],
}));

export const SKILLS: Skill[] = [
  { name: 'JavaScript', category: 'languages', level: 92, iconName: 'Flame' },
  { name: 'Python', category: 'languages', level: 88, iconName: 'Code2' },
  { name: 'HTML', category: 'languages', level: 90, iconName: 'FileHtml' },
  { name: 'CSS', category: 'languages', level: 90, iconName: 'FileHtml' },
  { name: 'React.js', category: 'frontend', level: 88, iconName: 'Atom' },
  { name: 'Node.js', category: 'backend', level: 85, iconName: 'Server' },
  { name: 'MySQL', category: 'backend', level: 82, iconName: 'Database' },
  { name: 'Visual Studio Code', category: 'tools', level: 85, iconName: 'GitBranch' },
  { name: 'GitHub', category: 'tools', level: 84, iconName: 'GitBranch' },
];
