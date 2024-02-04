import tsconfigPaths from "vite-tsconfig-paths";
import {
  configDefaults,
  defineConfig,
  mergeConfig,
  type UserConfig,
} from "vitest/config";
import viteConfig from "./vite.config";

const config: any = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      ...configDefaults,
    },
    plugins: [tsconfigPaths()],
  }) as UserConfig
);

export default config;
