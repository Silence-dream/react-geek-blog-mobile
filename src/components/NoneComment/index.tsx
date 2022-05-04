import noComment from '@/assets/none.png';

import styles from './index.module.scss';

const NoneComment = () => {
  return (
    <div className={styles.root}>
      <img src={noComment} alt="" />
      <p className="no-comment">还没有人评论哦</p>
    </div>
  );
};

export default NoneComment;
