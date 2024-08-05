import React, { useEffect, useState, useMemo } from 'react';
// import * as Realm from 'realm-web';
// import atlasConfig from './atlas-config';

// const createApp = () => {
//   const { appId, baseUrl } = atlasConfig;
//   return new Realm.App({ id: appId, baseUrl });
// };

const MainContext = React.createContext(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  // Store Realm.App in React state. If appId changes, all children will rerender and use the new App.
  // const [realmAapp, setRealmApp] = useState(createApp());
  // const [, setCurrentUser] = useState(realmAapp.currentUser);

  // useEffect(() => {
  //   (async () => {
  //     const app = createApp();
  //     await app.logIn(Realm.Credentials.anonymous());
  //     setRealmApp(app);
  //     setCurrentUser(app.currentUser);
  //   })();
  // }, []);

  // Wrap the base logIn function to save the logged in user in state
  // useCallback(
  //   async (credentials: Realm.Credentials<SimpleObject>) => {
  //     await realmAapp.logIn(Realm.Credentials.anonymous());
  //     setCurrentUser(realmAapp.currentUser);
  //   },
  //   [realmAapp],
  // );

  const appContext = useMemo(() => {
    return { hello: 'world' };
  }, []);

  return (
    <MainContext.Provider value={appContext}>{children}</MainContext.Provider>
  );
};
