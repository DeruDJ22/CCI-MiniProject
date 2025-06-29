'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useTransaction from "@/lib/useTransaction";

export default function AddTransaction() {
    const router = useRouter();
    const { addTransaction } = useTransaction();

    const [form, setForm] = useState({
        title: '',
        amount: '',
        type: 'income',
        date: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelect = (value) => {
        setForm({ ...form, type: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTransaction = {
            title: form.title,
            amount: Number(form.amount),
            type: form.type,
            date: form.date,
        };

        addTransaction(newTransaction);

        alert('Transaksi berhasil ditambahkan');
        router.push('/transactions');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Menambah Transaksi</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label>Judul</Label>
                    <Input type="text" name="title" placeholder="title"
                        value={form.title} onChange={handleChange} required />
                </div>

                <div>
                    <Label>Jumlah</Label>
                    <Input type="number" name="amount" placeholder="Amount"
                        value={form.amount} onChange={handleChange} required />
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
                    <Input type="date" name="date" value={form.date} onChange={handleChange} required />
                </div>

                <Button type="submit">Tambah transaksi</Button>
            </form>
        </div>
    );
}
