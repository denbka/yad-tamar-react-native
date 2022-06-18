import React, { FC } from 'react'
import Svg, { Path } from 'react-native-svg'

export const IconPeoples: FC<IconPeoplesProps> = ({ fill }) => {
  return (
    <Svg width="30" height="22" viewBox="0 0 30 22" fill="none">
      <Path
        d="M10.2235 13.3547C6.81097 13.3547 0.0151367 15.0609 0.0151367 18.4588V21.0109H20.4318V18.4588C20.4318 15.0609 13.636 13.3547 10.2235 13.3547ZM3.42764 18.0942C4.65264 17.2484 7.61305 16.2713 10.2235 16.2713C12.8339 16.2713 15.7943 17.2484 17.0193 18.0942H3.42764ZM10.2235 10.8026C13.0381 10.8026 15.3276 8.51299 15.3276 5.69841C15.3276 2.88382 13.0381 0.594238 10.2235 0.594238C7.40889 0.594238 5.1193 2.88382 5.1193 5.69841C5.1193 8.51299 7.40889 10.8026 10.2235 10.8026ZM10.2235 3.51091C11.4339 3.51091 12.411 4.48799 12.411 5.69841C12.411 6.90882 11.4339 7.88591 10.2235 7.88591C9.01305 7.88591 8.03597 6.90882 8.03597 5.69841C8.03597 4.48799 9.01305 3.51091 10.2235 3.51091ZM20.4901 13.4422C22.1818 14.6672 23.3485 16.3005 23.3485 18.4588V21.0109H29.1818V18.4588C29.1818 15.513 24.0776 13.8359 20.4901 13.4422ZM18.9735 10.8026C21.7881 10.8026 24.0776 8.51299 24.0776 5.69841C24.0776 2.88382 21.7881 0.594238 18.9735 0.594238C18.186 0.594238 17.4568 0.783821 16.786 1.10465C17.7047 2.40257 18.2443 3.99216 18.2443 5.69841C18.2443 7.40465 17.7047 8.99424 16.786 10.2922C17.4568 10.613 18.186 10.8026 18.9735 10.8026Z"
        fill={fill ?? '#BDBDBD'}
      />
    </Svg>
  )
}

type IconPeoplesProps = { fill: string }