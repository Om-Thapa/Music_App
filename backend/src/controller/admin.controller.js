import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import claudinary from "../lib/claudinary.js";

//Helper function for claudinary uploads
const uploadToCloudinary = async (file) => {
    try {
        const result = await claudinary.uploader.upload(file.tempFilePath, { resource_type: "auto" });

        return result.secure_url; 
    } catch (error) {
        console.log("Error in uploadToCloudinary : ", error);
        throw new Error("Error uploading to claudinary");
    }
}

export const createSong = async (req, res) => {
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({ message : "Please upload all files " });
        }

        const { title, artist, albumId, duration } = req.body;
		const audioFile = req.files.audioFile;
		const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null,
        });

        await song.save();

        if(albumId){
            await Album.findByIdAndUpdate( albumId, {
                $push: { songs: song._id},
            });
        }
        res.status(201).json(song);
    } catch (error) {
		console.log("Error in createSong", error);
        res.status(500).json({ message: "Internal server error"});
    }
}

export const deleteSong = async (req, res) => {
    const { id } = req.params;
    try {
        const song = await Song.findById(id);

        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs : song._id },
            });
        }
        
        await Song.findByIdAndDelete(id);
        res.status(200).json({ message: "Song deleted succesfully"});
    } catch (error) {
        console.log("Error in deleteSong", error);
        res.status(500).json({ message: "Internal server error"});
    }
}

export const createAlbum = async (req, res) => {
    try {
        const { title, artist, releaseYear } = req.body;
        const { imageFile } = req.files;

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear,
        });

        await album.save();

        res.status(201).json(album);
    } catch (error) {
        console.log("Error in createAlbum", error);
        res.status(500).json({ message: "Internal server error"});
    }
};

export const deleteAlbum = async (req, res) => {
    const { id } = req.params;
    try {
        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: " Album deleted succesfully" });
    } catch (error) {
        console.log("Error in deleteAlbum", error);
        res.status(500).json({ message: "Internal server error"});        
    }
}

export const checkAdmin = async (req, res) => {
    res.status(200).json({ admin: true});
};