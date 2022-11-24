import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Image from 'next/image'

// import { useMediaQuery } from 'react-responsive'
import { isMobile } from 'react-device-detect';
const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function RecentPostWidget(props) {

  let { content } = props
  return (
    <div className={`lg:absolute lg:right-[40px] lg:top-[150px]`}>
      <ThemeProvider theme={darkTheme}>

        <div className={`max-w-[300px] p-1 rounded-md md:max-w-[450px] m-0 border-2  dark:border-white border-black`}>

          {content.map(single => {

            let title = single.title
            title = title.split(" ")
            title.splice(14)

            title = title.join(" ")

            return (
              <>
                <div className={`flex p-1 gap-2 `}>
                  {/* <div className='w-[50px] md:w-[75px] md:h-[75px] h-[50px]  bg-green-500'></div> */}
                  {typeof single.image.url == "string" && <Image
                    alt={single.title}
                    src={single.image.url}
                    width={isMobile ? 50 : 85}
                    height={isMobile ? 50 : 75}
                    priority
                    objectFit='cover'

                  />}
                  {single.image.url.url && <Image
                    alt={single.title}
                    src={single.image.url.url}
                    width={isMobile ? 50 : 85}
                    height={isMobile ? 50 : 75}
                    priority
                    objectFit='cover'
                  />}
                  <div className='flex items-start h-[50px]'>
                    <div className='text-[11px] md:text-base md:max-w-[300px] max-w-[200px]'>
                      {title}  ..
                    </div>
                  </div>
                </div>
                <div className='w-[90%] h-[1px] dark:bg-white bg-black'></div>
              </>

            )
          })}
        </div>
      </ThemeProvider>
    </div>
  );
}