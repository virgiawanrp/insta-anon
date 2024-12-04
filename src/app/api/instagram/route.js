// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

import axios from "axios";
import { NextResponse } from "next/server"; // Menggunakan Next.js 13 API
import dotenv from "dotenv";

// require("dotenv").config();
dotenv.config();
console.log("API_USER_URL:", process.env.API_USER_URL); // Menambahkan logging untuk memverifikasi

export async function OPTIONS(req) {
  const allowedOrigin = req.headers.get("origin");
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*", // Atur origin yang diizinkan
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  });
  return response;
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const ig = url.searchParams.get("ig");

    if (!ig) {
      return NextResponse.json(
        { error: "User ID or username is required" },
        { status: 400 }
      );
    }

    const apiUrl = `https://${process.env.API_USER_URL}/ig_profile`;
    const response = await axios.get(apiUrl, {
      params: { ig },
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": process.env.API_USER_URL,
      },
    });

    // Log response untuk melihat data yang diterima
    console.log("API Response:", response.data);

    if (!Array.isArray(response.data)) {
      throw new Error("Data is not an array");
    }

    // Filter data user yang valid
    const users = response.data.map((item) => ({
      user_id: item.pk,
      username: item.username,
      full_name: item.full_name,
      profile_picture: item.profile_pic_url,
      follower: item.follower_count,
      following: item.following_count,
      private: item.is_private,
    }));

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching data:", error); // Menampilkan error di console
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// async function fetchStory(ig) {
//   try {
//     const apiUrl = `https://${process.env.API_STORY_URL}/ig_profile`;
//     console.log("Fetching data from:", apiUrl); // Menambahkan logging untuk URL

//     const response = await axios.get(apiUrl, {
//       params: { ig, response_type: "story" },
//       headers: {
//         "X-RapidAPI-Key": process.env.API_KEY,
//         "X-RapidAPI-Host": process.env.API_STORY_URL,
//       },
//     });

//     // Cek apakah response.data adalah array
//     if (!Array.isArray(response.data)) {
//       throw new Error("Data is not an array");
//     }

//     // Menyimpan data user yang valid
//     const users = [];

//     // Looping untuk setiap item dalam array
//     response.data.forEach((item) => {
//       try {
//         // Cek apakah properti yang dibutuhkan ada
//         if (!item.pk || !item.username) {
//           console.error(
//             `Item is missing required properties: ${JSON.stringify(item)}`
//           );
//         } else {
//           // Menambahkan item yang valid ke array
//           users.push({
//             url_story: item.story,
//             username: item.username,
//             full_name: item.full_name,
//             profile_picture: item.profile_pic_url,
//             follower: item.follower_count,
//             following: item.following_count,
//             private: item.is_private,
//           });
//         }
//       } catch (innerError) {
//         console.error("Error processing item:", innerError.message);
//       }
//     });

//     // Menampilkan hasil setelah pemrosesan
//     if (users.length > 0) {
//       console.log("Fetched User Data:", users);
//     } else {
//       console.log("No valid user data found.");
//     }

//     return users; // Mengembalikan data user yang valid
//   } catch (error) {
//     // Tangani error utama (misalnya kesalahan dalam fetch data)
//     console.error("Error fetching user:", error.message);
//     throw new Error(`Error fetching story: ${error.message}`);
//   }
// }

// // Contoh pemanggilan fungsi
// fetchUser("ummilatifaa_");
// .then((data) => console.log("Fetched User Data:", data))
// .catch((error) => console.error("Error:", error.message));
