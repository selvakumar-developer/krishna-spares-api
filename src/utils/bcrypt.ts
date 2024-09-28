import * as bcrypt from 'bcrypt';

export function hash(input: string) {
  return bcrypt.hashSync(input, 10);
}
