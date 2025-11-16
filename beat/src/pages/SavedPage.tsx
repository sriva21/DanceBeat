import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import SongCard from "@/components/SongCard";

import songsData from "../data/songs.json";

const SavedPage = () => {
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const currentUser = localStorage.getItem("currentUser");

  const imageFiles = import.meta.glob("/src/assets/images/*", { eager: true });
  const audioFiles = import.meta.glob("/src/assets/audio/*", { eager: true });

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem(`${currentUser}_savedSongs`) || "[]"
    );
    setSavedIds(saved);

    const mapped = songsData.map((song) => ({
      ...song,
      image: (imageFiles[`/src/assets/images/${song.image}`] as any)?.default,
      audioUrl: (audioFiles[`/src/assets/audio/${song.audioUrl}`] as any)?.default,
    }));

    setSongs(mapped);
  }, []);

  // REMOVE from saved inside saved page
  const toggleSave = (songId: number) => {
    const updated = savedIds.filter((id) => id !== songId);
    setSavedIds(updated);
    localStorage.setItem(`${currentUser}_savedSongs`, JSON.stringify(updated));
  };

  const savedSongs = songs.filter((s) => savedIds.includes(s.id));

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bookmark className="w-7 h-7 text-pink-600" />
          Saved Songs
        </h1>
        <Button onClick={() => navigate("/")}>Back</Button>
      </div>

      {savedSongs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No saved songs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedSongs.map((song) => (
            <SongCard
              key={song.id}
              image={song.image}
              title={song.title}
              artist={song.artist}
              isSaved={true}
              isFav={false}
              onClick={() => {}}         // required
              onSave={() => toggleSave(song.id)}
              onFav={() => {}}           // required to avoid errors
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPage;
