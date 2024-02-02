import { sql } from "../db.js"

export async function uploadFiles(req, res) {
    const { numberCar, location, date, file, userId } = req.body
    const data = await sql`insert into Requests (numberCar, location, date, file, userId, statusId) values (${numberCar}, ${location}, ${date}, ${file}, ${userId}, 1)`
    res.send(data)
}
