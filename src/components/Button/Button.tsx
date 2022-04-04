import React, { FC } from 'react'
import styles from "./styles.module.scss"

const Button:FC<IButton> = ({txt, link, isDisable, onClick}) => {
  return (
    <>
      {!isDisable && <a href={link} className={styles.btn} onClick={onClick}>{txt}</a>}
    </>
  )
}
interface IButton {
    txt:string,
    link?:string,
    isDisable?: boolean,
    onClick?: () => void
}

export default Button