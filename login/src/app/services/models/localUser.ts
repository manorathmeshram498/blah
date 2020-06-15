export interface ILocalUser {
    uid: string;
    displayName: string;
    email: string | null;
}

export class LocalUser implements ILocalUser {
    public levelsCurrent: Array<string>;
    public levelsRequested: Array<string>;
    public uid: string;
    public displayName: string;
    email: string | null;
    constructor(localUser) {
      this.levelsCurrent = localUser.levelsCurrent;
      this.levelsRequested = localUser.levelsRequested;
      this.uid = localUser.uid;
      this.displayName = localUser.displayName;
    }
}
