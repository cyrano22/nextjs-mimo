"use client";

import dynamic from 'next/dynamic';

// Importer dynamiquement les composants client pour éviter les erreurs de prérendu
const DashboardClient = dynamic(() => import('../../components/dashboard/DashboardClient'), {
  loading: () => <p>Chargement du tableau de bord...</p>
});

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      <DashboardClient />
    </div>
  );
}
