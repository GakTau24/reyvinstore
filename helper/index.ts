export interface IUser {
    _id: string
    email: string
    fullName: string
    image: string
}

export interface LoginUserParams {
    email: string
    password: string
}

export interface CardsProps {
  id: string;
  title: string;
  image: string;
  slug: string;
};