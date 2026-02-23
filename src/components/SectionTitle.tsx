import React from 'react'

type sectionTitleProps = {
    title: string;
    theme: string;
}
function SectionTitle({title, theme}: sectionTitleProps) {
  return (
    <div className='flex items-center h-fit w-full justify-center mb-4'>
      <div className={`h-[2px] w-10 md:w-48 bg-${theme == 'white' ? 'white':'zinc-900'}`}></div>
        <h2 className={`text-2xl mx-5 text-${theme == 'white' ? 'white font-thin':'black font-normal'}`}>{title}</h2>
        <div>

        </div>
        <div className={`h-[2px] w-10 md:w-48 bg-${theme == 'white' ? 'white':'zinc-900'}`}></div>
    </div>
  )
}

export default SectionTitle