export interface Note {
    id: number;
    userId: string;
    title: string;
    content: string;
    tags: string[];
    attachments: Attachment[];
    aiSuggestions: string[];
    aiSummary?: string | null;
    isDeleted: boolean;
    isArchived: boolean;
    isPinned: boolean;
    updatedAt: Date;
    createdAt: Date;
    label?: Label | null;
    labelId?: number | null;
  }

  export interface Attachment {
    id: number;
    noteId: number;
    fileName: string;
    fileUrl: string;
    fileType: string;
    note: Note;
    updatedAt: Date;
    createdAt: Date;
  }

  export interface Label {
    id: number;
    userId: string;
    name: string;
    notes: Note[];
    updatedAt: Date;
    createdAt: Date;
  }
  