export default interface Territory {
  _id: string;
  _rev: string;
  repId: string;
  name: string;
}

export interface NewTerritory {
  name: string;
  repId: string;
}
