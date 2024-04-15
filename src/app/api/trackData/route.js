import * as ftp from "basic-ftp"
import { Writable } from 'stream';

export async function GET(req) {
    const {searchParams} = new URL(req.url);
    const path = searchParams.get('path');

    const ftpClient = new ftp.Client();
    await ftpClient.access({
        host: '127.0.0.1',
        port: 21,
        user: 'sev',
        password: '1q2w3e4r5t6y7u8i9o',
    });

    const buffer = [];
    const writeable = new Writable({
        write: function (chunk, encoding, next) {
            buffer.push(chunk);
            next();
        }
    });

    await ftpClient.downloadTo(writeable, path);

    const responseData = Buffer.concat(buffer);
    const headers = new Headers();
    headers.append('Content-Type', 'audio/mp3');

    return new Response(responseData, {headers})
}