import { useContext } from "react"
import { ImageContext } from "../App"
import axios from "axios"
import SpinnerIcon from "./SpinnerIcon"

const ImageUpload = () => {
    const { setImage, setShowInfo, setResponse, isLoading, setIsLoading, location} = useContext(ImageContext)

    const handleImage = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        setImage(e.target.files[0])
        const formData = new FormData()
        formData.append("image", e.target.files[0])
        formData.append('location', location || "")
        setShowInfo(true)
        if (e.target.files[0]) {
            try {
                const apiResponse = await axios.post("http://127.0.0.1:5000/api/classify", formData, {
                    headers: {
                        'Content-Type': 'multipart/formdata'
                    },
                })
                setResponse(apiResponse.data.result)
                console.log(apiResponse.data.result)
                setShowInfo(true)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    if (isLoading) {
        return <SpinnerIcon></SpinnerIcon>
    }

    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center w-4/12">
                <label className=" flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-dropbox-green hover:bg-hover-green">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-3 ">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            <span className="font-semibold 2xl:text-base text-sm">
                                Click to upload or drag and drop
                            </span> 
                        </p>
                        <p className=" 2xl:text-sm text-xs text-gray-500 dark:text-gray-400">Image of the trash to be recycled</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleImage}/>
                </label>
            </div>
        </div> 
    )
}
export default ImageUpload