import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Statistics() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-gray-600">
            Ringkasan pemasukan dan pengeluaran Anda bulan ini:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold">Pemasukan:</h2>
              <p className="text-green-600 text-xl font-bold">Rp 7.000.000</p>
            </div>
            <div>
              <h2 className="font-semibold">Pengeluaran:</h2>
              <p className="text-red-600 text-xl font-bold">Rp 2.500.000</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTitle>Coming Soon!</AlertTitle>
        <AlertDescription>
          Visualisasi data dan chart akan segera hadir.
        </AlertDescription>
      </Alert>
    </div>
  );
}
