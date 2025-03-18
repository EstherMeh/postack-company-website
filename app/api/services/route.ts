import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const requestEntry = await prisma.developmentServices.create({
        data: {
            clientName: formData.fullName,
            clientEmail: formData.email,
            serviceType: formData.serviceType,
            projectRequirements: formData.requirements,
            budgetRange: formData.budgetRange,
            timelineExpectations: formData.timeline,
        },
      });
      return NextResponse.json({ message: 'Request form submitted successfully!', data: requestEntry });
    } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}