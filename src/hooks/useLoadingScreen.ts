import { useContext } from 'react';
import { LoadingScreenContext } from 'hooks';

export default function useLoadingScreen() {
  const context = useContext(LoadingScreenContext);
  if (!context) throw new Error('useLoadingScreen must be used within LoadingScreenProvider');
  return context;
}
