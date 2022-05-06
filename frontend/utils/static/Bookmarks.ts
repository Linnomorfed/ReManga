import { bookmarkIdEnum } from '../../models/IBookmarks';

export const bookmarkTypes = [
  { id: bookmarkIdEnum.READING, name: 'Reading' },
  { id: bookmarkIdEnum.WILL_READ, name: 'Will read' },
  { id: bookmarkIdEnum.READ, name: 'Read' },
  { id: bookmarkIdEnum.THROWN, name: 'Thrown' },
  { id: bookmarkIdEnum.NOT_INTERESTED, name: 'Not interesed' },
];
