import executeQuery from "@/helpers/dbcon";
import {ImageResponse, NextResponse} from "next/server";

export async function GET (req, { params }){
    const result = await executeQuery(
        {
            query: `SELECT Image FROM Tracks WHERE TrackID = ${params.id}`
        })

    const encoded = Buffer.from(result[0].Image).toString('base64')

    return NextResponse.json(encoded)
}