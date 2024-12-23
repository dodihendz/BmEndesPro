export type Resto = {
  restaurant_id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  about?: string;
  facility: string;
  opening_time: string;
  closing_time: string;
  price_range: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  is_deleted?: boolean;
  category?: string;
  location?: string;
};

export type Comments = {
  review_id: string;
  message?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  is_deleted?: boolean;
  user_id: string;
  restaurant_id: string;
  name?: string;
  link?: string;
};
