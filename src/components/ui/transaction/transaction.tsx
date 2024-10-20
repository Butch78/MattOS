'use client';

import { useAuth } from '@clerk/nextjs';
import type { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { DataTable } from '@/components/ui/data-table';
import type { Transaction } from '@/models/Transaction';

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = await getToken();
        const res = await fetch('/api/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Transaction[] = await res.json();
        setTransactions(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [getToken]);

  const columns: ColumnDef<Transaction, keyof Transaction>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Location',
      accessorKey: 'location',
    },
    {
      header: 'Asking Price',
      accessorKey: 'askingPrice',
    },
    {
      header: 'Transaction Owner',
      accessorKey: 'transactionOwner',
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1>Transactions</h1>
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
