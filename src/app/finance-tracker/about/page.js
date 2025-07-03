import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "../components/ui/separator";

export default function About() {
  return (
    <div className="pt-20 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Tentang Aplikasi Finance Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Finance Tracker adalah aplikasi untuk mencatat pemasukan dan
            pengeluaran sehari-hari secara efisien. Dibuat menggunakan{" "}
            <strong>Next.js</strong> dan <strong>TailwindCSS</strong> tanpa
            database eksternal.
          </p>

          <Separator />

          <div>
            <h2 className="font-semibold mb-2">Fitur Unggulan:</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Mencatat pemasukan dan pengeluaran dengan cepat</li>
              <li>Edit dan hapus transaksi dengan mudah</li>
              <li>Visualisasi data dalam bentuk grafik</li>
              <li>Data tersimpan secara lokal di browser</li>
              <li>Mobile-friendly dan ringan</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
