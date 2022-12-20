import { HasCreatedAt, HasId, HasName } from "../../common/types";

export interface Comment extends HasId, HasName, HasCreatedAt {
  comment: string;
}
