export type Project = {
  _id?: string;
  title: string;
  description: string;
  github: string;
  live?: string;
  techStack: string[];
  category: string;
  featured: boolean;
  problem?: string;
  approach?: string;
  outcome?: string;
  features?: string[];
  screenshots?: string[];
};
