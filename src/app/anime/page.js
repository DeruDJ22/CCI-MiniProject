"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const removeDuplicates = (array) => {
  const unique = [];
  const ids = new Set();

  for (const item of array) {
    if (!ids.has(item.mal_id)) {
      ids.add(item.mal_id);
      unique.push(item);
    }
  }

  return unique;
};

export default function Home() {
  const [total, setTotal] = useState(0);
  const [topAnime, setTopAnime] = useState([]);
  const [randomAnime, setRandomAnime] = useState(null);
  const [seasonAnime, setSeasonAnime] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topRes, randomRes, seasonRes] = await Promise.all([
          fetch("https://api.jikan.moe/v4/top/anime"),
          fetch("https://api.jikan.moe/v4/random/anime"),
          fetch("https://api.jikan.moe/v4/seasons/now"),
        ]);

        const topData = await topRes.json();
        const randomData = await randomRes.json();
        const seasonData = await seasonRes.json();

        setTotal(topData.pagination.items.total);
        setTopAnime(removeDuplicates(topData.data).slice(0, 3));
        setRandomAnime(randomData.data);
        setSeasonAnime(removeDuplicates(seasonData.data).slice(0, 6));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-20 space-y-8">
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Anime Explorer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            Jelajahi, cari, dan temukan anime favoritmu dari database Jikan API.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href="/anime/list">Lihat daftar anime</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-gray-900 hover:bg-white hover:text-blue-600 w-full sm:w-auto"
            >
              <Link href="/anime/search">Cari anime</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Anime</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{total || "Loading..."}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fitur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>✔️ Cari Anime</p>
            <p>✔️ Lihat Daftar Top Anime</p>
            <p>✔️ Detail Lengkap Anime</p>
            <p>✔️ Trailer Anime</p>
            <p>✔️ Anime Berdasarkan Season</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Developer</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Dibuat oleh <b>KuroAkai</b> dengan Next.js, TailwindCSS, dan API dari Jikan.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center group">
          <h2 className="text-2xl font-bold">Top Anime</h2>
          <Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl shadow-lg transition-all duration-300 group-hover:from-blue-700 group-hover:to-indigo-700">
            <Link href="/anime/list">Lihat semua</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topAnime.map((anime) => (
            <Link href={`/anime/${anime.mal_id}`} key={`top-${anime.mal_id}`}>
              <Card className="hover:scale-105 transition cursor-pointer flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{anime.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 flex-1">
                  <Image
                    src={anime.images.webp.image_url}
                    alt={anime.title}
                    width={500}
                    height={500}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="space-y-1 mt-auto">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      {anime.type}
                    </span>
                    <p>Episode: {anime.episodes ?? "?"}</p>
                    <p className="text-sm text-gray-500">⭐ {anime.score ?? "N/A"}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center group">
          <h2 className="text-2xl font-bold">Anime season saat ini</h2>
          <Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl shadow-lg transition-all duration-300 group-hover:from-blue-700 group-hover:to-indigo-700">
            <Link href="/anime/seasons">Lihat semua</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seasonAnime.map((anime) => (
            <Link href={`/anime/${anime.mal_id}`} key={`season-${anime.mal_id}`}>
              <Card className="hover:scale-105 transition cursor-pointer flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{anime.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 flex-1">
                  <Image
                    src={anime.images.webp.image_url}
                    alt={anime.title}
                    width={500}
                    height={500}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="space-y-1 mt-auto">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      {anime.type}
                    </span>
                    <p>Episode: {anime.episodes ?? "?"}</p>
                    <p className="text-sm text-gray-500">⭐ {anime.score ?? "N/A"}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {randomAnime && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Random Anime</h2>
          <Card className="flex flex-col md:flex-row gap-6">
            <Image
              src={randomAnime.images.webp.image_url}
              alt={randomAnime.title}
              width={300}
              height={450}
              className="rounded w-full md:w-1/3 object-cover"
            />
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">{randomAnime.title}</h3>
              <p className="text-sm text-gray-600">
                {randomAnime.synopsis ?? "No synopsis available."}
              </p>
              <p>
                <b>Type:</b> {randomAnime.type} | <b>Episode:</b>{" "}
                {randomAnime.episodes ?? "?"} | <b>Score:</b>{" "}
                {randomAnime.score ?? "N/A"}
              </p>
              <Button asChild>
                <Link href={`/anime/${randomAnime.mal_id}`}>Lihat Detail</Link>
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
