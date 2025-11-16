import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Heart, Bookmark, Volume2, Award } from "lucide-react";
import { toast } from "sonner";

import ThemeToggle from "@/components/ThemeToggle";
import SongCard from "@/components/SongCard";
import SongModal from "@/components/SongModal";

import songsData from "../data/songs.json";
import instrumentsData from "../data/instruments.json";
import awardsData from "../data/awards.json";

type Song = {
  id: number;
  title: string;
  artist: string;
  image: string;
  audioUrl: string;
};

const AppPage: React.FC = () => {
  const navigate = useNavigate();

  const [likedSongs, setLikedSongs] = useState<number[]>([]);
  const [savedSongs, setSavedSongs] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingInstrumentId, setPlayingInstrumentId] = useState<number | null>(null);

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  
  const [activeInstrument, setActiveInstrument] = useState<any | null>(null);

  // Load only images using Vite glob
  const imageFiles = import.meta.glob("/src/assets/images/*", {
    eager: true,
  }) as Record<string, any>;

  // Load instruments audio (they are in src/assets/audio)
  const instrumentAudioFiles = import.meta.glob("/src/assets/audio/*", {
    eager: true,
  }) as Record<string, any>;

  // SONGS → public folder
  const songs: Song[] = songsData.map((song: any) => ({
    ...song,
    image:
      imageFiles[`/src/assets/images/${song.image}`]?.default ?? song.image,

    // Songs in PUBLIC → must be loaded with absolute URL
    audioUrl: `/${song.audioUrl}`,
  }));

  // INSTRUMENTS → src/assets/audio
  const instruments = instrumentsData.map((ins: any) => ({
    ...ins,
    image:
      imageFiles[`/src/assets/images/${ins.image}`]?.default ?? ins.image,

    // Instruments audio from src/assets/audio
    audio:
      instrumentAudioFiles[`/src/assets/audio/${ins.audio}`]?.default ??
      ins.audio,
  }));

  const awards = awardsData;
  const awardYears = Object.keys(awards);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    setIsLoggedIn(!!currentUser);

    setLikedSongs(JSON.parse(localStorage.getItem("likedSongs") || "[]"));
    setSavedSongs(JSON.parse(localStorage.getItem("savedSongs") || "[]"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const toggleLike = (songId: number) => {
    if (!isLoggedIn) return toast.error("Please login to like songs");

    const updated = likedSongs.includes(songId)
      ? likedSongs.filter((id) => id !== songId)
      : [...likedSongs, songId];

    setLikedSongs(updated);
    localStorage.setItem("likedSongs", JSON.stringify(updated));
  };

  const toggleSave = (songId: number) => {
    if (!isLoggedIn) return toast.error("Please login to save songs");

    const updated = savedSongs.includes(songId)
      ? savedSongs.filter((id) => id !== songId)
      : [...savedSongs, songId];

    setSavedSongs(updated);
    localStorage.setItem("savedSongs", JSON.stringify(updated));
  };

  return (
    <div
      className="
        min-h-screen transition-all duration-700
        bg-gradient-to-b from-pink-100 via-violet-100 to-pink-200
        dark:from-[#5c007a] dark:via-[#7b2cbf] dark:to-[#4b0082]
      "
    >
      {/* HEADER */}
      {!selectedSong && (
        <header className="bg-white/30 dark:bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50 shadow-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-pink-500 via-violet-500 to-pink-600 p-2 rounded-lg">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-violet-500 to-pink-600 bg-clip-text text-transparent">
                DanceBeats
              </span>
            </div>

            <div className="flex gap-3 items-center">
              <Button variant="ghost" onClick={() => navigate("/saved")}>
                <Bookmark className="w-4 h-4" /> Saved
              </Button>

              <Button variant="ghost" onClick={() => navigate("/liked")}>
                <Heart className="w-4 h-4" /> Favorites
              </Button>

              <Button variant="ghost" onClick={() => navigate("/create-music")}>
                🎹 Create Music
              </Button>

              <ThemeToggle />

              {isLoggedIn && (
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              )}
            </div>
          </div>
        </header>
      )}

      {/* SONG LIST */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {songs.map((song) => (
            <div key={song.id} className="w-full rounded-xl shadow-md hover:scale-105 transition">
              <SongCard
                image={song.image}
                title={song.title}
                artist={song.artist}
                isFav={likedSongs.includes(song.id)}
                isSaved={savedSongs.includes(song.id)}
                disabled={playingInstrumentId !== null}  // ⭐ NEW
                //disableMessage="Please pause instrument audio before opening choreography."
                  onDisabledClick={() =>
    toast.error("🎵 Please pause instrument audio before opening choreography.", {
      description: "Stop the instrument audio to view DanceBeats choreography.",
    })
  }
                onClick={() => {
                  if (!isLoggedIn)
                    return toast.error("Please login to view choreography");

                  setSelectedSong(song);
                }}
                onFav={() => toggleLike(song.id)}
                onSave={() => toggleSave(song.id)}
              />
            </div>
          ))}
        </div>

        {/* INSTRUMENTS */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <Volume2 className="w-8 h-8 text-pink-600" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">
              Musical Instruments
            </h2>
          </div>

          <div
            className="
              grid 
              grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
              xl:grid-cols-5 2xl:grid-cols-6
              gap-6 auto-rows-fr
            "
          >
            {instruments.map((instrument) => (
              <Card
                key={instrument.id}
                className="relative h-full min-h-56 overflow-hidden rounded-xl cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <img
                  src={instrument.image}
                  onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />

               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="relative z-10 flex flex-col justify-end h-full p-4 text-white">
                  <h3 className="font-semibold truncate text-white dark:text-white">{instrument.name}</h3>
                  <p className="text-sm opacity-90 line-clamp-2 text-white dark:text-gray-200">
                    {instrument.description}
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    className={`
    mt-2 w-fit backdrop-blur-md transition-all duration-300 font-semibold

    ${
      playingInstrumentId === instrument.id
        ? `
          /* PLAYING STATE */
          text-white
          bg-pink-600 hover:bg-pink-700

          dark:bg-gradient-to-r dark:from-blue-600 dark:to-pink-600
          dark:hover:from-blue-500 dark:hover:to-pink-500
        `
        : `
          /* NOT PLAYING STATE */
          bg-white/40 hover:bg-white/60
          text-white
        `
    }
  `}
                    onClick={(e) => {
                      e.stopPropagation();

                      if (playingInstrumentId === instrument.id) {
                        currentAudio?.pause();
                        setPlayingInstrumentId(null);
                      } else {
                        currentAudio?.pause();

                        const audio = new Audio(instrument.audio);
                        audio.loop = true;  
                        audio.play();

                        setCurrentAudio(audio);
                        setPlayingInstrumentId(instrument.id);
                      }
                    }}
                  >
                    {playingInstrumentId === instrument.id ? "Pause" : "Play"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* AWARDS LIST */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-pink-600" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">
              Music Awards By Year
            </h2>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <label className="font-medium text-pink-600 dark:text-violet-300">
              Filter by Year:
            </label>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1 rounded-md border border-pink-400 dark:border-violet-400 
                bg-white/50 dark:bg-black/30 text-pink-700 dark:text-violet-200 
                focus:ring-2 focus:ring-pink-500 outline-none"
            >
              <option value="all">All Years</option>
              {awardYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-10">
            {Object.entries(awards)
              .filter(
                ([year]) => selectedYear === "all" || selectedYear === year
              )
              .map(([year, items]) => (
                <div key={year}>
                  <h3 className="text-2xl font-bold text-pink-600 dark:text-violet-300 mb-4">
                    {year}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((award: any, index: number) => (
                      <Card
                        key={index}
                        className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-pink-500
                          bg-gradient-to-br from-pink-100 via-violet-100 to-pink-200
                          dark:from-[#5c007a] dark:via-[#7b2cbf] dark:to-[#4b0082]"
                      >
                        <CardContent className="p-4">
                          <span className="text-xs px-2 py-1 rounded-full bg-pink-200/30 dark:bg-violet-900/30 text-pink-700 dark:text-violet-200">
                            {award.category}
                          </span>

                          <h3 className="font-bold text-base mb-2 dark:text-white">
                            {award.award}
                          </h3>

                          <p className="text-sm text-gray-800 dark:text-gray-300">
                            {award.winner}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>

      {/* SONG MODAL */}
      {selectedSong && (
        <SongModal
          song={selectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}
    </div>
  );
};

export default AppPage;
