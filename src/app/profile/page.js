"use client"

import ProfileClient from "../../components/profile/ProfileClient";

export default function ProfilePage() {
  // Cette page est un composant serveur qui charge le composant client
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Profil Utilisateur</h1>
      <ProfileClient />
    </div>
  );
}
