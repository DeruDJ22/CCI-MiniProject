"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "../components/ui/button";

const removeDuplicates = (array) => {
  const seen = new Set();
  return array.filter((items) => {
    if (seen.has(items.mal_id)) return false;
    seen.add(items.mal_id);
    return true
  });
};

export default function SeasonsAnime() {
  const [seasonsAnime, setSeasonsAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSeasonsAnime() {
      try {
        const res = await fetch("https://api.jikan.moe/v4/seasons/now");
        const data = await res.json();
        const uniqueData = removeDuplicates(data.data);
        setSeasonsAnime(uniqueData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching seasons anime: ", err);
        setLoading(false);
      }
    }
    fetchSeasonsAnime();
  }, []);

  return (
    <div className="pt-20 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Anime musim ini</h1>
        <Button asChild variant="outline">
          <Link href="/anime">Kembali ke home</Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {seasonsAnime.map((anime) => (
            <Link href={`/anime/${anime.mal_id}`} key={anime.mal_id}>
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
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      {anime.type}
                    </span>
                    <p>Episode: {anime.episodes ?? "?"}</p>
                    <p className="flex items-center gap-1 text-sm text-gray-500">
                      ⭐ {anime.score ?? "N/A"}
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
