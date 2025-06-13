import { connectToDatabse } from "@/app/dbConfig/dbconfig";
import cloudinary from "@/app/lib/config";
import {  NextResponse } from "next/server";
import Testimonial from "@/app/models/testimonialModel";

// Make sure this is in `app/api/testimonial/route.ts`

export async function POST(req: Request) {
  try {
    await connectToDatabse();
    const formData = await req.formData();

    const userName = formData.get("userName") as string;
    const designation = formData.get("designation") as string;
    const headline = formData.get("headline") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    if (!image || typeof image === "string") {
      return NextResponse.json({ message: "Invalid image file" }, { status: 400 });
    }

    // Convert the image File into a buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload buffer to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "testimonials" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    const { secure_url } = uploadResult as { secure_url: string };

    // Save to MongoDB
    const newTestimonial = await Testimonial.create({
      profilePictureURL: secure_url,
      userName,
      designation,
      headline,
      description,
    });

    return NextResponse.json(
      { message: "Testimonial submitted", testimonial: newTestimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error posting testimonial" }, { status: 500 });
  }
}



export async function GET(){
  try {
    await connectToDatabse();
    const response = await Testimonial.find();

    return NextResponse.json({
      response
    },{status:200})
    
  } catch (error:unknown) {
      console.log(error)
      return NextResponse.json({
        message:"Error fetching testimonial"
      },{status:500})

  }
}