export interface Project {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  details: {
    overview: string;
    features: string[];
    technologies: string[];
    github?: string;
    demo?: string;
  };
}