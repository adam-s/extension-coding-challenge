export {};
declare global {
  export namespace chrome {
    namespace scripting {
      export type RunAt = 'document_start' | 'document_end' | 'document_idle';
      export interface RegisteredContentScript {
        id: string;
        allFrames?: boolean;
        css?: string[];
        excludeMatches?: string[];
        js?: string[];
        matches?: string[];
        persistAcrossSessions?: boolean;
        runAt?: RunAt;
      }
      function registerContentScripts(
        scripts: RegisteredContentScript[],
        callback?: () => void,
      ): void;
    }
  }
}
