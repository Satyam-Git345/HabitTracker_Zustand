import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useHabbitStore = create(
  devtools(
    persist(
      (set) => ({
        habbit: [],
        addHabit: (name, frequency) =>
          set((state) => ({
            habbit: [
              ...state.habbit,
              {
                id: Date.now().toString(),
                name,
                frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
            ],
          })),
        removeHabit: (id) =>
          set((state) => ({
            habbit: state.habbit.filter((habb) => id !== habb.id),
          })),
        toggleHabbit: (id, date) => {
          set((state) => ({
            habbit: state.habbit.map((habit) => {
              if (habit.id === id) {
                if (!habit.completedDates.includes(date)) {
                  return {
                    ...habit,
                    completedDates: [...habit.completedDates, date],
                  };
                }
              }
              return habit;
            }),
          }));
        },
      }),
      {
        name: "habits-local",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useHabbitStore;
