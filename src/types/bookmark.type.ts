export interface Bookmark {
  id: string;
  title: string;
  url: string;
  image?: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UpdateBookmark {
  id: string;
  title?: string;
  image?: string;
  description?: string;
}
