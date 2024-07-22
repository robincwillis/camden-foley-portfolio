import { forwardRef } from 'react'
import Image from "next/image"


const ImageComponent = forwardRef(function ImageComponent({imageUrl, ratio}, ref) {

  return (
    <div ref={ref} style={{
      width: '100%',
      position: 'relative',
      paddingTop:  `${ratio * 100}%` //'133.4%'
      //height: '291px',
    }}>
      <Image
        src={imageUrl}
        width={218}
        height={291}
        //fill={true}
        //sizes="100vw"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          objectFit: 'cover',
        }}
        className=""
        alt="Screenshots of the dashboard project showing desktop version"
      />
    </div>
  )
});






ImageComponent.defaultProps = {
  ratio : 4/3
}

export default ImageComponent;