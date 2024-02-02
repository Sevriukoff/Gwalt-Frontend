import executeQuery from "@/helpers/dbcon";
import {NextResponse} from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const needGenres = searchParams.get('genres') === 'true' // нужно получить все теги которые есть у треков этого исполнителя
    const needTracksCount = searchParams.get('tracksCount') === 'true' // нужно получить общие количество треков исполнителя
    const needLikesCount = searchParams.get('likesCount') === 'true' // нужно получить общее количество лайков под всеми треками исполнителя
    const needPlaysCount = searchParams.get('playsCount') === 'true' // нужно получить общее количество прослушиваний всех треков исполнителя

    const query = `
        SELECT *
        FROM Users
    `;

    const result = await executeQuery({ query });

    if (needGenres){
        const resultGenres = await executeQuery(
            {
                query: `
                SELECT
                    u.UserID,
                    GROUP_CONCAT(DISTINCT g.GenreName) AS Genres
                FROM
                    Users u
                JOIN
                    Tracks t ON u.UserID = t.ArtistID
                JOIN
                    TrackGenres tg ON t.TrackID = tg.TrackID
                JOIN
                    Genres g ON tg.GenreID = g.GenreID
                GROUP BY
                    u.UserID;`
            })

        result.forEach(user => {
            const userId = user["UserID"];

            // Поиск данных о жанрах по UserID
            const genresInfo = resultGenres.find(genres => genres["UserID"] === userId);

            // Если данные о жанрах найдены, добавляем поле "Genres" в данные пользователя
            if (genresInfo) {
                user["Genres"] = genresInfo["Genres"] ? genresInfo["Genres"].split(',') : [];
            }
            else {
                user["Genres"] = []
            }
        });
    }

    if (needTracksCount){
        const resultTrackCount = await executeQuery(
            {
                query :`
                SELECT
                    u.UserID,
                    COUNT(t.TrackID) AS TracksCount
                FROM
                    Users u
                LEFT JOIN
                    Tracks t ON u.UserID = t.ArtistID
                GROUP BY
                    u.UserID;`
            })

        result.forEach(user => {
            const userId = user["UserID"];

            const trackCountInfo = resultTrackCount.find(genres => genres["UserID"] === userId);

            if (trackCountInfo) {
                user["TracksCount"] = trackCountInfo["TracksCount"];
            }
        });
    }

    if (needLikesCount){
        const resultLikesCount = await executeQuery(
            {
                query: `
                SELECT
                    u.UserID,
                    SUM(t.Likes) AS LikesCount
                FROM
                    Users u
                LEFT JOIN
                    Tracks t ON u.UserID = t.ArtistID
                GROUP BY
                    u.UserID;`
            })

        result.forEach(user => {
            const userId = user["UserID"];

            const likesCountInfo = resultLikesCount.find(genres => genres["UserID"] === userId);

            if (likesCountInfo) {
                user["LikesCount"] = likesCountInfo["LikesCount"] ? likesCountInfo["LikesCount"] : 0;
            }
        });
    }

    if (needPlaysCount){
        const resultPlaysCount= await executeQuery(
            {
                query:`
                SELECT
                    u.UserID,
                    SUM(t.Plays) AS PlaysCount
                FROM
                    Users u
                LEFT JOIN
                    Tracks t ON u.UserID = t.ArtistID
                GROUP BY
                    u.UserID;`
            })

        result.forEach(user => {
            const userId = user["UserID"];

            const playsCountInfo = resultPlaysCount.find(genres => genres["UserID"] === userId);

            if (playsCountInfo) {
                user["PlaysCount"] = playsCountInfo["PlaysCount"] ? playsCountInfo["PlaysCount"] : 0;
            }
        });
    }

    return NextResponse.json(result);
}

export async function POST(req){
    const data = await req.json()

    const query = `
        INSERT INTO \`Users\` (\`UserID\`, \`Username\`, \`Email\`, \`PasswordHash\`, \`RegistrationDate\`, \`AvatarUrl\`, \`ShortDescription\`, \`Description\`, \`BackgroundUrl\`) VALUES (NULL, '${data.UserName}', '${data.Email}', '${data.PasswordHash}', CURRENT_TIMESTAMP, NULL, NULL, NULL, NULL);
    `;

    console.log(query)

    const result = await executeQuery({ query });

    return NextResponse.json(data)
}