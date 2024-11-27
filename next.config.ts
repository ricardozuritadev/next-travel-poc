import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    // Activa "resolve-url-loader" para resolver rutas relativas
    includePaths: ["./src/app/_styles"],
  },
  webpack(config) {
    // Configuración adicional si es necesaria
    return config;
  },
};


export default nextConfig;
