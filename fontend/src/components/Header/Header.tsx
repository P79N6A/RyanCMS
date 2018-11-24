import React from 'react';
import { Link, RouteProps } from 'react-router-dom';
import { Menu, Icon, Dropdown } from 'antd';

import { headerMenuConfig } from './menuConfig';
import styles from './Header.scss';
import { RouterProps } from 'react-router';
import { User } from '../../interface/user.interface';
import { user } from '../../model/user.model';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

interface Props extends RouteProps, RouterProps {
	user: User;
}
interface State {}
export default class Header extends React.Component<Props, State> {
	handleNavClick() {}
	static defaultProps = {};
	render() {
		const { user } = this.props;
		const menu = (
			<Menu>
				<Menu.Item>
					<a target="_blank" rel="noopener noreferrer">
						1st menu item
					</a>
				</Menu.Item>
				<Menu.Item>
					<a target="_blank" rel="noopener noreferrer">
						2nd menu item
					</a>
				</Menu.Item>
				<Menu.Item>
					<a target="_blank" rel="noopener noreferrer">
						3rd menu item
					</a>
				</Menu.Item>
			</Menu>
		);
		return (
			<div className={styles['header-container']}>
				<div className={styles['header-content']}>
					<div className={styles['header-logo']}>
						<Link to="/admin">RyanCMS 后台管理系统</Link>
					</div>
					<div className={styles['header-navbar']}>
						<ul className={styles['header-menu']}>
							<li>
								<a>
									<Icon type="question-circle" /> 帮助
								</a>
							</li>
							<li>
								<a key="mail">
									<Icon type="mail" /> 反馈
								</a>
							</li>
						</ul>
						<div className={styles['userpannel']}>
							<div className={styles['avatar']}>
								<img src={user.avatar} alt="" />
							</div>
							<Dropdown overlay={menu}>
								<a className={styles['user-profile']}>
									<span>
										<span className={styles['user-name']}>{user.nickname}</span>
										<br />
										<span className="user-rank">管理员</span>
									</span>
									&nbsp;
									<Icon type="caret-down" />
								</a>
							</Dropdown>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
