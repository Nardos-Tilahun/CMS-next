import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { fromZodError } from 'zod-validation-error';
import { ProjectSchema } from '../schema';

export async function GET(request: NextRequest) {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const valid = ProjectSchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json(fromZodError(valid.error), { status: 400 });
  }

  const newProject = await prisma.project.create({
    data: {
      project_name: body.project_name,
      project_location: body.project_location,
      start_date: body.start_date,
      end_date: body.end_date,
      contract_amount: body.contract_amount,
    },
  });
  return NextResponse.json(newProject);
}
