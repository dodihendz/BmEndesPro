import bcrypt from "bcrypt";
import {
  addedData,
  addedDatR,
  getAllData,
  getAllDataRestoPage,
  getAllRestos,
  retriveDataByCom,
  retriveDataByFilter,
  retriveDataById,
  retriveFullCom,
  updateDataDo,
  updateRate,
  updateRestoData,
} from "../repository/user.repository";
import { off } from "process";
const registResto = async (
  dataResto: {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: number;
    about: string;
    facility: string;
    price_range: number;
    opening_time: string;
    closing_time: string;
    created_at: Date;
    updated_at: Date;
  },
  callback: Function
) => {
  dataResto.password = await bcrypt.hash(dataResto.password, 10);
  dataResto.created_at = new Date();
  dataResto.updated_at = new Date();
  const data = await addedData(
    "restaurants",
    dataResto,
    (status: boolean, result: any) => {
      callback(status, result);
      console.log(status);
      console.log(result);
    }
  );
  return data;
};

const restoPic = async (
  dataUpload: {
    link: string;
    restaurant_id: string;
    created_at: Date;
    updated_at: Date;
    profile_pic: boolean;
  },
  callback: Function
) => {
  dataUpload.created_at = new Date();
  dataUpload.updated_at = new Date();
  dataUpload.profile_pic = dataUpload.link ? true : false;
  console.log(dataUpload);
  const resutl = await addedData(
    "gallery_resto",
    dataUpload,
    (status: Boolean) => {
      callback(status);
      console.log(status);
    }
  );
  return resutl;
};

const getAllRestoz = async () => {
  const getResto = await getAllData("*", "restaurants");
  console.log(getResto);
  return getResto;
};

const ITEMS_PER_PAGE = 6;
const getAllResto = async (currentPage: number) => {
  console.log(currentPage);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  console.log(offset);
  const getResto = await getAllRestos(
    "*",
    "restaurants",
    ITEMS_PER_PAGE,
    offset
  );
  console.log(getResto);
  return getResto;
};

const getAllDataRestoP = async (currentPage = 1) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const getResto = await getAllDataRestoPage("restaurants", ITEMS_PER_PAGE);
  console.log(getResto);
  return getResto;
};

const getAllRating = async () => {
  const getResto = await getAllData("*", "rating");
  console.log(getResto);
  return getResto;
};

const getAllGalleryResto = async () => {
  const getGalleryRes = await getAllData("*", "gallery_resto");
  return getGalleryRes;
};

const updateResto = async (
  dataResto: {
    name: string;
    email: string;
    address: string;
    phone: number;
    about: string;
    facility: string;
    price_range: number;
    opening_time: string;
    closing_time: string;
    updated_at: Date;
  },
  id: string | number,
  callback: Function
) => {
  dataResto.updated_at = new Date();
  const updateRes = await updateRestoData(
    "restaurants",
    dataResto,
    "restaurant_id",
    id,
    (status: boolean) => {
      console.log(status);
      callback(status);
    }
  );
};

const updateRestoPic = async (
  dataUpload: {
    gallery_resto_id: string;
    link: string;
    restaurant_id: string;
    created_at: Date;
    updated_at: Date;
    profile_pic: boolean;
  },
  id: string | number,
  callback: Function
) => {
  dataUpload.updated_at = new Date();
  // dataUpload.profile_pic = dataUpload.link ? true : false;
  dataUpload.profile_pic = true;
  console.log(id);
  console.log(dataUpload);
  const updateRes = await updateDataDo(
    "gallery_resto",
    dataUpload,
    "gallery_resto_id",
    id,
    "restaurant_id",
    dataUpload.restaurant_id,
    // "profile_pic",
    // dataUpload.profile_pic,
    (status: boolean) => {
      console.log(status);
      callback(status);
    }
  );
};

const restoGallery = async (
  dataUpload: {
    link: string[];
    restaurant_id: string;
  },
  callback: Function
) => {
  try {
    const results: any = [];

    for (const url of dataUpload.link) {
      const record = {
        link: url,
        restaurant_id: dataUpload.restaurant_id,
        created_at: new Date(),
        updated_at: new Date(),
        profile_pic: false,
      };
      console.log(record);

      // Wrap addedData in a promise to await the callback
      const result = await new Promise((resolve) => {
        addedData("gallery_resto", record, (status: boolean, res: any) => {
          if (status) {
            results.push(res); // Push to results array if successful
            resolve(res); // Resolve with result on success
            console.log(resolve(res));
          } else {
            resolve(null); // Resolve with null on failure
          }
        });
      });

      // Check for any insertion failure
      if (!result) {
        callback(false, results);
        return;
      }
    }

    // console.log(results);
    // Call callback with success if all insertions were successful
    const flatAr = results.flat();
    callback(true, flatAr);
    // console.log(flatAr);
    // flatAr.forEach((item: any) => {
    //   console.log(item.link);
    // });
  } catch (err) {
    console.error("Error in restoGallery:", err);
    callback(false, []);
  }
};

const searchingResto = async (data: any, callback: Function) => {
  console.log("Filter data:", data);
  await retriveDataByFilter(
    "restaurants",
    data,
    (status: boolean, res: any) => {
      if (status) {
        callback(true, res);
      } else {
        callback(false, null);
      }
    }
  );
};

const getAllReview = async (review: string) => {
  const getResto = await retriveDataByCom("review", "restaurant_id", review);
  console.log(getResto);
  return getResto;
};

const getRatingById = async (id: string) => {
  const getResto = await retriveDataById("rating", "restaurant_id", id);
  console.log(getResto);
  return getResto;
};

const getAllFull = async (id: string) => {
  const getFull = await retriveFullCom(
    "users",
    "review",
    "rating",
    "restaurant_id",
    id
  );
  console.log(getFull);
  return getFull;
};

const updateRating = async (data: any) => {
  console.log(data.rating_id);
  console.log(data.user_id);
  console.log(data.rating);
  delete data.message;
  const update = await updateRate(
    "rating",
    data.rating,
    "rating_id",
    data.rating_id,
    "user_id",
    data.user_id
  );
  return update;
};

const addRating = async (data: any) => {
  console.log(data);
  const rating = await addedDatR("rating", data);
  return rating;
};

const addComent = async (data: any) => {
  console.log(data);
  const review = await addedDatR("review", data);
  return review;
};
export {
  addComent,
  addRating,
  updateRating,
  registResto,
  restoPic,
  getAllResto,
  getAllGalleryResto,
  updateResto,
  updateRestoPic,
  restoGallery,
  searchingResto,
  getAllRating,
  getAllDataRestoP,
  getAllRestoz,
  getAllReview,
  getRatingById,
  getAllFull,
};
