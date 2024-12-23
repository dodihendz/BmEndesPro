export type Img = {
  gallery_user_id: string;
  link: string;
  user_id: string;
  created_at: Date;
};

export type ImgRes = {
  gallery_resto_id: string;
  link: string;
  restaurant_id: string;
  created_at: Date;
  updated_at?: Date;
  profile_pic?: boolean;
};

