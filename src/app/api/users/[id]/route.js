import executeQuery from "@/helpers/dbcon";
import {NextResponse} from "next/server";

export async function GET(req, { params }) {
    const id = params.id;

    const query = `
        SELECT *
        FROM Users WHERE UserID = ${id}
    `;

    const result = await executeQuery({ query });

    return NextResponse.json(result);
}