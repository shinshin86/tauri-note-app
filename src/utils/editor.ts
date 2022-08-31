type Content = {
  title: string;
  text: string;
};

const isChanged = (content: Content, prevContent: Content): boolean => {
  if (content.title !== prevContent.title) return true;

  if (content.text !== prevContent.text) return true;

  return false;
};

export { isChanged };
