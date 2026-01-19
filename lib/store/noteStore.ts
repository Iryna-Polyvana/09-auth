import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CreateNoteData } from '../api/clientApi';


const initialDraft: CreateNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteDraftStore = {
  draft: CreateNoteData;
  setDraft: (note: Partial<CreateNoteData>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,

      setDraft: note =>
        set(state => ({
          draft: {
            ...state.draft,
            ...note,
          },
        })),

      clearDraft: () =>
        set({
          draft: initialDraft,
        }),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
