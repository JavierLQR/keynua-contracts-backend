import * as argon2 from 'argon2'

// Encript password
export const hashPassword = async (password: string) => await argon2.hash(password)

// Verify password encript
export const verifyPassword = async (hashPassword: string, password: string) =>
  await argon2.verify(hashPassword, password)
