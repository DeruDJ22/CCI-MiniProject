"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddAnime() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    status: "Watching",
    episodes: 0,
    currentEpisode: 0,
    dateAdded: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (value) => {
    setForm({ ...form, status: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const localData = JSON.parse(localStorage.getItem("animeList")) || [];
    const newAnime = { ...form, id: Date.now() };
    const updated = [...localData, newAnime];
    localStorage.setItem("animeList", JSON.stringify(updated));
    alert("Anime berhasil ditambahkan");
    router.push("/anime/list");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tambah List Anime</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Judul Anime</Label>
          <Input
            type="text"
            name="title"
            placeholder="Contoh: One Piece"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Status</Label>
          <Select value={form.status} onValueChange={handleSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Watching">Watching</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Total Episode</Label>
          <Input
            type="number"
            name="episodes"
            value={form.episodes}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Episode Saat Ini</Label>
          <Input
            type="number"
            name="currentEpisode"
            value={form.currentEpisode}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit">Tambah List</Button>
      </form>
    </div>
  );
}
