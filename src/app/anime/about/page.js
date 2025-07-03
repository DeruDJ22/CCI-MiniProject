export default function About() {
  return (
    <div className="pt-20 max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-blue-600">Tentang Aplikasi</h1>
        <p className="text-gray-600">
          Aplikasi ini memanfaatkan <strong>Next.js</strong> untuk frontend dan{" "}
          <strong>Jikan API</strong> sebagai sumber data anime. Tujuannya adalah
          memberikan pengalaman eksplorasi anime yang simpel dan informatif.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border rounded-xl p-5 bg-white shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            🔍 Cari Anime
          </h2>
          <p className="text-gray-600">
            Temukan anime favoritmu dengan fitur pencarian yang cepat dan
            responsif.
          </p>
        </div>

        <div className="border rounded-xl p-5 bg-white shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            📈 Daftar Anime Terpopuler
          </h2>
          <p className="text-gray-600">
            Lihat daftar anime paling populer berdasarkan rating dan jumlah
            penonton.
          </p>
        </div>

        <div className="border rounded-xl p-5 bg-white shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            🎞️ Detail Lengkap
          </h2>
          <p className="text-gray-600">
            Dapatkan informasi lengkap seperti sinopsis, trailer, skor, dan
            jumlah episode.
          </p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 pt-6">
        Dibuat oleh <span className="font-medium text-black">KuroAkai</span> •
        Powered by Next.js & Jikan API
      </div>
    </div>
  );
}
