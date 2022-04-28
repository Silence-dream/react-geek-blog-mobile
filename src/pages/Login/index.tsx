import { Button, Form, Input, NavBar, Toast } from 'antd-mobile';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { login } from '@/store/actions/login';

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
            extra={<span className="code-extra">发送验证码</span>}
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input placeholder="请输入验证码" autoComplete="off" />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item noStyle>
            <Button block type="submit" color="primary" className="login-submit">
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
