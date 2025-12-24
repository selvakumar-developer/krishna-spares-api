import { AdminUser } from 'src/modules/admin-users/entities/admin-user.entity';
import { User } from 'src/modules/users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      adminUser?: AdminUser;
    }
  }
}
