export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  image: string;
}

export interface LoginUserParams {
  email: string;
  password: string;
}

export interface CardsProps {
  id: string;
  slug: string;
  title: string;
  image: string;
  price: string;
}

export interface DetailProps {
  slug: string
}

export interface MetaProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface Data {
  slug: string;
  title: string;
}