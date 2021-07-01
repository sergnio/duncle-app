import { createDatabaseWithUser } from "../hooks/UsePouch";

export const createLibraryDatabase = () => createDatabaseWithUser("libraries");
