export interface IUser {
  name?: string;
  email: string;
  password?: string;
}

export type ImageMovie = {
  formats?: { thumbnail: { url: string } };
  url?: string;
};

export interface IMovie {
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: string | ImageMovie;
  trailerLink: string;
  nameRU: string;
  nameEN: string;
  thumbnail: string;
  id?: number;
  _id?: number;
  movieId?: number;
  isSaved?: boolean;
}

// export type IBeatMovie = IMovie & {
//   id: number;
// };

// export type ISavedMovie = IMovie & {
//   _id: number;
//   movieId: string;
//   isSaved?: boolean;
// };

export interface IMessage {
  message: string;
}

export type Values = IUser;
export type Errors = IUser;

export interface IInput {
  handleChange: () => {};
  handleBlur: () => {};
  values: Values;
  errors: Errors;
}

export type IshowError = (message: IMessage | string) => void;

export type IsetMovies = React.Dispatch<React.SetStateAction<IMovie[]>>;
