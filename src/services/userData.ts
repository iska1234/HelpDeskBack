import { getUsersWithUserRole } from "../data/user-data";

export async function getAllUsersWithUserRole() {
  const users = await getUsersWithUserRole();
  return users;
}
