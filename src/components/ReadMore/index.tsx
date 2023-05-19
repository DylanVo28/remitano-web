import React, {useState} from "react";

interface ReadMoreProps {
    children: string
}

const ReadMore: React.FC<ReadMoreProps> = ({children}) => {
    const lengthText = 500;
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p style={{display: "inline", width: "100%"}}>
            {isReadMore ? text.slice(0, lengthText) : text}
            { text.length > lengthText && (
                <span onClick={toggleReadMore} style={{cursor: "pointer", color: "#808080"}}>
                    {isReadMore ? "...read more" : " show less"}
                </span>
            )}
        </p>
    );
};

export default ReadMore;