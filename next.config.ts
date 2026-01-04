import type { NextConfig } from 'next';
import './src/env/env.client';
import './src/env/env.server';

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default nextConfig;
