import { connectToDatabse } from "@/app/dbConfig/dbconfig";
import cloudinary from "@/app/lib/config";
import { NextRequest, NextResponse } from "next/server";
import Testimonial from "@/app/models/testimonialModel";

// Make sure this is in `app/api/testimonial/route.ts`

// export async function POST(req: NextRequest) {
//   try {
//     await connectToDatabse();
//     const formData = await req.formData();

//     const userName = formData.get("userName") as string;
//     const designation = formData.get("designation") as string;
//     const headline = formData.get("headline") as string;
//     const description = formData.get("description") as string;
//     const image = formData.get("image") as File;

//     if (!image || typeof image === "string") {
//       return NextResponse.json({ message: "Invalid image file" }, { status: 400 });
//     }

//     // Convert the image File into a buffer
//     const arrayBuffer = await image.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Upload buffer to Cloudinary
//     const uploadResult = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "testimonials" },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
//       stream.end(buffer);
//     });

//     const { secure_url } = uploadResult as { secure_url: string };

//     // Save to MongoDB
//     const newTestimonial = await Testimonial.create({
//       profilePictureURL: secure_url,
//       userName,
//       designation,
//       headline,
//       description,
//     });

//     console.log("testimanial : ", newTestimonial)

//     return NextResponse.json(
//       { message: "Testimonial submitted", testimonial: newTestimonial },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ message: "Error posting testimonial" }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import Testimonial from "@/models/Testimonial";
// import { connectToDatabse } from "@/utils/db";
// import { v2 as cloudinary } from "cloudinary";

// // ✅ Cloudinary Config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

export async function POST(req: NextRequest) {
  try {
    // ✅ Connect to MongoDB
    await connectToDatabse();

    // ✅ Only works for multipart/form-data
    const formData = await req.formData();

    const userName = formData.get("userName") as string;
    const designation = formData.get("designation") as string;
    const headline = formData.get("headline") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    // ✅ Validate required fields
    if (!userName || !designation || !file) {
      return NextResponse.json(
        { message: "Required fields are missing." },
        { status: 400 }
      );
    }

    // ✅ Upload Image to Cloudinary
    let profilePictureURL = "";
    if (file && typeof file === "object" && "arrayBuffer" in file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "testimonials",
        resource_type: "image",
      });

      profilePictureURL = result.secure_url;
    } else {
      return NextResponse.json(
        { message: "Invalid image file." },
        { status: 400 }
      );
    }

    // ✅ Create & Save Testimonial
    const newTestimonial = new Testimonial({
      profilePictureURL,
      userName,
      designation,
      headline,
      description,
    });

    await newTestimonial.save();

    return NextResponse.json(
      {
        message: "Testimonial submitted successfully.",
        data: newTestimonial,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    return NextResponse.json(
      { message: "Error submitting testimonial." },
      { status: 500 }
    );
  }
}





// export async function POST(req: Request) {
//   try {
//     // ✅ This only works if Content-Type is multipart/form-data
//     // const formData = await req.formData();

//     const userName = formData.get("userName") as string;
//     const designation = formData.get("designation") as string;
//     const headline = formData.get("headline") as string;
//     const description = formData.get("description") as string;
//     const file = formData.get("image") as File;

//     // Connect to DB
//     await connectToDatabse();

//     // Validate required fields
//     if (!userName || !designation || !file) {
//       return NextResponse.json(
//         { message: "Required fields are missing." },
//         { status: 400 }
//       );
//     }

//     // Upload to Cloudinary
//     let profilePictureURL = "";
//     const buffer = Buffer.from(await file.arrayBuffer());
//     const base64 = buffer.toString("base64");
//     const dataUri = `data:${file.type};base64,${base64}`;

//     const result = await cloudinary.uploader.upload(dataUri, {
//       folder: "testimonials",
//       resource_type: "image",
//     });

//     profilePictureURL = result.secure_url;

//     // Save to MongoDB
//     const newTestimonial = new Testimonial({
//       profilePictureURL,
//       userName,
//       designation,
//       headline,
//       description,
//     });

//     console.log("newTestimonial : " ,newTestimonial);

//     await newTestimonial.save();

//     return NextResponse.json(
//       {
//         message: "Testimonial submitted successfully.",
//         data: newTestimonial,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error submitting testimonial:", error);
//     return NextResponse.json(
//       { message: "Error submitting testimonial." },
//       { status: 500 }
//     );
//   }
// }





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