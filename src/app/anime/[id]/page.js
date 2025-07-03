"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DetailAnime() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [animeRes, charRes, staffRes] = await Promise.all([
          fetch(`https://api.jikan.moe/v4/anime/${id}`),
          fetch(`https://api.jikan.moe/v4/anime/${id}/characters`),
          fetch(`https://api.jikan.moe/v4/anime/${id}/staff`),
        ]);

        const animeData = await animeRes.json();
        const charData = await charRes.json();
        const staffData = await staffRes.json();

        setAnime(animeData.data);
        setCharacters(charData.data || []);
        setStaff(staffData.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching:", err);
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  if (loading) return <p className="pt-24 text-center">Loading...</p>;
  if (!anime) return <p className="pt-24 text-center">Anime tidak ditemukan</p>;

  return (
    <div className="pt-24 px-4 space-y-6">
      <Link href="/anime/list">
        <Button variant="outline">⬅️ Kembali ke list</Button>
      </Link>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">{anime.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[300px] flex-shrink-0">
            <Image
              src={anime.images.webp.image_url}
              alt={anime.title}
              width={300}
              height={450}
              className="rounded w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <p><b>Type:</b> {anime.type}</p>
              <p><b>Status:</b> {anime.status}</p>
              <p><b>Episodes:</b> {anime.episodes}</p>
              <p><b>Score:</b> {anime.score ?? "N/A"}</p>
              <p><b>Year:</b> {anime.year ?? "?"}</p>
              <p><b>Genres:</b> {anime.genres.map((g) => g.name).join(", ") || "-"}</p>
              <p><b>Studios:</b> {anime.studios.map((s) => s.name).join(", ") || "-"}</p>
              <p><b>Producers:</b> {anime.producers.map((p) => p.name).join(", ") || "-"}</p>
              <p><b>Licensors:</b> {anime.licensors.map((l) => l.name).join(", ") || "-"}</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Synopsis</h2>
              <p className="text-justify text-gray-700 text-sm">{anime.synopsis}</p>
            </div>

            {anime.trailer?.embed_url && (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Trailer</h2>
                <iframe
                  width="100%"
                  height="300"
                  src={anime.trailer.embed_url}
                  title="Trailer"
                  allowFullScreen
                  className="rounded-md"
                ></iframe>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Characters</CardTitle>
        </CardHeader>
        <CardContent>
          {characters.length === 0 ? (
            <p className="text-gray-500">Tidak ada data karakter.</p>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {characters.slice(0, 8).map((char, i) => (
                <li key={i}>
                  <Image
                    src={char.character.images.webp.image_url}
                    alt={char.character.name}
                    width={80}
                    height={100}
                    className="rounded w-20 h-auto mb-1"
                  />
                  <p>{char.character.name}</p>
                  <p className="text-gray-500 text-xs italic">{char.role}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Staff</CardTitle>
        </CardHeader>
        <CardContent>
          {staff.length === 0 ? (
            <p className="text-gray-500">Tidak ada data staff.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {staff.slice(0, 6).map((s, i) => (
                <li key={i}>
                  {s.person.name} – <i>{s.positions.join(", ")}</i>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
