import * as bcrypt from 'bcrypt';

export function hash(input: string) {
  return bcrypt.hashSync(input, 10);
}

export function compare(input: string, hashInput: string) {
  return bcrypt.compareSync(input, hashInput);
}
