'user client';

import { Main } from '@dctjs/page-builder-ui';

export default async function Index() {
  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <main className="container mx-auto">
        <Main></Main>
      </main>
      {/* <footer className="sticky top-[100vh] h-[100px]">footer</footer> */}
    </div>
  );
}
