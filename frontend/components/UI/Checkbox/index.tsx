import React from 'react'
import { CheckboxCheckedSvg, CheckboxSvg } from '../../../assets/svgs'
import styles from './Checkbox.module.scss'
interface CheckboxProps {
  returnValue: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ returnValue }) => {

  const [checked, setChecked] = React.useState(false);

  const toggleCheckBox = () => {
    setChecked(!checked)
  }

  React.useEffect(() => {
    returnValue(checked)
  }, [checked])

  return (
    <div className={styles.checkboxContainer}>
      <input
        className={styles.checkbox}
        type='checkbox'
        onChange={toggleCheckBox}
      />

      {checked ? (
        <CheckboxCheckedSvg fill={'#4e6baf'} w={24} h={24} />
      ) : (
        <CheckboxSvg fill={'white'} w={24} h={24} />
      )}
    </div>
  )
}

export default Checkbox