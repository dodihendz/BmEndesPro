import {
  addedData,
  DataUpdate,
  getAllData,
  retriveDataByField,
  retriveDataByIdd,
} from "../repository/user.repository";
import bcrypt from "bcrypt";

// const getUsers = async () => {
//   const getUser = await getUsersRepo();
//   const data = getUser.map((user: any) => {
//     delete user.password;
//   });
//   return getUser;
// };

const getImage = async () => {
  const getImage = await getAllData("gallery_user.*", "gallery_user");
  return getImage;
};

const getUsersId = async (id: string | number) => {
  const data = await retriveDataByIdd("users", "user_id", id);
  return data;
};

const uploadImage = async (
  dataUpload: {
    user_id: string;
    link: string;
    created_at: Date;
  },
  callback: Function
) => {
  dataUpload.created_at = new Date();
  const resutl = await addedData(
    "gallery_user",
    dataUpload,
    (status: boolean) => {
      callback(status);
      console.log(status);
    }
  );
  return resutl;
};

const updateData = async (
  dataUpdate: {
    name: string;
    phone: number;
    gender: string;
    updated_at: Date;
  },
  id: string,
  callback: Function
) => {
  dataUpdate.updated_at = new Date();
  const result = await DataUpdate(
    "users",
    "user_id",
    id,
    dataUpdate,
    (status: boolean) => {
      callback(status);
      console.log(callback(status));
    }
  );
  return result;
};

const signIn = async (email: string) => {
  // console.log(email);
  const data = await retriveDataByField("users", email);
  // console.log(data);
  if (data) {
    // console.log(data);
    return data[0];
  } else {
    return null;
  }
};
// const signUp = async (
//   userData: {
//     id?: string;
//     name: string;
//     email: string;
//     password: string;
//     phone: string;
//     gender: string;
//     created_at: Date;
//     role?: string;
//     updated_at: Date;
//   },
//   callback: Function
// ) => {
//   const data = await retriveDataByField("users", userData.email);
//   console.log(data);
//   if (data.length > 0) {
//     callback(false);
//   } else {
//     console.log(userData);
//     // if (!userData.role) {
//     //   userData.role = "user";
//     // }
//     userData.password = await bcrypt.hash(userData.password, 10);
//     userData.created_at = new Date();
//     userData.updated_at = new Date();
//     console.log(userData);
//     addedData("users", userData, (status: boolean) => {
//       console.log("Added data status:", status);
//       callback(status);
//     });
//   }
// };

const signUp = async (
  userData: {
    id?: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    created_at: Date;
    role?: string;
    updated_at: Date;
    type: string;
  },
  callback: Function
) => {
  const data = await retriveDataByField("users", userData.email);
  if (data.length > 0) {
    callback(false);
  } else {
    userData.type = "credentials";
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();
    addedData("users", userData, (result: boolean) => {
      callback(result);
      console.log(callback(result));
    });
  }
};

const loginWithGoogle = async (
  userData: {
    name: string;
    email: string;
    password?: string;
    image?: string;
    type?: string;
    created_at?: Date;
    role?: string;
    updated_at?: Date;
  },
  callback: Function
) => {
  const data = await retriveDataByField("users", userData.email);
  if (data.length > 0) {
    callback(data[0]);
  } else {
    // userData.password = await bcrypt.hash(userData.password, 10);
    userData.password = "";
    userData.created_at = new Date();
    userData.updated_at = new Date();
    addedData("users", userData, (result: boolean) => {
      callback(result);
      // console.log(callback(result));
    });
  }
};

export {
  updateData,
  getUsersId,
  signUp,
  signIn,
  loginWithGoogle,
  uploadImage,
  getImage,
};
