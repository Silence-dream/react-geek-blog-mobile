import classnames from 'classnames';
// 组件 props 的类型
type Props = {
  // icon 的类型
  type: string;
  // icon 的自定义样式
  className?: string;
  // 点击事件
  onClick?: () => void;
};

const Icon = ({ type, className, onClick }: Props) => {
  return (
    <svg className={classnames('icon', className)} aria-hidden="true" onClick={onClick}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
};

export default Icon;
