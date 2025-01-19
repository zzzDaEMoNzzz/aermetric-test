/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";

type ShowHandler<T> = [T] extends [void] ? () => void : (data: T) => void;

const argIsEvent = (data: any) => {
  if (!data) return false;
  switch (true) {
    case data instanceof Event:
    case "nativeEvent" in data && data.nativeEvent instanceof Event:
    case "domEvent" in data &&
      "nativeEvent" in data.domEvent &&
      data.domEvent.nativeEvent instanceof Event:
      return true;
    default:
      return false;
  }
};

export const useModalState = <DataType = void>() => {
  const [isVisible, setVisible] = useState(false);
  const [data, setData] = useState<DataType>();

  const show = useCallback<ShowHandler<DataType>>((modalData?: DataType) => {
    if (modalData) {
      switch (true) {
        case typeof modalData !== "object":
        case !argIsEvent(modalData):
          setData(modalData);
          break;
        default:
      }
    }
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
    setData(undefined);
  }, []);

  return {
    isVisible,
    show,
    hide,
    data,
  };
};
