export interface User {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  password?: string;
  jobTitle: string;
  profileImage: string;
}

export interface Project {
  _id?: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

export interface Skills {
  techSkills: string[];
  softSkills: string[];
}

export interface PortfolioResponse {
  user: User & {
    projects: Project[];
    skills: Skills;
  };
}
