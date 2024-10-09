'use client'


export function ProgressBar({progress, barColorA, barColorB, bgColor}: 
    {progress: number | undefined, barColorA: string, barColorB: string, bgColor: string}) {

    const gradientStyle = {
        width: `${progress}%`,
        height: '100%',
        background: `linear-gradient(to right, ${barColorA}, ${barColorB})`,
    };

    const containerStyle = {
        width: '100%',
        height: '100%',
        backgroundColor: bgColor,
        borderRadius: '999px', 
        overflow: 'hidden'
    };

    return ( 
            <div style={containerStyle}>
                <div style={gradientStyle}/>
            </div>
    );
}