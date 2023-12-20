import { Icon } from '@iconify/react'
import { IconButton, Typography } from '@mui/material'

const Footer = () => {
  return (
    <div className='h-64 m-8 p-4 overflow-hidden text-white-100 bg-black-50 dark:bg-gray-50 rounded-lg flex items-start'>
      <div className='flex flex-col basis-1/4'>
        <IconButton>
          <a
            href='https://www.linkedin.com/company/liberty-international-tourism-group/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Icon icon='akar-icons:linkedin-fill' width='30' color='#ccc' />
          </a>
        </IconButton>
        <IconButton>
          <a
            href='https://www.instagram.com/liberty_itg/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Icon icon='akar-icons:instagram-fill' width='30' color='#ccc' />
          </a>
        </IconButton>
        <IconButton>
          <a
            href='https://www.facebook.com/LibertyInternationalTourismGroup?ref_type=bookmark'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Icon icon='akar-icons:facebook-fill' width='30' color='#ccc' />
          </a>
        </IconButton>
      </div>
      <div className='flex flex-col items-start'>
        <Typography
          variant='overline'
          component='h6'
          className='tracking-widest'
        >
          DESIGNED BY
        </Typography>
        <Typography variant='overline' component='p'>
          @QUOTE/buddy - 2023
        </Typography>
        <Typography variant='overline' component='h6'>
          ABOUT THIS QUOTATION
        </Typography>
        <div className='text-left text-lg text-white-50'>
          <span className='font-semibold'>
            Introducing your tailor-made quotation,{' '}
          </span>
          <span className='font-light'>
            meticulously crafted by the innovators at{' '}
          </span>
          <span className='font-bold text-blue-500 p-1'>QUOTE/buddy</span>
          <span className='font-light'>
            ! We're not just a tech startup; we're the{' '}
          </span>
          <span className='font-semibold text-green-500'>game-changers</span>
          <span className='font-light'>
            {' '}
            revolutionizing how <span className='font-bold'>DMC</span>s deliver
            quotes.{' '}
          </span>
          <span className='font-semibold'>
            Say goodbye to the old ways and hello to automated RFP responses.
          </span>
          <span className='font-light'>
            {' '}
            But wait, there's more! We're relentlessly fine-tuning to make this
            your go-to solution.{' '}
          </span>
          <span className='font-semibold'>Ready to join the revolution?</span>
          <span className='font-light'> Reach out to us at </span>
          <a
            href='mailto:oliverm316@gmail.com'
            className='text-blue-400 underline'
          >
            oliverm316@gmail.com
          </a>
          <span className='font-light'>
            {' '}
            and let's elevate your client experience together!
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
