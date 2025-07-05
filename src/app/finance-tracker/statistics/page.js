"use client";

import { useEffect, useState } from "react";
import useTransaction from "@/lib/useTransaction";
import { formatRupiah } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const COLORS = ["#16a34a", "#dc2626"];

export default function Statistics() {
  const { transactions } = useTransaction();
  const [filter, setFilter] = useState("all");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const now = new Date();
    let data = transactions;

    if (filter === "today") {
      data = transactions.filter(
        (tx) => new Date(tx.date).toDateString() === now.toDateString()
      );
    } else if (filter === "month") {
      data = transactions.filter(
        (tx) =>
          new Date(tx.date).getMonth() === now.getMonth() &&
          new Date(tx.date).getFullYear() === now.getFullYear()
      );
    }

    setFilteredData(data);
  }, [filter, transactions]);

  const income = filteredData
    .filter((tx) => tx.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = filteredData
    .filter((tx) => tx.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const data = [
    { name: "Pemasukan", value: income },
    { name: "Pengeluaran", value: expense },
  ];

  return (
    <div className="pt-20 space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <CardHeader>
          <CardTitle className="text-2xl">Statistics</CardTitle>
        </CardHeader>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter Waktu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Waktu</SelectItem>
            <SelectItem value="today">Hari Ini</SelectItem>
            <SelectItem value="month">Bulan Ini</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent>
          <motion.div
            className="h-[300px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatRupiah(value)} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div>
              <h2 className="font-semibold">Pemasukan:</h2>
              <p className="text-green-600 text-xl font-bold">
                {formatRupiah(income)}
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Pengeluaran:</h2>
              <p className="text-red-600 text-xl font-bold">
                {formatRupiah(expense)}
              </p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
