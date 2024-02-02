import React from 'react';

const IconBtn = ({icon, text, textSize = 11, fontWeight = 100, isOutlined = true, ...props}) => {
    const btnClass = isOutlined ?
        `flex items-center gap-2 border border-[#91010] rounded-sm px-2 py-1 font-[${fontWeight}] text-[${textSize}px] leading-3` :
        `flex items-center gap-2 bg-[#9388D8] text-white rounded-sm px-2 py-1 font-[${fontWeight}] text-[${textSize}px] leading-3`;

    return (
        <button className={btnClass} {...props}>
            {icon}
            {text}
        </button>
    );
};

export default IconBtn;