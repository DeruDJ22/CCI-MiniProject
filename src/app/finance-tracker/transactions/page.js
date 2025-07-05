"use client";

import { useEffect, useState } from "react";
import { formatRupiah } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(saved);
  }, []);

  const saveToLocal = (data) => {
    localStorage.setItem("transactions", JSON.stringify(data));
  };

  const deleteTransaction = (id) => {
    const updated = transactions.filter((tx) => tx.id !== id);
    setTransactions(updated);
    saveToLocal(updated);
    toast.success("Transaksi berhasil dihapus");
  };

  const updateTransaction = (id, data) => {
    const updated = transactions.map((tx) =>
      tx.id === id ? { ...tx, ...data } : tx
    );
    setTransactions(updated);
    saveToLocal(updated);
    toast.success("Transaksi berhasil diperbarui");
  };

  const handleEdit = (id, amount) => {
    setEditId(id);
    setEditAmount(amount);
  };

  const saveEdit = (id) => {
    updateTransaction(id, { amount: Number(editAmount) });
    setEditId(null);
    setEditAmount("");
  };

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((tx) => tx.type === filter);

  return (
    <div className="pt-20 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Transaksi</h1>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="income">Pemasukan</SelectItem>
            <SelectItem value="expense">Pengeluaran</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500">Belum ada transaksi</p>
      ) : (
        <ul className="space-y-4">
          {filteredTransactions.map((tx) => (
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
                <div className="flex gap-2">
                  {editId === tx.id ? (
                    <>
                      <Input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="w-24"
                      />
                      <Button onClick={() => saveEdit(tx.id)}>Simpan</Button>
                      <Button
                        variant="secondary"
                        onClick={() => setEditId(null)}
                      >
                        Batal
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleEdit(tx.id, tx.amount)}>
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Hapus</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogTitle>Yakin mau hapus?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Aksi ini tidak bisa dibatalkan.
                          </AlertDialogDescription>
                          <div className="flex justify-end gap-2">
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteTransaction(tx.id)}
                            >
                              Hapus
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </ul>
      )}
      <Link
        href="/finance-tracker/add-transaction"
        className="fixed bottom-6 right-6 sm:hidden"
      >
        <Button className="rounded-full w-14 h-14 text-xl shadow-lg">+</Button>
      </Link>
    </div>
  );
}
