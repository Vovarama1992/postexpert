import { create } from 'zustand';
import Lenis from '@studio-freight/lenis';

interface LenisStore {
    lenis: Lenis | null;
    initializeLenis: (container: HTMLElement) => void;
    startLenis: () => void;
    pauseLenis: () => void;
    resumeLenis: () => void;
    stopLenis: () => void;
}

const useLenisStore = create<LenisStore>((set) => ({
    lenis: null,

    initializeLenis: (container: HTMLElement) => {
        const lenis = new Lenis({
            wrapper: container,
            // @ts-ignore
            content: container.querySelector('.lenis-content'), // предполагаем, что основной контент страницы находится в контейнере с этим классом
            smoothWheel: true,
            smoothTouch: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        set({ lenis });

        return () => {
            lenis.destroy();
        };
    },

    startLenis: () => {
        set((state) => {
            if (state.lenis) {
                state.lenis.start();
            }
            return {};
        });
    },

    pauseLenis: () => {
        set((state) => {
            if (state.lenis) {
                state.lenis.stop();
            }
            return {};
        });
    },

    resumeLenis: () => {
        set((state) => {
            if (state.lenis) {
                state.lenis.start();
            }
            return {};
        });
    },

    stopLenis: () => {
        set((state) => {
            if (state.lenis) {
                state.lenis.destroy();
                set({ lenis: null });
            }
            return {};
        });
    }
}));

export default useLenisStore;