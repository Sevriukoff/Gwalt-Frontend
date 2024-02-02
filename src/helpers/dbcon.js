import mysql from 'serverless-mysql';
const db = mysql({
    config: {
        host: '192.168.0.107',
        port: '3206',
        database: 'soundground',
        user: 'root',
        password: 'drtGwoGmxl01_FNC'
    }
});
export default async function executeQuery({ query }) {
    try {
        const results = await db.query(query);
        await db.end();
        return results;
    } catch (error) {
        return { error, message:query };
    }
}