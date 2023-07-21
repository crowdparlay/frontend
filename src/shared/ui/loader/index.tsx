import classNames from 'classnames';

import cls from './index.module.scss';

interface LoaderProps {
  className?: string;
}

export const Loader = (props: LoaderProps) => {
  const {className} = props;

  return (
    <div className={classNames(cls.ellipsisContainer, [className])}>
      <div className={cls.ellipse}></div>
      <div className={cls.ellipse}></div>
      <div className={cls.ellipse}></div>
      <div className={cls.ellipse}></div>
    </div>
  );
};
