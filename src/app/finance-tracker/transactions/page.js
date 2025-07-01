"use client";

import useTransaction from "@/lib/useTransaction";
import { formatRupiah } from "@/lib/utils";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
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

export default function Transaction() {
  const { transactions, deleteTransaction, updateTransaction } = useTransaction();
  const [editId, setEditId] = useState(null);
  const [editAmount, setEditAmount] = useState("");

  const handleEdit = (id, amount) => {
    setEditId(id);
    setEditAmount(amount);
  };

  const saveEdit = (id) => {
    updateTransaction(id, { amount: Number(editAmount) });
    setEditId(null);
    setEditAmount("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Transaksi</h1>
      {transactions.length === 0 ? (
        <p className="text-gray-500">Belum ada transaksi</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((tx) => (
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
                      <Button variant="secondary" onClick={() => setEditId(null)}>
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
                            <AlertDialogAction onClick={() => deleteTransaction(tx.id)}>
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
    </div>
  );
}
  