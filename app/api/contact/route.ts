import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    console.log("🔵 Incoming request to /api/contact");

    // Read raw request body
    const bodyText = await req.text();
    console.log("🟠 Raw request body:", bodyText);

    if (!bodyText) {
      console.error("🔴 Request body is empty!");
      return NextResponse.json({ message: "Request body is empty!" }, { status: 400 });
    }

    // Parse JSON safely
    let formData;
    try {
      formData = JSON.parse(bodyText);
      console.log("🟢 Parsed JSON:", formData);
    } catch (jsonError) {
      console.error("🔴 Failed to parse JSON:", jsonError);
      return NextResponse.json({ message: "Invalid JSON format!" }, { status: 400 });
    }

    // Validate required fields
    const requiredFields = ["name", "email", "subject", "message"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      console.error("🔴 Missing required fields:", missingFields);
      return NextResponse.json({ message: `Missing fields: ${missingFields.join(", ")}` }, { status: 400 });
    }

    // Save to database
    const contactEntry = await prisma.contact.create({
      data: {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
    });

    console.log("✅ Successfully saved to database:", contactEntry);
    return NextResponse.json({ message: "Form submitted!", data: contactEntry }, { status: 200 });

  } catch (error: any) {
    console.error("🚨 Server error:", error.message || error);

    return NextResponse.json(
      { message: "Internal Server Error", error: error.message || String(error) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
