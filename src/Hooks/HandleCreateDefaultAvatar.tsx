import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../Config/userSlice';

export const HandleCreateDefaultAvatar = () => {
  const user = useSelector(selectUser)

  // Array of background colors to choose from
  const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33F2', '#33E4FF'];

  // Randomly select a color from the array
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div>
      {user?.photoURL ?
        <img src={user?.photoURL} alt="avatar" className='h-10 w-10 rounded-full lg:h-8 lg:w-8' /> :
        <>
          <div
            className='h-10 w-10 rounded-full lg:h-8 lg:w-8 flex items-center justify-center'
            style={{ backgroundColor: randomColor }}
          >
            <p className='text-white font-semibold text-lg'>
              {user?.displayName?.charAt(0).toUpperCase()}
            </p>
          </div>
        </>
      }

    </div>
  )
}
