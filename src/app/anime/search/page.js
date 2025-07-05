"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function SearchAnime() {
  const [query, setQuery] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
  if (!query) return;

  setLoading(true);

  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=20`);
    const data = await res.json();

    if (data?.data) {
      const seen = new Set();
      const uniqueResults = data.data.filter((anime) => {
        if (seen.has(anime.mal_id)) return false;
        seen.add(anime.mal_id);
        return true;
      });

      setAnimeList(uniqueResults);
    } else {
      setAnimeList([]);
    }
  } catch (err) {
    console.error("Error fetch:", err);
    setAnimeList([]);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="pt-20 space-y-6">
      <h1 className="text-3xl font-bold">Cari Anime</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Cari anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch}>Cari</Button>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-500"> Loading...</p>
        </div>
      ) : animeList.length === 0 ? (
        <p className="text-gray-500">Anime tidak ditemukan</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animeList.map((anime, index) => (
            <Link
              href={`/anime/${anime.mal_id}`}
              key={`${anime.mal_id}-${index}`}
            >
              <Card className="flex flex-col justify-between h-full cursor-pointer hover:scale-105 transition">
                <CardHeader>
                  <CardTitle className="text-xl">{anime.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 flex-1 min-h-[200px]">
                  <Image
                    src={anime.images.webp.image_url}
                    alt={anime.title}
                    width={500}
                    height={500}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="space-y-1">
                    <p>
                      Type: <b>{anime.type}</b>
                    </p>
                    <p>Episode: {anime.episodes ?? "?"}</p>
                    <p className="text-sm text-gray-500">
                      Score: {anime.score ?? "N/A"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
