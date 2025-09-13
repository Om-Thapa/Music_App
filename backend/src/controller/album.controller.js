import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (error) {
        console.log("Error in getAllAlbums controller : ", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAlbumById = async (req, res) => {
    const { albumId } = req.params;
    try {
        const album = await Album.findById(albumId).populate("songs");

        if(!album){
            return res.status(404).json({ message: "Album not found" });
        }
        res.status(200).json(album);
    } catch (error) {
            console.log("Error in getAllAlbumsById controller : ", error)
            res.status(500).json({ message: "Internal Server Error" });
    }
}