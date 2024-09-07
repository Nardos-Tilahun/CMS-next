import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { fromZodError } from 'zod-validation-error';
import { FinancialSchema } from '../schema';

export async function GET(request: NextRequest) {
  const financials = await prisma.financial.findMany();
  return NextResponse.json(financials);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const valid = FinancialSchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json(fromZodError(valid.error), { status: 400 });
  }

  const newFinancial = await prisma.financial.create({
    data: {
      project_id: body.project_id,
      total_income: body.total_income,
      total_expense: body.total_expense,
      profit_loss: body.profit_loss || body.total_income - body.total_expense,
    },
  });
  return NextResponse.json(newFinancial);
}
