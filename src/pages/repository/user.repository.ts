import knex from "@/lib/knex/init";

const getAllDataResto = async () => {
  const retrievData = await knex
    .select(
      knex.raw(`
        restaurants.restaurant_id,
        restaurants.name,
        restaurants.address,
        restaurants.phone,
        restaurants.about,
        restaurants.facility,
        restaurants.opening_time,
        restaurants.closing_time,
        restaurants.price_range,
        restaurants.category,
        rating.rating 
      `)
    )
    .from("restaurants")
    .fullOuterJoin(
      "rating",
      "restaurants.restaurant_id",
      "=",
      "rating.restaurant_id"
    );
  return retrievData;
};
const getAllData = async (field: string, value: string) => {
  const retrievData = await knex.select(field).from(value);
  return retrievData;
};

const getAllRestos = async (
  field: string,
  value: string,
  limit: number,
  offset: number
) => {
  const retrievData = await knex
    .select(field)
    .from(value)
    .limit(limit)
    .offset(offset);
  console.log(retrievData);
  return retrievData;
};

const getAllDataRestoPage = async (value: string, limit: number) => {
  try {
    const count = await knex(value).count("restaurant_id as count").first();

    const totalCount = Number(count.count);
    const totalPages = Math.ceil(totalCount / limit);

    return totalPages;
  } catch (error) {
    console.error("Error calculating total pages:", error);
    throw new Error("Failed to calculate total pages.");
  }
};

const retriveDataByCom = async (
  field: string,
  id: string,
  value: string | number
) => {
  console.log(field);
  console.log(id);
  console.log(value);
  const retrievData = await knex(field)
    .select(
      `${field}.user_id`,
      `${field}.review_id`,
      `${field}.restaurant_id`,
      "users.name",
      `${field}.message`,
      "gallery_user.link"
    )
    .join("users", `${field}.user_id`, "users.user_id")
    .join("gallery_user", "users.user_id", "gallery_user.user_id")
    .where({ [id]: value });
  console.log(retrievData);
  return retrievData;
};
const retriveDataById = async (
  field: string,
  id: string,
  value: string | number
) => {
  console.log(field);
  console.log(id);
  console.log(value);
  const retrievData = await knex(field)
    .select(
      `${field}.user_id`,
      `${field}.rating_id`,
      `${field}.restaurant_id`,
      "users.name",
      `${field}.rating`,
      "gallery_user.link"
    )
    .join("users", `${field}.user_id`, "users.user_id")
    .join("gallery_user", "users.user_id", "gallery_user.user_id")
    .where({ [id]: value });
  console.log(retrievData);
  return retrievData;
};

const retriveFullCom = async (
  field: string,
  field2: string,
  field3: string,
  id: string,
  value: string | number
) => {
  console.log(field);
  console.log(field2);
  console.log(field3);
  console.log(id);
  console.log(value);

  const retrievData = await knex(field)
    .select(
      `rating.user_id`,
      `rating.rating_id`,
      `rating.restaurant_id`,
      "users.name",
      `rating.rating`,
      `review.message`,
      "gallery_user.link"
    )
    .join(`rating`, `rating.user_id`, "users.user_id")
    .join(`review`, `review.user_id`, "users.user_id")
    .join("gallery_user", "users.user_id", "gallery_user.user_id")
    // .where({ [id]: value });
    .where(`rating.restaurant_id`, value)
    .orWhere(`review.restaurant_id`, value);
  console.log(retrievData);
  return retrievData;
};

const DataUpdate = async (
  field: string,
  id: string,
  value: string | number,
  data: object,
  callback: Function
) => {
  knex({ field })
    .where({ [id]: value })
    .update({ ...data })
    .returning("*")
    .then(() => {
      callback(true);
      console.log(callback(true));
    })
    .catch((error: string) => {
      callback(false);
      console.log(error);
    });
};

const retriveDataByField = async (field: string, value: string) => {
  const retrievData = await knex({ field }).where({ email: value });
  return retrievData;
};

const addedData = async (field: string, value: object, callback: Function) => {
  knex(field)
    .insert({ ...value })
    .returning("*")
    .then((res: any) => {
      callback(true, res);
    })
    .catch((error: string) => {
      callback(false);
      console.log(error);
    });
};

const updateRestoData = async (
  field: string,
  value: object,
  key: string,
  id: string | number,
  callback: Function
) => {
  await knex(field)
    .where({ [key]: id })
    .update({ ...value })
    .returning("*")
    .then(() => {
      callback(true);
      console.log(callback(true));
    })
    .catch((error: string) => {
      callback(false);
      console.log(error);
    });
};

const updateDataDo = async (
  field: string,
  value: object,
  key: string,
  id: string | number,
  key2: string,
  id2: string | number,
  // key3: string,
  // id3: boolean,
  callback: Function
) => {
  await knex(field)
    .where({ [key]: id })
    .andWhere({ [key2]: id2 })
    // .andWhere({ [key3]: id3 })
    .update({ ...value })
    .returning("*")
    .then(() => {
      callback(true);
      console.log(callback(true));
    })
    .catch((error: string) => {
      callback(false);
      console.log(error);
    });
};

// const retriveDataByFilter = async (table: string, filters: any) => {
//   console.log(filters);
//   const knexQuery = knex(table);
//   if (filters.rate >= 0) {
//     knexQuery.join(
//       "rating",
//       "restaurants.restaurant_id",
//       "=",
//       "rating.restaurant_id"
//     );

//     // // Add the rate filter after the JOIN
//     knexQuery.orWhere("rating.rating", "=", parseFloat(filters.rate));
//   }

//   // Apply filters dynamically
//   if (filters["category[]"]) {
//     if (Array.isArray(filters["category[]"])) {
//       knexQuery.whereIn("category", filters["category[]"]);
//     } else {
//       knexQuery.where("category", filters["category[]"]); // Handle single value case
//     }
//   }

//   if (filters["price_range[]"]) {
//     const priceRange = filters["price_range[]"];
//     if (Array.isArray(priceRange)) {
//       knexQuery.orWhereIn(
//         "price_range",
//         priceRange.map((price) => parseInt(price, 10))
//       );
//     } else {
//       knexQuery.orWhere("price_range", "=", parseInt(priceRange, 10)); // Single price value
//     }
//   }

//   // if (filters.rate && !isNaN(parseFloat(filters.rate))) {
//   //   knexQuery.orWhere("rating.rating", "=", parseFloat(filters.rate)); // Filter based on rating
//   // }

//   console.log("Generated Query:", knexQuery.toString()); // Debugging the query

//   // Execute the query
//   const retrievData = await knexQuery;
//   console.log(retrievData);
//   return retrievData;
// };

const retriveDataByFilter = async (
  table: string,
  filters: any,
  callback: Function
) => {
  console.log("Input Filters:", filters);
  const knexQuery = knex(table);
  // Check if rate is provided and valid
  if (
    filters.rate !== undefined &&
    filters.rate > 0 &&
    !isNaN(parseFloat(filters.rate))
  ) {
    knexQuery.join(
      "rating",
      `${table}.restaurant_id`,
      "=",
      "rating.restaurant_id"
    );
    // Add filter condition for rate
    knexQuery.orWhere("rating.rating", "=", parseFloat(filters.rate));
    if (filters["category[]"]) {
      if (Array.isArray(filters["category[]"])) {
        knexQuery.orWhereIn("category", filters["category[]"]);
      } else {
        knexQuery.orWhere("category", filters["category[]"]); // Handle single value case
      }
    }
    if (filters["price_range[]"]) {
      const priceRange = filters["price_range[]"];
      if (Array.isArray(priceRange)) {
        knexQuery.orWhereIn(
          "price_range",
          priceRange.map((price) => parseInt(price, 10))
        );
      } else {
        knexQuery.orWhere("price_range", "=", parseInt(priceRange, 10)); // Handle single price value
      }
    }
    if (filters["category[]"]) {
      if (Array.isArray(filters["category[]"])) {
        knexQuery.orWhereIn("category", filters["category[]"]);
      } else {
        knexQuery.orWhere("category", filters["category[]"]); // Handle single value case
      }
    }
  } else {
    if (filters["category[]"]) {
      if (Array.isArray(filters["category[]"])) {
        knexQuery.orWhereIn("category", filters["category[]"]);
      } else {
        knexQuery.orWhere("category", filters["category[]"]); // Handle single value case
      }
    }
    if (filters["price_range[]"]) {
      const priceRange = filters["price_range[]"];
      if (Array.isArray(priceRange)) {
        knexQuery.orWhereIn(
          "price_range",
          priceRange.map((price) => parseInt(price, 10))
        );
      } else {
        knexQuery.orWhere("price_range", "=", parseInt(priceRange, 10)); // Handle single price value
      }
    }
    knexQuery.where(() => {
      knexQuery
        .orWhereILike("address", `%${filters.query}%`)
        .orWhereILike("name", `%${filters.query}%`);
    });
  }
  console.log("Generated Query:", knexQuery.toString());
  try {
    const retrievedData = await knexQuery;
    retrievedData.forEach((da: any) => {
      console.log(da);
      delete da.password;
    });

    console.log("Retrieved Data:", retrievedData);
    callback(true, retrievedData);
  } catch (error) {
    console.error("Error executing query:", error);
    callback(false, null);
  }
};

const updateRate = async (
  field: string,
  value: number,
  key: string,
  id: string | number,
  key2: string,
  id2: string | number
  // key3: string,
  // id3: boolean,
) => {
  const data = await knex(field)
    .where({ [key]: id })
    .andWhere({ [key2]: id2 })
    // .andWhere({ [key3]: id3 })
    .update({ rating: value })
    .returning("*");
  return data;
};

const addedDatR = async (field: string, value: object) => {
  const data = await knex(field)
    .insert({ ...value })
    .returning("*");
  console.log(data);
  return data;
};

const retriveDataByIdd = async (
  field: string,
  value: string,
  id: string | number
) => {
  console.log(field);
  console.log(value);
  console.log(id);
  const retrievData = await knex({ field }).where({ [value]: id });
  return retrievData;
};
export {
  retriveDataByIdd,
  addedDatR,
  retriveFullCom,
  updateRate,
  getAllData,
  retriveDataByField,
  retriveDataById,
  addedData,
  DataUpdate,
  updateRestoData,
  updateDataDo,
  retriveDataByFilter,
  getAllDataResto,
  getAllDataRestoPage,
  getAllRestos,
  retriveDataByCom,
};
