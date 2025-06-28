'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTransaction() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        amount: '',
        type: 'income',
        date: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Transaksi berhasil ditambahkan');
        router.push('/transactions');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Menambah Transalsi</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md:">
                <input type="text" name="title" placeholder="title" value={form.title} onChange={handleChange} required className=" w-full border p-2 rounded"/>
                <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required className="w-full border p-2 rounded"/>
                <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2 rounded">
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full border p-2 rounded"/>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Tambah</button>
            </form>
        </div>
    );
}