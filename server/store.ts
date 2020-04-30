import { MutableDB, DataTable } from "redux-database";
import { Room } from "../common/room";
import { User } from "./user";

export interface State {
  settings: {};
  data: {
    rooms: DataTable<Room>;
    users: DataTable<User>;
  };
}

const emptyTable = {
  byId: {},
  ids: [],
};

const initialState: State = {
  settings: {},
  data: {
    rooms: emptyTable,
    users: emptyTable,
  },
};

export const writeDB = new MutableDB(initialState);
