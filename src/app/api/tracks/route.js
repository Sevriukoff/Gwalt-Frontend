import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

export async function GET(req){

    const prisma = new PrismaClient()

    const tracks = await prisma.track.findMany({
        include: {
            genres: {
                select: {
                    name: true
                }
            }
        }
    })

    return NextResponse.json(tracks)
}