import { query } from "../db/index";
import { Users } from "../models/users";

export async function getUsersWithUserRole(): Promise<Users[]> {
    const { rows } = await query(
      "SELECT id, name, email, age, role FROM users WHERE role = 'user'"
    );
  
    return rows;
  }

