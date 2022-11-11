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
