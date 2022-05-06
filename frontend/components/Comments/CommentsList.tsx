import React from 'react';
import { ResponceCommentItem } from '../../models/IComments';
import { BlueBtn, Dropdown } from '../UI';
import CommentElement from './CommentElement';
import styles from './Comments.module.scss';

const sortBy = [
  { id: 1, name: 'Interesting first' },
  { id: 2, name: 'New ones first' },
  { id: 3, name: 'Old ones first' },
];
interface CommentsListProps {
  comments: ResponceCommentItem[];
  pinnedComment: ResponceCommentItem | null;
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  pinnedComment,
}) => {
  return (
    <div className={styles.commentsList}>
      <Dropdown type='sortBy' title='New one first' items={sortBy} />

      {pinnedComment && (
        <CommentElement
          isSpoiler={false}
          votes={pinnedComment.votes}
          user={pinnedComment.user}
          repliesCount={pinnedComment.replies_count}
          body={pinnedComment.text}
          date={pinnedComment.createdAt}
          commentId={pinnedComment.id}
          mangaId={pinnedComment.mangaId}
          isPinned={true}
        />
      )}

      {comments.map((obj) => (
        <CommentElement
          key={obj.id}
          repliesCount={obj.replies_count}
          isSpoiler={obj.spoiler}
          votes={obj.votes}
          user={obj.user}
          body={obj.text}
          mangaId={obj.mangaId}
          commentId={obj.id}
          date={obj.createdAt}
        />
      ))}

      {/* <CommentElement
        isPinned={true}
        votes={772}
        body='Guys, please follow the rules: Be polite in the comments, and put spoilers. FOR SPOILERS ARE VERY HARD!!! '
      />

      <CommentElement
        votes={2}
        body='God, how have I not received such sensations from reading a manhwa in a long time! Now there is only one thought in my head: "ERASE MY MEMORY TO READ AND EXPERIENCE ALL THESE FEELINGS FIRST! 🌸 I dont like the ending, for some reason everyone strives to make a happy happy ending, and gg is always so super sacrificial.'
      />

      <CommentElement
        votes={0}
        body='So, Wednesday evening ... Like many readers of this manhwa, I took a cold juice with cookies and thought, today is a special day, a day when'
      />

      <CommentElement
        isSpoiler={true}
        votes={-5}
        body='All who are waiting for the chapter, put the likes! Lets show the Arctic how many of us there are! For the NPC! For the Lake! For the Alliance! For the MONOLITH!'
      />

      <CommentElement
        votes={-6}
        body='The worst anime Ive ever seen I would do better a hundred times redo bitch'
      />

      <CommentElement
        isSpoiler={true}
        votes={-23}
        body='😃👍Give diz, lard luvenling porash for mentally fast dygroids 🙃stupid shit stupid shit for juvenile debils'
      />

      <CommentElement
        votes={-12}
        body='Atrophied brains who suck on other peoples bibs. Rated -10/10, uuuu ska moronic, stupid and not interesting manhwa. The worst anime Ive ever seen I would do better a hundred times redo bitch. The worst anime Ive ever seen.'
      /> */}

      <BlueBtn size='sm'>Show Next Comments</BlueBtn>
    </div>
  );
};

export default CommentsList;
