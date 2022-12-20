import { FirebaseSdk } from "src/core/api";
import { Entites } from "src/core/common/types";
import { NotificationModel } from "src/core/models/notification";
import { NotificationArgs } from "src/core/models/notification/types";
import { Project } from "src/core/models/projects/types";

export type EntityTypes =
  | `${Entites.Projects}`
  | `${Entites.Blogs}`
  | `${Entites.Sessions}`;

export interface HasViewsAndId {
  views?: number;
  id?: string;
  name?: string;
  imageUrl?: string;
}

export class FirebaseHelper<T extends HasViewsAndId> {
  public static visitor = "visitor";
  constructor(private type: EntityTypes) {}

  public async increaseViews(id: string): Promise<void> {
    const entity: T = await FirebaseSdk.database(this.type).sync(id);
    const views = entity.views + 1;
    entity.views += 1;
    entity.id = id;
    await FirebaseSdk.database<T>(this.type).updateChild(id, "views", views);
    this.generateViewNotification(entity, views);
  }

  private generateViewNotification(entity: T, v: number): void {
    const { id, views, name } = entity;
    const notification: NotificationArgs = {
      entity: this.type as Entites,
      entityName: name,
      entityId: id,
      totalViews: v,
      imageUrl: entity.imageUrl
    };
    NotificationModel.generateViewNotification(notification);
  }

  static sendMessage = (name: string, email: string, message: string) => {
    FirebaseSdk.database(Entites.Contact).create({
      name,
      email,
      message,
      seen: false,
      createdAt: new Date().toISOString()
    });
  };

  public static createVisitor = async () => {
    const hasVisited = localStorage.getItem(this.visitor);

    if (!hasVisited) {
      const req = await fetch("http://ip-api.com/json");
      const res = await req.json();
      if (res) {
        const { city, country, query } = res;
        FirebaseSdk.database(this.visitor).create({
          date: new Date().toISOString(),
          ip: query,
          country,
          city
        });
        localStorage.setItem(this.visitor, "true");
      }
    }
  };

  public static fetchYoutubeVideoContent = async() => {
    const content = await FirebaseSdk.database('session-video').syncEntity();
    return content;
  } 
}
