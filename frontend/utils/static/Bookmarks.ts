import { bookmarkIdEnum } from '../../models/IBookmarks';

export const BookmarkTypes = [
  { id: bookmarkIdEnum.READING, name: 'Reading' },
  { id: bookmarkIdEnum.WILL_READ, name: 'Will read' },
  { id: bookmarkIdEnum.READ, name: 'Read' },
  { id: bookmarkIdEnum.POSTPONED, name: 'Postponed' },
  { id: bookmarkIdEnum.THROWN, name: 'Thrown' },
  { id: bookmarkIdEnum.NOT_INTERESTED, name: 'Not interesed' },
];

export const BookmarkTypesExisted = [
  ...BookmarkTypes,
  { id: -1, name: 'Remove from bookmarks' },
];
