/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  root?: HTMLElement;
  children: React.ReactNode;
};
export function Portal({ children, root }: Props) {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined' || !mounted) return null;

  return mounted ? createPortal(children, root || document.body) : null;
}
