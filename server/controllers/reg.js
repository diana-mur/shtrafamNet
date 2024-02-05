import { sql } from "../db.js";
import bcrypt from "bcryptjs"
import { generateAccessToken } from "../utils/generateToken.js";

export const reg = async (req, res) => {
    const { nick, phone, password } = req.body

    const candidate = await sql`select * from Users where phone = ${phone}`

    if (candidate[0]) {
        res.status(400).send({
            message: "Пользователь уже существует"
        })
    } else {
        const hashPassword = bcrypt.hashSync(password, 7)
        const user = await sql`insert into Users (nick, roleId, phone, password) values (${nick}, 1, ${phone}, ${hashPassword}) RETURNING *`
        const token = generateAccessToken(user.id, user.role)
        res.send({ message: "Пользователь успешно зарегистрирован", user: user, token: token })
    }
}