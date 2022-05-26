import { AuthStrategy } from 'prisma/prisma-client';

export class ReturnUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  authStrategy: AuthStrategy;
}
