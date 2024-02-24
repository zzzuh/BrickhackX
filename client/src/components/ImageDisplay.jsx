const ImageDisplay = ({imageURL}) => {
    const image = imageURL

    if (image) {
        return (<img src={imageURL} alt="uploaded"></img>)
    } else {
        return null
    }
}

export default ImageDisplay