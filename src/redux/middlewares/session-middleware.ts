import { Session } from "src/core/models/sessions/types";
import store from "../store";

export class SessionMiddleware {
  public static attachTags = (sessions: Session[]) => {
    sessions.forEach((session) => {
      const sessionTagIds = session.tags as string[];
      const tags = store.getState().tags.tags;
      session.tags = tags.filter((tag) => sessionTagIds.includes(tag.id));
    });
  };
}
