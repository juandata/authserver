import jwt from 'jsonwebtoken';

export default function tokenGenerator(passwordHash : string) {
  return jwt.sign({ passwordHash }, process.env.TOKEN_SECRET as string, { expiresIn: "1800s", });
}
