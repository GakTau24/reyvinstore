// import { NextApiRequest, NextApiResponse } from "next";
// import { connectToMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import { hash } from "bcryptjs";
// import { IUser } from "@/helper";
// import mongoose from "mongoose";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await connectToMongoDB().catch((err) => res.json(err));

//   if (req.method === "POST") {
//     if (!req.body) return res.status(400).json({ error: "Not Found Data" });
//     const { fullName, email, password, image } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(409).json({ error: "User Already exists" });
//     } else {
//       if (password.length < 6)
//         return res.status(409).json({ error: "Password should be 6 characters long" });

//       try {
//         const hashPassword = await hash(password, 12);

//         const newUser: IUser = await User.create({
//           fullName,
//           image,
//           email,
//           password: hashPassword,
//         });

//         const user = {
//           email: newUser.email,
//           fullName: newUser.fullName,
//           image: newUser.image,
//           _id: newUser._id,
//         };

//         return res.status(201).json({
//           success: true,
//           user,
//         });
//       } catch (error) {
//         if (error instanceof mongoose.Error.ValidationError) {
//           for (let field in error.errors) {
//             const msg = error.errors[field].message;
//             return res.status(409).json({ error: msg });
//           }
//         }

//         return res.status(500).json({ error: "Internal Server Error" });
//       }
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// };

// export default handler;
