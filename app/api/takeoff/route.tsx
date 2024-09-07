import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { fromZodError } from 'zod-validation-error';
import { TakeoffSchema } from '../schema';

export async function GET(request: NextRequest) {
  const takeoffs = await prisma.takeoff.findMany();
  return NextResponse.json(takeoffs);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const valid = TakeoffSchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json(fromZodError(valid.error), { status: 400 });
  }

  const newTakeoff = await prisma.takeoff.create({
    data: {
      boq_item_id: body.boq_item_id,
      milestone_id: body.milestone_id,
      takeoff_quantity: body.takeoff_quantity,
    },
  });
  return NextResponse.json(newTakeoff);
}
