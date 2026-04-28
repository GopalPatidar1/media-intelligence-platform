export const useMessage = () => {
  const message = useState<string | null>('global-message', () => null);
  const type = useState<'success' | 'error'>('message-type', () => 'success');

  const showMessage = (
    msg: string,
    msgType: 'success' | 'error' = 'success'
  ) => {
    message.value = msg;
    type.value = msgType;
    setTimeout(() => {
      message.value = null;
    }, 3000);
  };

  return { message, type, showMessage };
};
