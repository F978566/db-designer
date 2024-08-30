import { useInfoContext } from "./useInfoContext";
import { InfoContext } from "./InfoContext";
import { InfoProps } from "./InfoProps";
import "./style.scss";


export const Info = ({ children, mainInfoText, minorInfoText }: InfoProps) => {
    return (
        <InfoContext.Provider value={{ mainInfoText, minorInfoText }}>
            <div>
                {children}
            </div>
        </InfoContext.Provider>
    )
}


Info.MainInfo = () => {
    const { mainInfoText } = useInfoContext();

    return (
        <div className="mainInfo">
            {mainInfoText}
        </div>
    )    
}


Info.MinorInfo = () => {
    const { minorInfoText } = useInfoContext();

    return (
        <div className="minorInfo">
            {minorInfoText}
        </div>
    )
}