import { Rate } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Reducers } from '../../reducers/reducers';
import { RouteProps, RouterProps } from 'react-router';
import { Row, Col } from 'antd';
import * as  styles from './Register.scss';
import { RegisterInfo } from './components/RegisterInfo/RegisterInfo';
import { RegisterForm } from './components/RegisterForm/RegisterForm';

interface Props extends RouteProps, RouterProps {
  books: Reducers['books']
}

@connect((state: Reducers) => ({
  books: state.books
}))
export default class App extends React.Component<Props, any> {


  public render() {
    return (
      <div className={styles['container']}>
        <Row gutter={24}>
          <Col span={12} ><RegisterInfo /></Col>
          <Col span={12} ><RegisterForm /></Col>
        </Row>

      </div>
    );
  }
}

