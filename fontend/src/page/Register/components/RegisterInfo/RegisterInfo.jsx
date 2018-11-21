import React from 'react';
import styles from './RegisterInfo.scss';
export function RegisterInfo() {
  return (
    <div className={styles['container']}>
      <div className={styles['logo']}>
        <a href="#" className={styles['link']}>
          <img
            className={styles['logoImg']}
            src={require('../../../../assets/images/logo.png')}
            alt="logo"
          />
        </a>
      </div>
      <div className={styles['title']}>
        技术领域智能助手 <br />
        让沟通变得更加智能、高效、便捷
        </div>
      <p className={styles['description']}>Amazing Stuff is Lorem Here.ICE Team</p>
      <div className={styles['border']} />
    </div>
  )
}