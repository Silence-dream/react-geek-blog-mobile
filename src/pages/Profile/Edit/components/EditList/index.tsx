import styles from './index.module.scss';

// 准备性别和头像的列表数据
const genderList = [
  { text: '男', value: '0' },
  { text: '女', value: '1' },
];
const photoList = [
  { text: '拍照', value: 'picture' },
  { text: '本地选择', value: 'local' },
];

type Props = {
  onClose: () => void;
  type: '' | 'gender' | 'photo';
  // eslint-disable-next-line no-unused-vars
  onUpdateProfile: (type: 'gender' | 'photo', value: string) => void;
};

const EditList = ({ onClose, type, onUpdateProfile }: Props) => {
  const onItemClick = (value: string) => {
    if (type === '') return;
    onUpdateProfile(type, value);
  };

  const list = type === 'gender' ? genderList : photoList;
  return (
    <div className={styles.root}>
      {list.map((item) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          className="list-item"
          key={item.text}
          onClick={() => onItemClick(item.value)}
        >
          {item.text}
        </div>
      ))}
      {/* <div className="list-item" onClick={() => onItemClick('0')}>
        男
      </div>
      <div className="list-item" onClick={() => onItemClick('1')}>
        女
      </div> */}

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="list-item" onClick={onClose}>
        取消
      </div>
    </div>
  );
};

export default EditList;
