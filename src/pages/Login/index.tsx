import { Button, Form, Input, NavBar, Toast } from 'antd-mobile';
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getCode, login } from '@/store/actions/login';

import styles from './index.module.scss';
type LoginForm = {
  mobile: string;
  code: string;
};
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = async (values: LoginForm) => {
    // react-redux的版本不一样导致的 dispatch 类型不一致,8版本是 Dispatch<AnyAction>  7的版本是 Dispatch<any>
    // TODO ERROR
    try {
      await dispatch(login(values) as any);
      Toast.show({
        content: '登录成功',
        duration: 600,
        afterClose: () => {
          // 返回首页
          history.replace('/home');
        },
      });
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      Toast.show({
        content: error.response?.data?.message,
        duration: 1000,
      });
    }
  };
  const [form] = Form.useForm();
  // 定时器
  let [codeTime, setCodeTime] = useState(0);
  // 定时器id
  let timer = useRef(-1);
  // 获取验证码
  async function onGetCode() {
    // true 表有错 拒接点击
    const hasError = form.getFieldError('mobile').length > 0;
    // console.log(hasError);
    if (hasError) return;
    // 设置重新发送验证码的时间
    dispatch(getCode(form.getFieldValue('mobile')) as any);
    setCodeTime(2);
    timer.current = window.setInterval(() => {
      setCodeTime((codeTime) => codeTime - 1);
    }, 1000);
  }

  // 倒计时停止清理定时器
  useEffect(() => {
    if (codeTime === 0) {
      clearInterval(timer.current);
    }
  }, [codeTime]);

  // 卸载时清理定时器
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <div className={styles.root}>
      <NavBar></NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form
          onFinish={onFinish}
          initialValues={{
            mobile: '13911111111',
            code: '246810',
          }}
          form={form}
        >
          <Form.Item
            className="login-item"
            name="mobile"
            // validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                message: '手机号格式错误',
                pattern: /^1[3-9]\d{9}$/,
              },
            ]}
          >
            <Input placeholder="请输入手机号" autoComplete="off" maxLength={11} />
          </Form.Item>

          <Form.Item
            name="code"
            className="login-item"
            extra={
              <span
                className="code-extra"
                onClick={codeTime === 0 ? onGetCode : undefined}
                role="button"
                onKeyDown={codeTime === 0 ? onGetCode : undefined}
                tabIndex={0}
              >
                {codeTime === 0 ? `发送验证码` : `${codeTime}后重新获取`}
              </span>
            }
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input placeholder="请输入验证码" autoComplete="off" />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item noStyle shouldUpdate>
            {() => {
              // 通过是否出现错误来控制显示开关
              const error =
                form.getFieldsError().filter((item) => item.errors.length > 0).length > 0;
              return (
                <Button
                  block
                  type="submit"
                  color="primary"
                  className="login-submit"
                  disabled={error}
                >
                  登 录
                </Button>
              );
            }}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
