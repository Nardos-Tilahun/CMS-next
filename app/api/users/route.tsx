import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { UserSchemaWithConfirmation } from '../schema';
import { fromZodError } from 'zod-validation-error';

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const valid = UserSchemaWithConfirmation.safeParse(body);
  if (!valid.success) {
    return NextResponse.json(fromZodError(valid.error), { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (user) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: {
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      password: body.password,
      phone_number: body.phoneNumber,
    },
  });
  return NextResponse.json(newUser);
}
