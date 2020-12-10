import { User } from '../../@api-module';

export class UserState {
  user?: User;
  error?: any;
  isLoading?: boolean;
  isLoggedIn?: boolean;
}
