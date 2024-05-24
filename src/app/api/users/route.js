import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const needGenres = searchParams.get('genres') === 'true' // нужно получить все теги которые есть у треков этого исполнителя
    const needTracksCount = searchParams.get('tracksCount') === 'true' // нужно получить общие количество треков исполнителя
    const needLikesCount = searchParams.get('likesCount') === 'true' // нужно получить общее количество лайков под всеми треками исполнителя
    const needPlaysCount = searchParams.get('playsCount') === 'true' // нужно получить общее количество прослушиваний всех треков исполнителя

    const prisma = new PrismaClient()

    let query = `
    SELECT
        u.UserID as id,
        u.UserName as name,
        u.Email as email,
        u.PasswordHash as passwordHash,
        u.RegistrationDate as regDate,
        u.AvatarUrl as avatarUrl,
        u.ShortDescription as shortDesc,
        u.Description as 'desc',
        u.BackgroundUrl as backgroundUrl
        ${needTracksCount ? ', CAST(COUNT(t.TrackID) AS CHAR) as totalTracks' : ''}
        ${needLikesCount ? ', CAST(SUM(t.Likes) AS CHAR) as totalLikes' : ''}
        ${needPlaysCount ? ', CAST(SUM(t.Plays) AS CHAR) as totalPlays' : ''}
        ${needGenres ? ', GROUP_CONCAT(DISTINCT g.GenreName) as genres' : ''}
    FROM
        Users u
    ${
        (needGenres || needTracksCount || needLikesCount || needPlaysCount) ? `
    LEFT JOIN
        _TrackToUser tu ON u.UserID = tu.B
    LEFT JOIN
        Tracks t ON tu.A = t.TrackID` : '' 
    }
    ${needGenres ? 'LEFT JOIN _GenreToTrack gt ON t.TrackID = gt.B' : ''}
    ${needGenres ? 'LEFT JOIN Genres g ON gt.A = g.GenreID' : ''}
    GROUP BY
        u.UserID;`;

    const result = await prisma.$queryRawUnsafe(query);

    if (needGenres){
        result.forEach(item => {
            item.genres = item.genres !== null ? item.genres.split(',') : [];
        });
    }

    return NextResponse.json(result);
}

export async function POST(req){
    const data = await req.json()

    const query = `
        INSERT INTO \`Users\` (\`UserID\`, \`Username\`, \`Email\`, \`PasswordHash\`, \`RegistrationDate\`, \`AvatarUrl\`, \`ShortDescription\`, \`Description\`, \`BackgroundUrl\`) VALUES (NULL, '${data.UserName}', '${data.Email}', '${data.PasswordHash}', CURRENT_TIMESTAMP, '/defaults/avatar.jpg', NULL, NULL, '/defaults/background.jpg');
    `;

    console.log(query)

    const result = await executeQuery({ query });

    return NextResponse.json(data)
}