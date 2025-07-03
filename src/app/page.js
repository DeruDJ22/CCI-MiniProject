import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1524492412937-4961f1b8d04e?auto=format&fit=crop&w=1600&q=80)", }}>
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-5xl">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-5xl text-center font-extrabold">
              Welcome to <span className="text-blue-600">MultiApp</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-center text-gray-700 text-xl">
              Pilih aplikasi yang ingin kamu buka
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
              <Button asChild variant="outline" className="h-36 flex flex-col items-center justify-center gap-3 text-xl border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                <a href="/finance-tracker">
                  <Image src="/logo-finance.avif" alt="Finance" width={60} height={60}/>
                  <span className="font-semibold">💰 Finance Tracker</span>
                </a>
              </Button>

              <Button asChild variant="outline" className="h-36 flex flex-col items-center justify-center gap-3 text-xl border-2 border-pink-600 hover:bg-pink-600 hover:text-white transition-all">
                <a href="/anime">
                  <Image src="/logo-anime.jpg" alt="Anime" width={60} height={60}/>
                  <span className="font-semibold">🎥 Anime List</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
