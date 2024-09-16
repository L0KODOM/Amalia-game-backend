import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    const existingName = await prisma.player.findFirst({
      where: {
        name: data.name,
      },
    });

    const existingEmail = await prisma.player.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingName) {
      return new NextResponse(
        JSON.stringify({ message: "Este nombre ya está en uso." }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    if (existingEmail) {
      return new NextResponse(
        JSON.stringify({ message: "Este email ya está en uso." }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    const player = await prisma.player.create(({
      data: data
    }));

    return new NextResponse(JSON.stringify(player), {
      headers: {"Content-Type": "application/json"},
      status: 201
    });

  } catch (error){
    return new NextResponse(error.message, {status:500})
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const password = searchParams.get('password');

  if (!username || !password) {
    return new NextResponse("Username and password must be provided", { status: 400 });
  }

  try {
    const player = await prisma.player.findFirst({
      where: {
        name: username,
        password: password
      },
      select: {
        id: true 
      }
    });
    if (!player) {
      return new NextResponse("Usuario o contraseña incorrectos", { status: 404 });
    }
    return NextResponse.json({ id: player.id }); 
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}