export interface Item {
  id: string;
  name: string;
  category: string;
  initials: string;
  color: string;
  badge: string;
  timestamp: string;
}

export interface UncontrolledInputMap {
  [key: string]: string; // key is DOM node index (for index tracking) or item id (for identity tracking)
}

export interface MutationLog {
  id: string;
  timestamp: string;
  action: string;
  description: string;
  type: 'prepend' | 'shuffle' | 'append' | 'remove' | 'reset' | 'input';
  impactIndexTrack: string;
  impactIdTrack: string;
}

export type ActiveTab = 'interactive-demo' | 'angular-code' | 'dom-reconciliation' | 'migration-guide';
