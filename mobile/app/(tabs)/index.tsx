import { initializeDatabase } from "@/src/database/initializeDatabase";
import AppNavigation from "@/src/routes";
import { SQLiteProvider } from "expo-sqlite";
import React from "react";
import { AuthProvider } from "@/src/contexts/auth";
import { VagasContext, VagasProvider } from "@/src/contexts/vagasContext";

export default function App() {
  return (
    <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <AuthProvider>
        <VagasProvider>
          <AppNavigation />
        </VagasProvider>
      </AuthProvider>
    </SQLiteProvider>
  );
}
