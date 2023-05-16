import moment from "moment";

export const getDatetimeJp = (datetime: string) => {
  return moment(datetime).format("YYYY年MM月DD日 HH:mm:ss");
};
