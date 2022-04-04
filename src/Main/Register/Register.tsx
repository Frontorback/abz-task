import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/Input/Input'
import { RootState } from '../../Redux/store'
import { closeUsers, getPosition, getUsers, postUser } from '../../Redux/UserSlice'
import Preloader from "../../assets/img/Preloader.svg"
import styles from "./styles.module.scss"


const Register = () => {
  const dispatch = useDispatch();
  const { positions, error, loading } = useSelector((state: RootState) => state.users);

  const [radio, setRadio] = useState<any>(1)
  const [fileSelect, setFileSelect] = useState<any>({})

  

  useEffect(()=> {
    dispatch(getPosition())
  },[dispatch])

  const {handleSubmit, register, watch, reset, formState: {errors, isValid} } = useForm({mode: "onBlur"})
  const Submit = (txt:any) =>{
    var formData = new FormData()
    formData.append('name', txt.name)
    formData.append('email', txt.email)
    formData.append('phone', txt.phone)
    formData.append('position_id', radio)
    formData.append('photo', fileSelect)
    console.log(txt)
    dispatch(postUser(formData))
    dispatch(closeUsers())
    dispatch(getUsers(6))
    reset()
  }
  return (
    <div className={styles.Register} id="sign-up">
        <h3 className={styles.Register__Title}>Working with POST request</h3>
        <form onSubmit={handleSubmit(Submit)}>
          <Input 
            Type="text" 
            Placeholder="Your name" 
            Name="name" 
            MinLength={2} 
            MaxLength={60} 
            register={register} 
            errorsTxt={errors.name}
            patternVal={/^[a-z ,.'-]+$/i}
            isDirty={watch("name", false)}
          />
          <Input 
            Type="email" 
            Placeholder="Email" 
            Name="email" 
            MinLength={2} 
            MaxLength={100} 
            register={register} 
            errorsTxt={errors.email}
            patternVal={/^\S+@\S+\.\S+$/}
            isDirty={watch("email", false)}
          />
          <Input 
            Type="tel" 
            Placeholder="Phone" 
            Name="phone" 
            MinLength={10} 
            MaxLength={20} 
            register={register} 
            errorsTxt={errors.tel}
            patternVal={/^\+?3?8?(0[5-9][0-9]\d{7})$/}
            isDirty={watch("phone", false)}
            HelperText={"+38 (XXX) XXX - XX - XX"}
          />
          <h4 className={styles.Register__SelectPos}>Select your position</h4>
          {loading ? <img className={styles.Register__Preloader} src={Preloader} alt="Preloader" /> :
          <ul className={styles.Register__List}>
            {positions && positions.map(key=>(
              <li key={key.id} className={styles.radioBtn}>
                <input type="radio" name={key.name} onChange={e => {}} checked={radio === key.id}/>
                <label onClick={() => setRadio(key.id) } htmlFor={key.name}>{key.name}</label>
              </li>
            ))}
          </ul>
          } 

          <label htmlFor="upload" className={styles.Register__Upload}>
                <div className={styles.Upload_first}>Upload</div>
                <div className={styles.Upload_second}>{ fileSelect.name || "Upload your photo"}</div>
          </label>
          <input className={styles.Register__UploadInput} id="upload" type="file" accept=".jpg, .jpeg" onChange={(e:any) => e.target.files[0] && setFileSelect(e.target.files[0])}></input>
          <div className={styles.Register__Submit}>
            <input className={styles.Submit_input} type="submit" value={"Sign up"} disabled={!isValid} />
          </div>
          
        </form>
        {/* {error !== null && alert(error)} */}
    </div>
  )
}

export default Register