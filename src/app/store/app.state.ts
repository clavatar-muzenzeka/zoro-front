import { ActionReducerMap } from "@ngrx/store";
import { userReducer, UserState } from "../user/store/user.reducer";

export interface AppState{
    //user: UserState
}

export const appReducer: ActionReducerMap<AppState> = {
    //userState: userReducer
}