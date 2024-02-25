import { useContext } from "react"
import { ImageContext } from "../App"

const ImageDisplay = () => {
    const { image } = useContext(ImageContext)

    if (image) {
        const src = URL.createObjectURL(image)
        return (<img src={src} alt="uploaded"></img>)
    } else {
        return null
    }
}

export default ImageDisplay