const { Op } = require("sequelize");
const Artist = require("../Models/artistModel");
const Album = require("../Models/albumsModel");
const logger = require("../Log/winston");

//todo CRUD for artist
// const createArtist = async () => {
//   try {
//     const artist = await Artist.create({
//       name: "ZZZ",
//       year: 2014,
//       origin: "Florida, USA",
//       genre: "alternative rock",
//       singer: "Matt McAndrew",
//       member1: "Colin Vieira",
//       member2: "Weston Richmond",
//       member3: "Felipe Sanchez",
//       member4: "Zachary Baker",
//       website: "raincitydrive.com",
//       image: "url",
//       bio: "long bio here",
//     });
//     console.log(artist);
//   } catch (err) {
//     console.log(err.message);
//   }
// };
//createArtist();

// const updateArtist = async () => {
//   const artistName = "Breaking Benjamin";
//   try {
//     const artist = await Artist.update(
//       { member4: "Keith Wallen" },
//       {
//         where: {
//           name: artistName,
//         },
//       }
//     );
//     console.log(artist);
//   } catch (err) {
//     console.log(err.message);
//   }
// };
//updateArtist();

// const deleteArtist = async () => {
//   const artistName = "zzz";
//   try {
//     const artist = await Artist.destroy({
//       where: {
//         name: artistName,
//       },
//     });
//     if (artist === 1) {
//       console.log("artist deleted");
//     } else {
//       console.log("artist not found");
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// };
//deleteArtist();

//todo CRUD for album
// const createAlbum = async () => {
//   try {
//     const album = await Album.create({
//       artistName: "cold",
//       name: "Cold 2",
//       releaseDate: "Jan 20 1998",
//       length: 49.26,
//       producer: "Ross Robinson",
//       tract1: "Go Away",
//       tract2: "Give",
//       tract3: "Ugly",
//       tract4: "Everyone Dies",
//       tract5: "Strip Her Down",
//       tract6: "Insane",
//       tract7: "Goodbye Cruel World",
//       tract8: "Serial Killer",
//       tract9: "Superstar",
//       tract10: "The Switch",
//       tract11: "Makes Her Sick",
//       // tract12: "",
//       // tract13: "",
//       // tract14: "",
//       // tract15: "",
//     });
//     console.log(album);
//   } catch (err) {
//     console.log(err.message);
//   }
// };
// createAlbum();

// const updateAlbum = async () => {
//   const id = 1;
//   try {
//     const album = await Album.update(
//       { length: 49 },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );
//     console.log(`Album ${album} updated`);
//   } catch (err) {
//     console.log(err.message);
//   }
// };
//updateAlbum();

// const deleteAlbum = async () => {
//   const id = 3;
//   try {
//     const album = await Album.destroy({
//       where: {
//         id: id,
//       },
//     });
//     if (album === 1) {
//       console.log("album deleted");
//     } else {
//       console.log("album not found");
//     }
//   } catch (err) {}
// };
// deleteAlbum();

const getAllArtists = async (req, res) => {
  const { year, singer } = req.query;
  const page = Number(req.query.page);
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const queryObject = {};
  if (year) {
    queryObject.year = year;
  }
  if (singer) {
    queryObject.singer = {
      [Op.like]: `%${singer}%`,
    };
  }
  try {
    const artist = await Artist.findAndCountAll({
      attributes: {
        exclude: ["bio", "website", "image"],
      },
      order: [["name", "asc"]],
      where: queryObject,

      limit: limit,
      offset: skip || 1,
    });
    res.status(200).json({
      count: artist.length,
      artistSearch: "/artists/a will return all a records",
      artist,
    });
  } catch (err) {
    logger.error(err.message);
  }
};

const getSingleArtist = async (req, res) => {
  const { artistName } = req.params;
  const artistQuery = {
    [Op.like]: `%${artistName}%`,
  };

  try {
    const artist = await Artist.findOne({
      include: {
        model: Album,
        as: "albums",
        attributes: {
          exclude: ["id", "artistName"],
        },
      },
      attributes: {
        exclude: ["id"],
      },
      where: {
        name: artistQuery,
      },
    });
    if (!artist) {
      res.status(404).json({
        message: "Artist not found",
      });
    }

    res.status(200).json({
      status: "ok",
      artist,
    });
  } catch (err) {
    logger.error(err.message);
  }
};
module.exports = {
  getAllArtists,
  getSingleArtist,
};
