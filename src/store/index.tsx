import { DashboardEntry, View } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MyState {
  data: Record<string, DashboardEntry>;
  createOrUpdateDashboardEntry: (values: DashboardEntry) => void;
  setPages: (pages: Record<string, DashboardEntry>) => void;
  getPageData: (title: string) => DashboardEntry;
  getComponentText: (title: string, component: string) => string | undefined;
  getImageSrc: (title: string, component: string) => string | undefined;
  setComponentText: (title: string, component: string, value: string) => void;
  setComponentImage: (title: string, component: string, value: string) => void;
  setComponentData: (
    title: string,
    newPlacement: string[],
    newView: Record<string, View>
  ) => void;
  setComponentView: (title: string, newView: Record<string, View>) => void;
  setComponentPlacement: (title: string, newPlacement: string[]) => void;
  setPageStatus: (title: string) => void;
}

export const usePages = create<MyState>()(
  persist(
    (set, get) => ({
      data: {},
      createOrUpdateDashboardEntry: (values) => {
        set((state) => ({
          data: {
            ...state.data,
            [values.title]: values,
          },
        }));
      },
      setPages: (pages) => {
        set(() => ({
          data: {
            ...pages,
          },
        }));
      },
      getPageData: (title) => get().data[title],
      getComponentText: (title, component) => {
        if (get().data[title]?.view?.[component]?.type !== "image")
          return get().data[title]?.view?.[component]?.text;
      },
      getImageSrc: (title, component) => {
        if (get().data[title]?.view?.[component]?.type !== "textBlock")
          return get().data[title]?.view?.[component]?.src;
      },
      // @todo, try out immer to make this readable
      setComponentText: (title, component, value) => {
        set((state) => ({
          data: {
            ...state.data,
            [title]: {
              ...state.data[title],
              view: {
                ...state.data[title].view,
                [component]: {
                  ...state.data[title].view[component],
                  text: value,
                },
              },
            },
          },
        }));
      },
      setComponentImage: (title, component, value) => {
        set((state) => ({
          data: {
            ...state.data,
            [title]: {
              ...state.data[title],
              view: {
                ...state.data[title].view,
                [component]: {
                  ...state.data[title].view[component],
                  src: value,
                },
              },
            },
          },
        }));
      },
      setComponentData: (title, newPlacement, newView) => {
        set((state) => ({
          data: {
            ...state.data,
            [title]: {
              ...state.data[title],
              view: newView,
              placement: newPlacement,
            },
          },
        }));
      },
      setComponentView: (title, newView) => {
        set((state) => ({
          data: {
            ...state.data,
            [title]: {
              ...state.data[title],
              view: newView,
            },
          },
        }));
      },
      setComponentPlacement: (title, newPlacement) => {
        set((state) => ({
          data: {
            ...state.data,
            [title]: {
              ...state.data[title],
              placement: newPlacement,
            },
          },
        }));
      },
      setPageStatus: (title) => {
        set((state) => ({
          data: {
            ...state.data,
            [title]: {
              ...state.data[title],
              isPublished: true,
            },
          },
        }));
      },
    }),
    {
      name: "dashboard",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
