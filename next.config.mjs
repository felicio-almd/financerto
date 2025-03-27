import withPWA from '@ducanh2912/next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suas configurações do Next.js aqui
  reactStrictMode: true,
  // Outras configurações...
};

const pwaConfig = withPWA({
  dest: 'public',
  disable: false, // Desativa em desenvolvimento
  register: true,
  skipWaiting: true,
  // workboxOptions: { // Opcional: configurações avançadas do Workbox
  //   disableDevLogs: true,
  // }
});

export default pwaConfig(nextConfig);