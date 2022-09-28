export const copyText = async (text: string): Promise<boolean> => {
  let success = false;
  if (!window || !navigator.clipboard) {
    console.log('copyText only works in browser!');
    return success;
  }

  try {
    await navigator.clipboard.writeText(text);
    success = true;
  } catch (error: any) {
    console.log('something went wrong when copy copyText');
    console.log(error?.message ?? error);
  }

  return success;
};

export default copyText;
