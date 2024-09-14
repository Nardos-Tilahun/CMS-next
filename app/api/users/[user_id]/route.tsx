import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { UserSchema } from '../../schema';
import { fromZodError } from 'zod-validation-error';
export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: number } }
) {
  const user = await prisma.user.findUnique({
    where: { user_id: params.user_id },
  });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { user_id: number } }
) {
  const body = await request.json();
  const valid = UserSchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json(fromZodError(valid.error), { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 });
  }

  const updatedUser = await prisma.user.update({
    where: { user_id: params.user_id },
    data: {
      first_name: body.firstName,
      last_name: body.lastName,
      phone_number: body.phoneNumber,
      updatedAt: new Date(),
    },
  });
  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { user_id: number } }
) {
  const body = await request.json();
  const valid = UserSchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json(fromZodError(valid.error), { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 });
  }
  const deletedUser = await prisma.user.update({
    where: { user_id: params.user_id },
    data: {
      deletedAt: new Date(),
    },
  });
  if (!deletedUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json(deletedUser);
}
