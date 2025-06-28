"use client";

import { useEffect, useState } from "react";
import { formatRupiah } from "../../lib/utils";
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
import { AlertCircle } from "lucide-react";

export default function Transaction() {
  const [transaction, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data.json");
      const data = await res.json();
      setTransactions(data);
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    const newData = transaction.filter((tx) => tx.id !== id);
    setTransactions(newData);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Transaksi</h1>
      {transaction.length === 0 ? (
        <p className="text-gray-500">Belum ada transaksi</p>
      ) : (
        <ul className="space-y-4">
          {transaction.map((tx) => (
            <Card key={tx.id}>
              <CardHeader>
                <CardTitle>{tx.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div>
                  <p
                    className={
                      tx.type === "income" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {formatRupiah(tx.amount)} ({tx.type})
                  </p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Hapus</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>
                      Yakin mau hapus transaksi?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Aksi ini tidak bisa dibatalkan. Transaksi akan dihapus
                      dari daftar.
                    </AlertDialogDescription>
                    <div className="flex justify-end gap-2">
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(tx.id)}>
                        Hapus
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
