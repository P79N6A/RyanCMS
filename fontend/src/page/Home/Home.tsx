import { Rate } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Reducers } from '../../reducers/reducers';
import { validate, phone, password } from '../../util/validator/validate';
import { RouteProps, RouterProps } from 'react-router';
import * as  styles from './Home.scss';
interface Props extends RouteProps, RouterProps {
  books: Reducers['books']
}

@connect((state: Reducers) => ({
  books: state.books
}))
export default class App extends React.Component<Props, any> {

  componentDidMount() {
    this.login('183206650111', '1254asd');
  }

  @validate
  login(@phone phone, @password password) {
    return {
      name: 'Ryan',
      phone: phone,
      sex: 1
    }
  }

  public render() {
    return (
      <div className={styles['App']}>
        <h2>{this.props.books}</h2>
        <p className={styles['App-intro']}>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Rate character="6" />
      </div>
    );
  }
}

