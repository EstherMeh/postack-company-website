import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Define the type for form data
interface HostingRequestForm {
  email: string;
  phone: string;
  selectedPackage: string;
  hostingRequirement: string;
  technicalSpecs: string;
}

// Ensure only one PrismaClient instance is created
const prisma = new PrismaClient();

// Custom type guard for error with code property
function isPrismaError(error: unknown): error is { code: string } {
  return typeof error === 'object' && error !== null && 'code' in error;
}

export async function POST(req: Request) {
  try {
    // Parse the JSON body from the request and ensure it matches the expected type
    const formData: HostingRequestForm = await req.json();

    // Validate incoming data
    if (!formData || typeof formData !== 'object' || Object.keys(formData).length === 0) {
      console.error("Invalid form data received:", formData);
      return NextResponse.json(
        { message: "Invalid form data received" },
        { status: 400 }
      );
    }

    // Check for required fields
    const requiredFields = ['email', 'phone', 'selectedPackage', 'hostingRequirement', 'technicalSpecs'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        console.error(`Missing required field: ${field}`);
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create a new hosting request entry
    const hostingrequestEntry = await prisma.hostingRequest.create({
      data: {
        email: formData.email,
        phoneNumber: formData.phone,
        selectedPackage: formData.selectedPackage,
        hostingRequirement: formData.hostingRequirement,
        technicalSpecs: formData.technicalSpecs,
      },
    });

    return NextResponse.json({
      message: "Hosting Request form submitted successfully!",
      data: hostingrequestEntry,
    });

  } catch (error: unknown) {
    console.error("Error in handling form submission:", error);

    // Log the error details
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // Ensure that the error response is always a valid JSON
    const errorMessage = {
      message: "An error occurred while processing your request.",
      details: (error as Error).message || String(error),
    };

    // Handle specific Prisma error for duplicate entries
    if (isPrismaError(error) && error.code === "P2002") {
      return NextResponse.json(
        { message: "Duplicate entry detected. Please use a unique email or phone number." },
        { status: 400 }
      );
    }

    // Return a generic error message for other errors
    return NextResponse.json(errorMessage, { status: 500 });
  }
}
