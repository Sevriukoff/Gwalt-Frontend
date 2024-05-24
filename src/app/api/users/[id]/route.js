import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

export async function GET(req, { params }) {
    const id = params.id;

    const prisma = new PrismaClient();

    const result = await prisma.user.findMany({
        where: {
            // parse id to int
            id: id * 1
        }
    });

    return NextResponse.json(result);
}