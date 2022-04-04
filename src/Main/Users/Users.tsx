import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import { RootState } from '../../Redux/store';
import { getUsers, showMore } from '../../Redux/UserSlice';
import styles from "./styles.module.scss"
import noImage from "../../assets/img/photo-cover.svg"
import Preloader from "../../assets/img/Preloader.svg"


const Users = () => {
const { users, usersCount, totalPages, loading } = useSelector((state: RootState) => state.users);

const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getUsers(usersCount))
  },[dispatch, usersCount])
const isDisable =  totalPages * 6 === 6  ? true : false
const imgSrc = 'https://frontend-test-assignment-api.abz.agency/images/placeholders/placeholder.png'
  return (
    <div className={styles.Users} id="users">
      <h2 className={styles.Users__Title}>Working with GET request</h2>
      {loading ? <img className={styles.Users__Preloader} src={Preloader} alt="Preloader" /> :
      <div className={styles.Users__UserBlock}>
        {users && users.map( (key) =>(
          <div key={key.id} className={styles.UserBlock_card}>
            <img className={styles.Card_img} src={key.photo === imgSrc ? noImage : key.photo} alt="face"/>
            <div className={`${styles.Card_txt} ${styles.Card_name}`}>{key.name}</div>
            <div className={styles.Card_txt}>{key.position}</div>
            <div className={styles.Card_txt}>{key.email}</div>
            <div className={styles.Card_txt}>{key.phone}</div>
          </div>
        ))}
          
      </div>
      }   
      <Button txt='Show more' onClick={() => dispatch(showMore())} isDisable={isDisable}/>

    </div>
  )
}

export default Users