type UserSession = {
  isLoggedIn: boolean;
  username: string;
  token: string;
};

type User = {
  name: string;
  created_at: Date;
  image: string;
  password: string;
  token: string;
};

type Project = {
  id: number;
  name: string;
  description: string;
  owner: string;
  created_at: Date;
  isPrivate: boolean;
  image: string;
  community_name: string | null;
};

type Community = {
  name: string;
  description: string;
  created_at: Date;
  projects: Project[];
  subscribers: User[];
};
