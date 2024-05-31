import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // Замените на ваш секретный ключ

export function middleware(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Добавляем декодированного пользователя в запрос
  } catch (error) {
    return NextResponse.redirect('/login');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*'], // Защищенные маршруты
};
