import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const contactEntry = await prisma.contact.create({
        data: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      });
      return NextResponse.json({ message: 'Contact form submitted successfully!', data: contactEntry });
    } catch (error) {
    return NextResponse.json({ message: 'Error submitting form!' }, { status: 500 });
  }
}