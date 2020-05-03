export const loadState = (item: string) => {
  try {
    const serializedState = localStorage.getItem(item);
    if (serializedState === null) {
      return undefined;
    }

    const parsedState = JSON.parse(serializedState);
    return parsedState;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (item: string, value: object) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(item, serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
