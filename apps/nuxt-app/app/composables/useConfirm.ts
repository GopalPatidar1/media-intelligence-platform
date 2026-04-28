export const useConfirm = () => {
  const isOpen = useState<boolean>('confirm-open', () => false);
  const title = useState<string>('confirm-title', () => '');
  const message = useState<string>('confirm-message', () => '');
  const resolveFn = useState<((value: boolean) => void) | null>(
    'confirm-resolve',
    () => null
  );

  const confirm = (options: {
    title?: string;
    message: string;
  }): Promise<boolean> => {
    title.value = options.title || 'Confirm Action';
    message.value = options.message;
    isOpen.value = true;

    return new Promise((resolve) => {
      resolveFn.value = resolve;
    });
  };

  const accept = () => {
    isOpen.value = false;
    resolveFn.value?.(true);
  };

  const cancel = () => {
    isOpen.value = false;
    resolveFn.value?.(false);
  };

  return { isOpen, title, message, confirm, accept, cancel };
};
