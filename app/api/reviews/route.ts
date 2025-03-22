import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching reviews', error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const reviewEntry = await prisma.review.create({
      data: {
        name: formData.name,
        position: formData.position,
        review: formData.review,
        rating: formData.rating,
        image: formData.image,
      },
    });

    return NextResponse.json({
      message: 'Review submitted successfully!',
      data: reviewEntry,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating review', error }, { status: 500 });
  }
}
