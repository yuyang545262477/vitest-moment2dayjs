import {defineConfig} from 'vitest/config'


export default defineConfig({
    test: {
        environment: 'happy-dom',
        globals: true,
        deps: {
            interopDefault: true,
            experimentalOptimizer: {
                web: {
                    enabled: true
                }
            }
        },
        reporters: ['html']
    },
});
