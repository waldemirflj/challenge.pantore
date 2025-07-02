import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const encryptPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (data: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(data, hash);
};
