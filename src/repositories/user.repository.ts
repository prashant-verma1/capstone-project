import { pool } from "../lib/db";
import { DBUserRow, DBUserWithPasswordRow, user } from "../types/user";

export async function findUesrByEmail(email:string):Promise<user | null> {
    const result = await pool.query<DBUserRow>(
        "SELECT id, email, role, created_at FROM users WHERE email = $1",
        [email]
    )
    return result.rows[0] ?? null;
}


export async function createUser(
    email: string,
    passwordHash: string
) {
    const result = await pool.query<DBUserRow>(
        `INSERT INTO users (email, password_hash)
        VALUES ($1, $2)
        RETURNING id, email, role, created_at`,
        [email, passwordHash]
    )
    return result.rows[0];
    
}

export async function findUesrByEmailWithPassword(
    email: string
) :Promise<DBUserWithPasswordRow | null>{
    const result = await pool.query<DBUserWithPasswordRow>(
        `SELECT id, email, role, password_hash, created_at
        FROM users WHERE email = $1
        `,
        [email]
    )
    return result.rows[0]?? null
}