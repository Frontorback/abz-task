import React from 'react'
import Logo from '../assets/img/Logo.svg'
import Button from '../components/Button/Button'
import styles from "./styles.module.scss"

const Header = () => {
  return (
    <header>
      <div className={styles.headerBlock}>
        <img className={styles.headerBlock__img} src={Logo} alt="logo"/>
        <div className={styles.headerBlock__btns}>
            <Button txt={"Users"} link={"#users"}/>
            <Button txt={"Sign Up"} link={"#sign-up"}/>
        </div>
      </div>
    </header>
  )
}

export default Header