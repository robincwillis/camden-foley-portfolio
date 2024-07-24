import { forwardRef } from 'react'
import Image from "next/image"


const ImageComponent = forwardRef(function ImageComponent({
  imageUrl,
  ratio,
  className,
  alt,
  id,
  width,
  height,
}, ref) {

  return (
    <div
      id={id}
      className={className}
      ref={ref}
      style={{
        width: '100%',
        position: 'relative',
        paddingTop: `${ratio * 100}%` //'133.4%'
        //height: '291px',
      }}>
      <Image
        src={imageUrl}
        width={width}
        height={height}
        //fill={true}
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
  ratio: 4 / 3
}

export default ImageComponent;