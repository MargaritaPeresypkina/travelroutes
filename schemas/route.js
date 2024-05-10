const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RouteSchema = new Schema({
  name: String,
  firstDescription: String,
  mainImage: String,
  lurgeDescription: String, 
  isUserRoute: Boolean,
  places: [
    {
      title: String,
      desc: [
        {
          text: String,
        },
      ],
      images: [
        {
          image: String,
          imageDesc: String,
          coordinates: String,
        },
      ],
    },
  ],
  arrivalMethod: {
    title: String,
    desc: [
      {
        text: String,
      },
    ],
    images: [
      {
        image: String,
        imageDesc: String,
        coordinates: String,
      },
    ],
  },
  recommendation: {
    title: String,
    desc: [
      {
        text: String,
      },
    ],
    images: [
      {
        image: String,
        imageDesc: String,
        coordinates: String,
      },
    ],
  },
  accommodation: {
    title: String,
    desc: [
      {
        text: String,
      },
    ],
    images: [
      {
        image: String,
        imageDesc: String,
        coordinates: String,
      },
    ],
  },
  meals: {
    title: String,
    desc: [
      {
        text: String,
      },
    ],
    images: [
      {
        image: String,
        imageDesc: String,
        coordinates: String,
      },
    ],
  },
  usefulInfo: {
    title: String,
    desc: [
      {
        text: String,
      },
    ],
    images: [
      {
        image: String,
        imageDesc: String,
        coordinates: String,
      },
    ],
  },
  conclusion: String,
});

const Route = mongoose.model("route", RouteSchema);
module.exports = Route;
