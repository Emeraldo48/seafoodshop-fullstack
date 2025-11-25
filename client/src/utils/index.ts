import {AxiosError} from "axios";

export const getErrorMessage = (e: unknown) => {
  try {
    console.log(e);
    if (typeof e === "string") {
      return e;
    } else if (e instanceof AxiosError) {
      if (e.response) {
        return e.response.data.message;
      } else {
        return e.message;
      }
    } else if (e instanceof Error) {
      return e.message;
    }
    return "Неизвестная ошибка"
  } catch (e) {
    return "Непредвиденная ошибка"
  }
}
