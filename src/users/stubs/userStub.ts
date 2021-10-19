import { User } from '../interfaces/user.interface';

export const userStub = (): User => ({
  name: 'Test Username',
  dob: new Date(),
  description: 'User description',
});
