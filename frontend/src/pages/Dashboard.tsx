import { useEffect, useState } from 'react';
import { api } from '../lib/api';

type Request = {
  id: number;
  name: string;
  city: string;
  status: string;
  eta: string | null;
  createdAt: string;
};

export default function Dashboard() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    api.get('/requests').then(res => setRequests(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🛫 Mazda Airlines Requests</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">ETA</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r.id}>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.city}</td>
              <td className="border p-2">{r.status}</td>
              <td className="border p-2">{r.eta ?? 'N/A'}</td>
              <td className="border p-2">{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
