import PocketBase from 'pocketbase';

// Create a single PocketBase instance for the entire app
let pb: PocketBase | null = null;

// Initialize PocketBase with the correct URL
export function initPocketBase() {
  if (typeof window === 'undefined') {
    // Server-side: create a new instance every time
    return new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');
  }

  // Client-side: reuse the instance
  if (!pb) {
    pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

    // Load auth from localStorage (handled automatically by PocketBase)
    // This ensures auth persistence across page refreshes
  }

  return pb;
}

// Get the PocketBase instance
export function getPocketBase() {
  return initPocketBase();
}

// Types for PocketBase collections
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  created: string;
  updated: string;
}

export interface Role {
  id: string;
  title: string;
  description: string;
  icon?: string;
  color?: string;
}

export interface Simulation {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  role: string;
  expand?: {
    role: Role;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'adaptive';
  duration: number;
  image?: string;
  isActive: boolean;
  skills: string[];
  objectives?: string[];
  resources?: Array<{
    title: string;
    url: string;
    type?: string;
    description?: string;
  }>;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  instructions?: string;
  simulation: string;
  expand?: {
    simulation: Simulation;
  };
  type: 'code' | 'design' | 'decision' | 'data' | 'ai';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  timeLimit?: number;
  duration?: number;
  resources?: any;
  evaluation?: any;
  order?: number;
}

export interface Result {
  id: string;
  user: string;
  simulation: string;
  task: string;
  expand?: {
    user: User;
    simulation: Simulation;
    task: Task;
  };
  startTime: string;
  endTime?: string;
  score?: number;
  accuracy?: number;
  speed?: number;
  submission?: any;
  answer?: string;
  feedback?: string;
  recording?: any;
  completed: boolean;
}

// API functions for each collection
export const api = {
  // Auth functions
  auth: {
    register: async (email: string, password: string, passwordConfirm: string, name?: string) => {
      const pb = getPocketBase();
      const user = await pb.collection('users').create({
        email,
        password,
        passwordConfirm,
        name,
      });
      return user;
    },

    login: async (email: string, password: string) => {
      const pb = getPocketBase();
      const authData = await pb.collection('users').authWithPassword(email, password);
      return authData;
    },

    logout: () => {
      const pb = getPocketBase();
      pb.authStore.clear();
    },

    getUser: async () => {
      const pb = getPocketBase();
      if (pb.authStore.isValid) {
        // Convert the auth model to our User type
        const model = pb.authStore.model;
        if (model) {
          return {
            id: model.id,
            email: model.email as string,
            name: model.name as string,
            avatar: model.avatar as string,
            created: model.created,
            updated: model.updated,
          } as User;
        }
      }
      return null;
    },
  },

  // Roles
  roles: {
    getAll: async () => {
      const pb = getPocketBase();
      const records = await pb.collection('roles').getFullList<Role>();
      return records;
    },

    getById: async (id: string) => {
      const pb = getPocketBase();
      const record = await pb.collection('roles').getOne<Role>(id);
      return record;
    },
  },

  // Simulations
  simulations: {
    getAll: async () => {
      const pb = getPocketBase();
      const records = await pb.collection('simulations').getFullList<Simulation>({
        expand: 'role',
      });
      return records;
    },

    getById: async (id: string) => {
      const pb = getPocketBase();
      const record = await pb.collection('simulations').getOne<Simulation>(id, {
        expand: 'role',
      });
      return record;
    },

    getByRole: async (roleId: string) => {
      const pb = getPocketBase();
      const records = await pb.collection('simulations').getFullList<Simulation>({
        filter: `role = "${roleId}"`,
        expand: 'role',
      });
      return records;
    },
  },

  // Tasks
  tasks: {
    getAll: async () => {
      const pb = getPocketBase();
      const records = await pb.collection('tasks').getFullList<Task>({
        expand: 'simulation',
        sort: 'order',
      });
      return records;
    },

    getById: async (id: string) => {
      const pb = getPocketBase();
      const record = await pb.collection('tasks').getOne<Task>(id, {
        expand: 'simulation',
      });
      return record;
    },

    getBySimulation: async (simulationId: string) => {
      const pb = getPocketBase();
      const records = await pb.collection('tasks').getFullList<Task>({
        filter: `simulation = "${simulationId}"`,
        expand: 'simulation',
        sort: 'order',
      });
      return records;
    },
  },

  // Results
  results: {
    getAll: async () => {
      const pb = getPocketBase();
      const records = await pb.collection('results').getFullList<Result>({
        expand: 'user,simulation,task',
      });
      return records;
    },

    getById: async (id: string) => {
      const pb = getPocketBase();
      const record = await pb.collection('results').getOne<Result>(id, {
        expand: 'user,simulation,task',
      });
      return record;
    },

    getByUser: async (userId: string) => {
      const pb = getPocketBase();
      const records = await pb.collection('results').getFullList<Result>({
        filter: `user = "${userId}"`,
        expand: 'user,simulation,task',
      });
      return records;
    },

    create: async (data: Partial<Result>) => {
      const pb = getPocketBase();
      const record = await pb.collection('results').create<Result>(data);
      return record;
    },

    update: async (id: string, data: Partial<Result>) => {
      const pb = getPocketBase();
      const record = await pb.collection('results').update<Result>(id, data);
      return record;
    },
  },
};
