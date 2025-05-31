require("dotenv").config();

const mongoose = require("mongoose");
const axios = require("axios");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const MAPBOX_TOKEN = process.env.MAP_TOKEN;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const getCoordinates = async (location) => {
  try {
    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location
      )}.json`,
      {
        params: {
          access_token: MAPBOX_TOKEN,
        },
      }
    );

    const [longitude, latitude] = res.data.features[0].center;
    return {
      type: "Point",
      coordinates: [longitude, latitude],
    };
  } catch (err) {
    console.error(`❌ Error getting coordinates for: ${location}`, err.message);
    return {
      type: "Point",
      coordinates: [0, 0], // fallback
    };
  }
};

const initDB = async () => {
  await Listing.deleteMany({});

  const listingsWithGeo = [];

  for (let item of initData.data) {
    const geometry = await getCoordinates(item.location);

    listingsWithGeo.push({
      ...item,
      geometry,
      owner: "68243d49206f7cecff532964",
    });
  }

  await Listing.insertMany(listingsWithGeo);
  console.log("✅ Data initialized with coordinates.");
};

initDB();
