import { ReactNode } from "react";

export interface UIState {
    openSection: string | null;
    closeSection: string | null;
}

export const initialState: UIState = {
    openSection: null,
    closeSection: null
};
  
export type Action = 
| { type: 'SET_OPEN_SECTION', payload: string | null }
| { type: 'SET_CLOSE_SECTION', payload: string | null };

export interface UIProviderProps {
    children: ReactNode;
}