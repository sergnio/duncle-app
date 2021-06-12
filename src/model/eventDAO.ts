import event from "./event";

export default interface eventDAO extends event {
  _id: string;
  _rev: string;
}
