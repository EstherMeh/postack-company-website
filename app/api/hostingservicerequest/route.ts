import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Singleton Prisma Client instance
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function POST(req: Request) {
  try {
    console.log("Raw Request Object:", req);

    // Parse the JSON body from the request
    const formData = await req.json();
    console.log("Received formData at backend:", formData);

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

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate phone number format (simple check for numeric value)
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(formData.phone)) {
      return NextResponse.json(
        { message: "Invalid phone number format" },
        { status: 400 }
      );
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

    // Handle the error based on its type
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // Ensure that the error response is always a valid JSON
    const errorMessage = {
      message: "An error occurred while processing your request.",
      details: error instanceof Error ? error.message : String(error),
    };

    // Handle specific Prisma error for duplicate entries
    if (error instanceof Error && error.message.includes("P2002")) {
      return NextResponse.json(
        { message: "Duplicate entry detected. Please use a unique email or phone number." },
        { status: 400 }
      );
    }

    // Return a generic error message for other errors
    return NextResponse.json(errorMessage, { status: 500 });
  }
}
