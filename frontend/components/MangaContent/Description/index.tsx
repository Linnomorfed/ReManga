import { OutputData } from '@editorjs/editorjs';
import classNames from 'classnames';
import React from 'react';
import { ResponseFilter } from '../../../models/IFilters';
import { ShowMoreButton } from '../../../ui-components';
import styles from './Desctiption.module.scss';

interface DescriptionProps {
  genres: ResponseFilter[];
  categories: ResponseFilter[];
  blocks: OutputData['blocks'];
}

export const Description: React.FC<DescriptionProps> = ({
  genres,
  categories,
  blocks,
}) => {
  const sortedArray = [...genres, ...categories];
  const sortedItems = sortedArray.sort((obj, obj2) =>
    obj.name.toLowerCase().localeCompare(obj2.name.toLowerCase())
  );

  const descriptionArray = blocks.map((obj) => obj.data.text);
  const description = descriptionArray.join();

  const [isShowMore, setIsShowMore] = React.useState(false);
  const [descriptionCheck, setDescriptionCheck] = React.useState(false);

  const toogleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  React.useEffect(() => {
    if (descriptionArray.length > 4 || description.length > 350) {
      setDescriptionCheck(true);
    }
  }, []);

  return (
    <>
      <div>
        {sortedItems.map((obj) => (
          <span key={obj.name} className={styles.genre}>
            {obj.name}
          </span>
        ))}
      </div>
      <div className={styles.description}>
        <div
          className={classNames(
            styles.descWrapper,
            `${isShowMore && styles.descWrapperFull}`
          )}>
          {blocks.map((obj) => (
            <p
              key={obj.id}
              dangerouslySetInnerHTML={{ __html: obj.data.text }}
            />
          ))}
        </div>
        {descriptionCheck && (
          <ShowMoreButton onClick={toogleShowMore} isShowMore={isShowMore} />
        )}
      </div>
    </>
  );
};
