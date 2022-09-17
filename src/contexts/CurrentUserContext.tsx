import { createContext } from "react";
import { IUser } from "../components/types/types";

export const CurrentUserContext = createContext<IUser | undefined>(undefined);
