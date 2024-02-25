import { useContext, useState } from "react"
import { ImageContext } from "../App"
import axios from "axios"
import SpinnerIcon from "./SpinnerIcon"

const Information = () => {
    const {image, setImage, response, setResponse, isLoading, setIsLoading} = useContext(ImageContext) 

    const handleChange = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        setImage(e.target.files[0] || image)
        const formData = new FormData()
        formData.append("image", e.target.files[0] || image)
        try {
            const apiResponse = await axios.post("http://127.0.0.1:5000/api/classify", formData, {
                headers: {
                    'Content-Type': 'multipart/formdata'
                },
            })

            setResponse(apiResponse.data.result)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const imgURL = URL.createObjectURL(image)

    if (isLoading) {
        return <SpinnerIcon></SpinnerIcon>
    }

    return (
        <div className="flex justify-center w-full pt-10">
            <div className="flex items-center justify-center flex-col w-4/12 h-max border-2 border-gray-300 border-dashed rounded-xl bg-dropbox-green hover:bg-hover-green py-3">
                <div className="flex flex-col items-center w-full">
                    <h1 className="text-white 2xl:text-4xl text-xl py-2">
                        {response.Item}
                    </h1>
                    <img src={imgURL} alt="uploaded" className="px-2"></img>
                    <p className="px-4 py-6 text-white 2xl:text-base text-xs font-semibold">
                        {response.Recycle}
                    </p>
                    <p className="px-4 py-6 text-white 2xl:text-base text-xs">
                        {response.Description}
                    </p>
                    <input type="file" id="file" className="bg-white" onChange={handleChange}></input>
                </div>
            </div>
        </div>
    )
}

export default Information