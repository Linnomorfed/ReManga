import React from 'react'
import styles from './Loader.module.scss'

const CircularLoader = () => {
  return (
    <svg className={styles.loaderWrapper} viewBox="22 22 44 44" width={40}>
      <circle className={styles.loader} cx="44" cy="44" r="20.2" fill="none" strokeWidth='3.6'></circle>
    </svg >
  )
}

export default CircularLoader