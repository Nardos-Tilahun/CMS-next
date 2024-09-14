import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { fromZodError } from 'zod-validation-error';
import { FinancialSchema } from '../../schema';

export async function GET(
  request: NextRequest,
  { params }: { params: { financial_id: string } }
) {
  const financial = await prisma.financial.findUnique({
    where: { financial_id: parseInt(params.financial_id, 10) },
  });
  if (!financial) {
    return NextResponse.json(
      { error: 'Financial record not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(financial);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { financial_id: string } }
) {
  const body = await request.json();

  const valid = FinancialSchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json(fromZodError(valid.error), { status: 400 });
  }

  const updatedFinancial = await prisma.financial.update({
    where: { financial_id: parseInt(params.financial_id, 10) },
    data: {
      project_id: body.project_id,
      total_income: body.total_income,
      total_expense: body.total_expense,
      profit_loss: body.profit_loss || body.total_income - body.total_expense,
    },
  });
  return NextResponse.json(updatedFinancial);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { financial_id: string } }
) {
  await prisma.financial.delete({
    where: { financial_id: parseInt(params.financial_id, 10) },
  });
  return NextResponse.json({
    message: 'Financial record deleted successfully',
  });
}
