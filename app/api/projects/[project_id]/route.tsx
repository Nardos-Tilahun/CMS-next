import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { fromZodError } from 'zod-validation-error';
import { ProjectSchema } from '../../schema';

export async function GET(
  request: NextRequest,
  { params }: { params: { project_id: string } }
) {
  const project = await prisma.project.findUnique({
    where: { project_id: parseInt(params.project_id, 10) },
  });
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { project_id: string } }
) {
  const body = await request.json();

  const valid = ProjectSchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json(fromZodError(valid.error), { status: 400 });
  }

  const updatedProject = await prisma.project.update({
    where: { project_id: parseInt(params.project_id, 10) },
    data: {
      project_name: body.project_name,
      project_location: body.project_location,
      start_date: body.start_date,
      end_date: body.end_date,
      contract_amount: body.contract_amount,
    },
  });
  return NextResponse.json(updatedProject);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { project_id: string } }
) {
  await prisma.project.delete({
    where: { project_id: parseInt(params.project_id, 10) },
  });
  return NextResponse.json({ message: 'Project deleted successfully' });
}
