import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

export async function GET(req, { params }){
    const id = params.id;

    const prisma = new PrismaClient()
    const tracks = await prisma.track.findMany({
        include: {
            users: {
                where: {
                    id: id * 1
                }
            }
        }
    })

    return NextResponse.json(tracks)
}