
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  iosUrl?: string;
  androidUrl?: string;
  webUrl?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  isCurrent?: boolean;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
}
