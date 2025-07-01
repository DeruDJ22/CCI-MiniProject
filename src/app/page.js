import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1524492412937-4961f1b8d04e?auto=format&fit=crop&w=1600&q=80)",
      }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 max-w-4xl w-full">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-4xl text-center font-bold">
              Welcome to MultiApp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-center text-gray-700 text-lg">
              Pilih aplikasi yang ingin kamu buka:
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Button
                asChild
                variant="outline"
                className="w-full md:w-1/2 h-36 flex flex-col items-center justify-center gap-3 text-lg"
              >
                <a href="/finance-tracker">
                  <Image
                    src="/logo-finance.avif"
                    alt="Finance"
                    width={60}
                    height={60}
                  />
                  💰 Finance Tracker
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full md:w-1/2 h-36 flex flex-col items-center justify-center gap-3 text-lg"
              >
                <a href="/anime">
                  <Image
                    src="/logo-anime.jpg"
                    alt="Anime"
                    width={60}
                    height={60}
                  />
                  🎥 Anime Watchlist
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
