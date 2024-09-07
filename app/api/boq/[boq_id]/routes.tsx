import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { fromZodError } from 'zod-validation-error';
import { BillOfQuantitySchema } from '../../schema';

export async function GET(
  request: NextRequest,
  { params }: { params: { boq_item_id: string } }
) {
  const boqItem = await prisma.bill_of_Quantity.findUnique({
    where: { boq_item_id: parseInt(params.boq_item_id, 10) },
  });
  if (!boqItem) {
    return NextResponse.json({ error: 'BOQ Item not found' }, { status: 404 });
  }
  return NextResponse.json(boqItem);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { boq_item_id: string } }
) {
  const body = await request.json();

  const valid = BillOfQuantitySchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json(fromZodError(valid.error), { status: 400 });
  }

  const updatedBoqItem = await prisma.bill_of_Quantity.update({
    where: { boq_item_id: parseInt(params.boq_item_id, 10) },
    data: {
      item_name: body.item_name,
      quantity: body.quantity,
      unit: body.unit,
      unit_cost: body.unit_cost,
      amount: body.amount,
    },
  });
  return NextResponse.json(updatedBoqItem);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { boq_item_id: string } }
) {
  await prisma.bill_of_Quantity.delete({
    where: { boq_item_id: parseInt(params.boq_item_id, 10) },
  });
  return NextResponse.json({ message: 'BOQ Item deleted successfully' });
}
