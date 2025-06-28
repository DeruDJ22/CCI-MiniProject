'use client';

import { useEffect, useState } from "react";
import { formatRupiah } from "../../lib/utils";

export default function Transaction() {
    const [transaction, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const res = await fetch('/data.json');
            const data = await res.json();
            setTransactions(data);
        };
        fetchData();
    }, []);

    const handleDelete = (id) => {
        const confirm = window.confirm('Yakin akan menghapus transaksi?');
        if(confirm) {
            const newData = transaction.filter((tx) => tx.id !== id);
            setTransactions(newData);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Transalsi</h1>
            {transaction.length === 0 ? (
                <p className="text-gray-500">Belum ada transaksi</p>
            ) : (
                <ul className="space-y-2">
                    {transaction.map((tx) => (
                        <li key={tx.id} className="p-4 border rounded shadow flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{tx.title}</h3>
                                <p className="text-sm text-gray-500">{tx.date}</p>
                                <p className={tx.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                                    {formatRupiah(tx.amount)} ({tx.type})
                                </p>
                            </div>
                            <button onClick={() => handleDelete(tx.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                Hapus
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}