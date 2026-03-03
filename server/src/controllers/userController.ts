import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user && user.password === password) { // Use bcrypt in production!
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid credentials' });
};
