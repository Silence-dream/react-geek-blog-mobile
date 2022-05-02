import { usePersistFn } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/types/store';

/**
 * 进入页面时，获取数据
 * @param action 获取数据的 action 函数
 * @param stateName 获取状态的名称，对应 RootState 中某个状态名称
 * @param afterAction 回调函数，表示在 action 完成后，执行某个操作
 * @return 要获取的状态
 */
export const useInitialState = <StateName extends keyof RootState>(
  action: () => void,
  stateName: StateName,
  afterAction = () => {},
): RootState[StateName] => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state[stateName]);
  // 对于 useRef 来说，参数只会在第一次组件渲染时生效，类似 useState 的参数
  const persistAction = usePersistFn(action);
  // 创建用来处理 afterAction 的 ref 对象，来避免递归发送请求
  const persistAfterAction = usePersistFn(afterAction);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(persistAction() as any);
      persistAfterAction();
    };
    loadData();
  }, [dispatch, persistAction, persistAfterAction]);

  return state;
};
