"use client";

import useTransaction from "@/lib/useTransaction";
import { formatRupiah } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#16a34a", "#dc2626"];

export default function Statistics() {
  const { transactions } = useTransaction();

  const income = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const data = [
    { name: "Pemasukan", value: income },
    { name: "Pengeluaran", value: expense },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatRupiah(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
