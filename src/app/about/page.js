import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">About Finance Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          Finance Tracker adalah aplikasi sederhana untuk mencatat pemasukan dan pengeluaran Anda secara praktis.
        </p>

        <Separator />

        <div>
          <h2 className="font-semibold mb-2">Fitur Utama:</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Mencatat pemasukan dan pengeluaran dengan mudah</li>
            <li>Melihat riwayat transaksi</li>
            <li>Antarmuka yang simpel dan responsive</li>
          </ul>
        </div>

        <Separator />

        <p className="text-sm text-gray-500">
          Dibuat dengan Next.js, TailwindCSS, dan Shadcn UI. 🚀
        </p>
      </CardContent>
    </Card>
  );
}
