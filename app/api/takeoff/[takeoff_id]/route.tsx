import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { fromZodError } from 'zod-validation-error';
import { TakeoffSchema } from '../../schema';

export async function GET(
  request: NextRequest,
  { params }: { params: { takeoff_id: string } }
) {
  const takeoff = await prisma.takeoff.findUnique({
    where: { takeoff_id: parseInt(params.takeoff_id, 10) },
  });
  if (!takeoff) {
    return NextResponse.json({ error: 'Takeoff not found' }, { status: 404 });
  }
  return NextResponse.json(takeoff);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { takeoff_id: string } }
) {
  const body = await request.json();

  const valid = TakeoffSchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json(fromZodError(valid.error), { status: 400 });
  }

  const updatedTakeoff = await prisma.takeoff.update({
    where: { takeoff_id: parseInt(params.takeoff_id, 10) },
    data: {
      boq_item_id: body.boq_item_id,
      milestone_id: body.milestone_id,
      takeoff_quantity: body.takeoff_quantity,
    },
  });
  return NextResponse.json(updatedTakeoff);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { takeoff_id: string } }
) {
  await prisma.takeoff.delete({
    where: { takeoff_id: parseInt(params.takeoff_id, 10) },
  });
  return NextResponse.json({ message: 'Takeoff record deleted successfully' });
}
