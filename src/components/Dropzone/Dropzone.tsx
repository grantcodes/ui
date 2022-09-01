import React, { useState, useEffect } from 'react'
import styles from './Dropzone.module.scss'
import cx from 'classnames'
import { DropzoneProps } from './Dropzone.types'

const Dropzone: React.FC<any> = ({
  children,
  onFiles,
  className = '',
  accept = '*',
  multiple = false,
  fullscreenOnDrag = false
}: DropzoneProps) => {
  const [fullscreen, setFullscreen] = useState(false)

  const enableFullscreen = () =>
    setFullscreen(() => (fullscreenOnDrag ? true : false))
  const disableFullscreen = () => setFullscreen(() => false)

  useEffect(() => {
    // Add listener for drag events and make the drop zone cover the whole screen
    window.addEventListener('dragenter', enableFullscreen)
    window.addEventListener('dragend', disableFullscreen)
    return () => {
      window.removeEventListener('dragenter', enableFullscreen)
      window.removeEventListener('dragend', disableFullscreen)
    }
  }, [])

  return (
    <div
      className={cx(styles.Dropzone, className, {
        [styles['Dropzone--fullscreen']]: fullscreen
      })}
      onMouseLeave={disableFullscreen}
      onDragEnd={disableFullscreen}
      onDragLeave={disableFullscreen}
    >
      {children}
      <input
        type='file'
        className={styles.Dropzone__input}
        onChange={e => {
          if (e.target.files && onFiles) {
            onFiles(e.target.files)
          }
        }}
        accept={accept}
        multiple={multiple}
      />
    </div>
  )
}

export { Dropzone }
