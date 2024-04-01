import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {
    AntDesignVueResolver,
    ElementPlusResolver,
    VantResolver
} from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        VueDevTools(),
        AutoImport({
            // targets to transform
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
            imports: [
                // presets
                'vue',
                'vue-router',
                'pinia',
                {
                    '@vueuse/core': ['useMouse'],
                    axios: [
                        // default imports
                        ['default', 'axios'] // import { default as axios } from 'axios',
                    ]
                },
                {
                    from: 'vue-router',
                    imports: ['RouteLocationRaw'],
                    type: true
                }
            ],

            // Enable auto import by filename for default module exports under directories
            defaultExportByFilename: false,
            dirs: [
                // './hooks',
                // './composables' // only root modules
                // './composables/**', // all nested modules
                // ...
            ],
            dts: './auto-imports.d.ts',
            ignoreDts: ['ignoredFunction', /^ignore_/],
            vueTemplate: true,
            resolvers: [],
            injectAtEnd: true
        }),
        Components({
            resolvers: [AntDesignVueResolver({ importStyle: 'less' }), ElementPlusResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
