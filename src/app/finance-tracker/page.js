"use client";

import useTransaction from "@/lib/useTransaction";
import { formatRupiah } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { transactions } = useTransaction();

  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalTransaction = transactions.length;

  return (
    <div className="pt-20 space-y-4">
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl">
            Selamat Datang di Finance Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            Kelola keuangan Anda dengan mudah dan efisien.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="secondary">
              <a href="/finance-tracker/transactions">Lihat Transaksi</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-blue-600 border-white bg-white"
            >
              <a href="/finance-tracker/add-transaction">Tambah Transaksi</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalTransaction}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Pemasukan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {formatRupiah(totalIncome)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {formatRupiah(totalExpense)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
