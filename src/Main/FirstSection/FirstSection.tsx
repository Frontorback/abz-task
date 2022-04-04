import React from 'react'
import Button from '../../components/Button/Button'
import styles from "./styles.module.scss"

const FirstSection = () => {
  return (
    <div className={styles.BackGroung}>
        <div className={styles.TextBlock}>
            <h1 className={styles.TextBlock__header}>Test assignment for front-end developer</h1>
            <p className={styles.TextBlock__txt}>What defines a good front-end developer is one that has skilled knowledge of 
                HTML, CSS, JS with a vast understanding of User design thinking as they'll be
                building web interfaces with accessibility in mind. They should also be excited to learn,
                as the world of Front-End Development keeps evolving.
            </p>
            <Button txt='Sign Up' link='#sign-up'/>
        </div>
        
    </div>
  )
}

export default FirstSection