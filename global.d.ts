type UserSession = {
  isLoggedIn: boolean;
  username: string;
  token: string;
};

/**
 * Model User
 *
 */
type User = {
  name: string;
  created_at: Date;
  image: string;
  password: string;
  token: string;
  description: string;
};

/**
 * Model Community
 *
 */
type Community = {
  name: string;
  description: string;
  owner: string;
  created_at: Date;
};

/**
 * Model Project
 *
 */
type Project = {
  id: number;
  name: string;
  description: string;
  owner: string;
  created_at: Date;
  isPrivate: boolean;
  image: string;
  communityName: string | null;
  tags: string;
};

/**
 * Model Task
 *
 */
type Task = {
  id: number;
  name: string;
  description: string;
  prerequisites: Prisma.JsonValue;
  files: Prisma.JsonValue;
  created_at: Date;
  projectId: number;
};

/**
 * Model Submission
 *
 */
type Submission = {
  id: string;
  user_name: string;
  content: string;
  images: Prisma.JsonValue;
  created_at: Date;
};

/**
 * Model TaskSubmission
 *
 */
type TaskSubmission = {
  id: string;
  task_name: string;
  content: string;
  images: Prisma.JsonValue;
  createdAt: Date;
  userName: string;
};

/**
 * Model Tag
 *
 */
type Tag = {
  name: string;
};

/**
 * Model Message
 *
 */
type Message = {
  id: number;
  content: string;
  replyID: number | null;
  edited_at: Date;
  created_at: Date;
  projectId: number | null;
  communityName: string | null;
  username: string;
  hasReplies: boolean;
};

/**
 * Message type for api responses
 */
type Msg = Message & {
  author: User;
  community: Community | null;
  project: Project | null;
};

/**
 * Thread type
 */
type Thread<T extends true | false> = T extends true
  ? { top: Omit<Msg, "community"> | null; replies: Omit<Msg, "community">[] }
  : { top: Omit<Msg, "project"> | null; replies: Omit<Msg, "project">[] };
