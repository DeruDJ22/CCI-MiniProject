"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

export default function AnimeList() {
    const [animeList, setAnimeList] = useState([]);
    
    useEffect(() => {
        const localData = localStorage.getItem("animeList");
        if (localData) {
            setAnimeList(JSON.parse(localData));
        } else {
            fetch("/anime.json")
            .then((res) => res.json())
            .then((data) => {
                setAnimeList(data);
                localStorage.setItem("animeList", JSON.stringify(data));
            });
        }
    }, []);

    const handleDelete = (id) => {
        const newData = animeList.filter((anime) => anime.id != id);
        setAnimeList(newData);
        localStorage.setItem("animeList", JSON.stringify(newData));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Daftar Anime</h1>
            {animeList.length === 0 ? (
                <p className="text-gray-500">Belum ada anime</p>
            ) : (
                <ul className="space-y-4">
                    {animeList.map((anime) => (
                        <Card key={anime.id}>
                            <CardHeader>
                                <CardTitle>{anime.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                                <div>
                                    <p>Status: {anime.status}</p>
                                    <p>Episode: {anime.currentEpisode}/{anime.episodes}</p>
                                    <p className="text-sm text-gray-500">Ditambahkan: {anime.dateAdded}</p>
                                </div>
                                <Button variant="destructive" onClick={() => handleDelete(anime.id)}>Hapus</Button>
                            </CardContent>
                        </Card>
                    ))}
                </ul>
            )}
        </div>
    );
}