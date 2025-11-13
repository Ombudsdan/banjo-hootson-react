import { LoadingScreen } from 'components';
import { useLoadingScreen } from 'hooks';

export default function LoadingScreenOutlet() {
  const { isOpen: open, message } = useLoadingScreen();

  if (!open) return null;

  return <LoadingScreen text={message} isOpen={open} />;
}
