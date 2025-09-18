import { Song } from "../models/song.model";
import { Album } from "../models/album.model";
import { User } from "../models/user.model";

export const getStats =  async (req, res) => {
    try {
        const [ totalSongs, totalAlbums, totalUsers, uniqueArtists ] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),

            Song.aggregate([
                {
                    $unionWith: {
                        coll: "albums",
                        pipeline: [],
                    },
                },
                {
                    $group: {
                        _id: "$artist",
                    },
                },
                {
                    $count: "count",
                },
            ]),
        ]);

        res.status(200).json({
            totalAlbums,
            totalSongs,
            totalUsers,
            totalArtist: uniqueArtists[0]?.$count || 0,
        });
    } catch (error) {
        console.log("Error in getStats controller : ", error);
        res.status(500).json({message: "Internal Server Error"});        
    }
}