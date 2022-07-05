import Express from 'express';
import jwt from 'jsonwebtoken';

export default function validateToken(req : Express.Request, res : Express.Response, next : Express.NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
    if (err) return res.sendStatus(403);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
    req.token = decoded;
    next();
  });
}