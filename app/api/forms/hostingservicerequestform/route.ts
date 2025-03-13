import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log("Received formData at backend:", formData);

    if (!formData || Object.keys(formData).length === 0) {
      return NextResponse.json(
        { message: "Invalid form data received" },
        { status: 400 }
      );
    }

    const contactEntry = await prisma.hostingRequest.create({
      data: {
        email: formData.email,
        phoneNumber: formData.phone, // Ensure this matches your form data
        selectedPackage: formData.selectedPackage,
        hostingRequirement: formData.hostingRequirement,
        technicalSpecs: formData.technicalSpecs, // Ensure this matches your form data
      },
    });

    return NextResponse.json({ message: 'Hosting Request form submitted successfully!', data: contactEntry });
  } catch (error) {
    console.error("Error in handling form submission:", error); // Log the error
    return NextResponse.json({ message: 'Error submitting form!', details: error.message }, { status: 500 });
  }
}