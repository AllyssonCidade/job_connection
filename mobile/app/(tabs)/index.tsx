import AppNavigation from "@/src/routes";
import React from "react";
import { AuthProvider } from "@/src/contexts/auth";
import { VagasProvider } from "@/src/contexts/vagasContext";
import { UsersProvider } from "@/src/contexts/userContext";

export default function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <VagasProvider>
          <AppNavigation />
        </VagasProvider>
      </UsersProvider>
    </AuthProvider>
  );
}
