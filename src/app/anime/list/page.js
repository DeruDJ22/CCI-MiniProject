"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AnimeList() {
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [filter, setFilter] = useState("all");

  const handleNext = () => {
    setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setPage(1);
  };

  useEffect(() => {
    const url = `https://api.jikan.moe/v4/top/anime?limit=21&page=${page}${
      filter !== "all" ? `&type=${filter}` : ""
    }`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.data) {
          setAnimeList([]);
          setHasNextPage(false);
          return;
        }

        const seen = new Set();
        const uniqueAnime = data.data.filter((anime) => {
          if (seen.has(anime.mal_id)) return false;
          seen.add(anime.mal_id);
          return true;
        });

        setAnimeList(uniqueAnime);
        setHasNextPage(data.pagination?.has_next_page);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setAnimeList([]);
      });
  }, [page, filter]);

  return (
    <div className="pt-20 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Daftar Top Anime - Page {page}</h1>
        <Select value={filter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Tipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="tv">TV</SelectItem>
            <SelectItem value="movie">Movie</SelectItem>
            <SelectItem value="ova">OVA</SelectItem>
            <SelectItem value="special">Special</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {animeList.length === 0 ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animeList.map((anime) => (
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

      <div className="flex justify-center gap-4">
        <Button variant="outline" disabled={page === 1} onClick={handlePrev}>
          Previous
        </Button>
        <Button variant="outline" disabled={!hasNextPage} onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
