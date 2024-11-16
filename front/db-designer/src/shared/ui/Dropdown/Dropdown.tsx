import "./style.scss";

export const Dropdown = ({ initialValue, content } : { initialValue: string, content: any[] }) => {
    return (
        <div className="dropdown">
            <p >{initialValue}</p>
            <div className="dropdown-content">
                {
                    content.map((v, i) => {
                        return (
                            <div key={i}>
                                {v}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}