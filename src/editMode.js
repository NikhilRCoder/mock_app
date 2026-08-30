import { createContext, useContext } from "react";

// Global on/off switch for every inline-edit affordance (logo upload badges,
// profile field pencils). Off = the app looks exactly like a plain viewer.
export const EditModeContext = createContext({ editMode: false, setEditMode: () => {} });

export function useEditMode() {
  return useContext(EditModeContext);
}
