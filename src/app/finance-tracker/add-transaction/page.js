"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import useTransaction from "@/lib/useTransaction";
import { toast } from "sonner";
import { CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function AddTransaction() {
  const router = useRouter();
  const { addTransaction } = useTransaction();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "income",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (value) => {
    setForm({ ...form, type: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Judul tidak boleh kosong!");
      return;
    }

    if (Number(form.amount) <= 0 || isNaN(Number(form.amount))) {
      toast.error("Jumlah harus lebih dari 0!");
      return;
    }

    const newTransaction = {
      title: form.title,
      amount: Number(form.amount),
      type: form.type,
      date: form.date,
    };

    addTransaction(newTransaction);
    toast.success("Transaksi berhasil ditambahkan");
    router.push("/finance-tracker/transactions");
  };

  return (
    <div className="pt-20 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-bold mb-4">Menambah Transaksi</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Judul</Label>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Jumlah</Label>
              <Input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Tipe</Label>
              <Select value={form.type} onValueChange={handleSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Pemasukan</SelectItem>
                  <SelectItem value="expense">Pengeluaran</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tanggal</Label>
              <Input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit">Tambah transaksi</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
