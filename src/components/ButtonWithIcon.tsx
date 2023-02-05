import React from 'react'
import Image from 'next/image'


type ButtonWithIconProps = {
    className?: string;
    onClick?: () => void;
    label?: string;
    btnType: 'edit' | 'delete'
}
const ButtonWithIcon = ({ className, onClick, label = '', btnType }: ButtonWithIconProps) => {

    const onBtnClick = () => {
        if (onClick) onClick();
    }

    return <button
        className={`${className}`}
        onClick={onBtnClick}
    >
        {label}
        {btnType === 'edit' ? (
            <EditIcon />
        ) : (
            <DeleteIcon />
        )}
    </button>
}

export default ButtonWithIcon;

const EditIcon = () => {
    return  <Image
      className='object-contain mr-1'
      alt='edit icon'
      width={18}
      height={18}
      src={'/assets/edit.svg'}
    />
  }
  
  const DeleteIcon = () => {
    return  <Image
      className='object-contain mr-1'
      alt='remove icon'
      width={18}
      height={18}
      src={'/assets/trash.svg'}
    />
  }