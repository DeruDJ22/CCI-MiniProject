"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Anime WatchList</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-600">Kelola daftar anime yang kamu tonton atau yang sudah selesai</p>
                    <div className="flex gap-4">
                        <Button asChild>
                            <a href="/anime/list">Lihat daftar anime</a>
                        </Button>
                        <Button asChild variant="outline">
                            <a href="/anime/add">Tambah anime</a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

}