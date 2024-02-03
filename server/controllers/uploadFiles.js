import { sql } from "../db.js"

export async function uploadFiles(req, res) {
    try {
        const { numberCar, location, date, files, userId } = req.body
        const filename = req.file.filename
        filename = Date.now
        console.log({ file: req.file, filename });
        const data = await sql`insert into Requests (numberCar, location, date, file, userId, statusId) values (${numberCar}, ${location}, ${date}, ${filename}, ${userId}, 1)`
        res.send(data)
    } catch (error) {
        res.status(400).send({ error })
    }
}
