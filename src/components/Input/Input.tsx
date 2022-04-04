import React, { FC } from "react";
import styles from "./styles.module.scss";

interface IInput {
  Type: string;
  Placeholder: string;
  Name: string;
  MaxLength?: number;
  MinLength?: number;
  register: any;
  errorsTxt: any;
  patternVal: object;
  isDirty: boolean;
  HelperText?: string;
}

const Input: FC<IInput> = ({
  Type,
  Placeholder,
  Name,
  MinLength,
  MaxLength,
  errorsTxt,
  register,
  patternVal,
  isDirty,
  HelperText,
}) => {

  const stylesForFieldset = isDirty
    ? errorsTxt
      ? `${styles.InputItem} ${styles.InputItem_active} ${styles.active_error}`
      : `${styles.InputItem} ${styles.InputItem_active}`
    : styles.InputItem;
  const stylesForLegend = errorsTxt
    ? `${styles.InputItem__legend} ${styles.legend_error}`
    : styles.InputItem__legend;

  return (
    <div>
      <fieldset className={stylesForFieldset}>
        {isDirty && <legend className={stylesForLegend}>Label</legend>}
        <input
          className={styles.InputItem__input}
          type={Type}
          placeholder={Placeholder}
          {...register(Name, {
            required: "required",
            minLength: {
              value: MinLength,
              message: `MIN LENGTH IS ${MinLength}`,
            },
            maxLength: {
              value: MaxLength,
              message: `MAX LENGTH IS ${MaxLength}`,
            },
            pattern: {
              value: patternVal,
              message: "not valid",
            },
          })}
        />
      </fieldset>
      {errorsTxt ? 
        <div className={styles.errorTxt}>{errorsTxt.message}</div>
       : 
        <div className={styles.HelperText}>{HelperText}</div>
      }
    </div>
  );
};

export default Input;
