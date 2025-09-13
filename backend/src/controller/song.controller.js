import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find().sort({ createdAt: -1 });
        res.json(songs);
    } catch (error) {
        console.log("Error in getAllSongs controller : ", error);
        res.status(500).json({ message: "Internal server error "});
    }
}

export const getFeaturedSongs = async (req, res) => {
    try {
        //Fetch 6 randam using aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample: { size: 6 },
            },
            {
                $project: {
                    id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                },
            },
        ]);

        res.json(songs);
    } catch (error) {
        console.log("Error in getFeaturedSongs controller : ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const getMadeForYouSongs = async (req, res) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample: { size: 4 },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                },
            },
        ]);

        res.json(songs);
    } catch (error) {
        console.log("Error in getMadeForYouSongs controller : ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const getTrendingSongs = async (req, res) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample: { size: 4 },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                },
            },
        ]);

        res.json(songs);
    } catch (error) {
        console.log("Error in getTrendingSongs controller : ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};