import { Request } from 'express';

interface UserPayload {
  id: number;
  username: string;
  sub: {
    firstname: string;
    lastname: string;
  };
}

export interface RequestWithUser extends Request {
  user: UserPayload;
}
