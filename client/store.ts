import { createStore } from "redux";
import { useState, useEffect, useRef } from "react";
import { isEqual } from "lodash";
import { MutableDB, reducer, DataTable, DB } from "redux-database";
import { Room } from "../common/room";
import EJSON from "ejson";
import { guid } from "../common/util";

export interface State {
  settings: {
    accountId: string;
  };
  data: {
    rooms: DataTable<Room>;
  };
}

const emptyTable = {
  byId: {},
  ids: [],
};

const localStorageVersion = "v1";
const settingsKey = `settings-quickvote-${localStorageVersion}`;

const storedData =
  sessionStorage.getItem(settingsKey) || localStorage.getItem(settingsKey);

const savedSettings = (storedData && EJSON.parse(storedData)) || undefined;

const initialState: State = {
  settings: {
    accountId: guid(),
    ...savedSettings,
  },
  data: {
    rooms: emptyTable,
  },
};

export const store = createStore(
  reducer(initialState),
  initialState,
  // eslint-disable-next-line
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    // eslint-disable-next-line
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  const settings = EJSON.stringify(store.getState().settings);
  localStorage.setItem(settingsKey, settings);
});

export const writeDB = new MutableDB(initialState, { store });
// eslint-disable-next-line
(window as any).writeDB = writeDB;

export function useForceUpdate(): () => void {
  const [, updateState] = useState(true);
  return () => {
    updateState((state) => !state);
  };
}

export function useData<T>(query: (db: DB<State>) => T): T {
  const db = new DB(store.getState());
  const forceUpdate = useForceUpdate();
  const stateRef = useRef(query(db));
  const queryRef = useRef(query);
  queryRef.current = query;
  function updateData(): void {
    const db = new DB(store.getState());
    const queryResult = queryRef.current(db);
    const hasChanged = !isEqual(stateRef.current, queryResult);
    if (hasChanged) {
      stateRef.current = queryResult;
      forceUpdate();
    }
  }

  useEffect(() => {
    updateData();
  }, [query]);

  useEffect(() => {
    const unsubscribe = store.subscribe(updateData);
    return unsubscribe;
  }, []);
  return stateRef.current;
}
