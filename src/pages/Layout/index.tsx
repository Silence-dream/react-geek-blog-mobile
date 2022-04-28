import { useSelector } from 'react-redux';

import { RootState } from '@/types/store';

export default function Layout() {
  let state = useSelector((state: RootState) => state);
  console.log(state);
  return (
    <>
      <h1>Layout</h1>
    </>
  );
}
