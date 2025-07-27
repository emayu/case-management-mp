import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: {
      id: string;
      nombre: string;
      rol: string;
    };
  }
}