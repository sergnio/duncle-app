import { createDatabaseWithUser } from "../hooks/UsePouch";

export const createTerritoriesDatabase = () =>
  createDatabaseWithUser("territories");
