import { AdminUser } from 'src/admin-users/entities/admin-user.entity';
import { User } from 'src/users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      adminUser?: AdminUser;
    }
  }
}
