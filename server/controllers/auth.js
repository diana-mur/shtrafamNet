import { sql } from "../db.js";
import bcrypt from "bcryptjs"
import { generateAccessToken } from "../utils/generateToken.js";

export const auth = async (req, res) => {
    const { phone, password } = req.body
    const user = await sql`select * from Users where phone = ${phone}`
    if (!user) {
        return res.status(400).json({ message: `Пользователь не найден` })
    }
    const validPassword = bcrypt.compareSync(password, user[0].password)
    if (!validPassword) {
        return res.status(400).json({ message: `Введенный пароль неверный` })
    }
    const token = generateAccessToken(user[0].id, user[0].roleid)
    return res.json({
        token: token,
        user: user[0]
    })
}