const Information = ({itemName, itemRecycle}) => {
    return (
        <div className="flex w-full ">
            <h2>{itemName}</h2>
            <a>{itemRecycle}</a>
        </div>
    )
}

export default Information