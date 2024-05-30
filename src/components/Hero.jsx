import React from 'react'
import { img } from '../assets'

const Hero = () => {
    return (
        <header className='w-full flex justify-center items-center flex-col'>
            <nav className='flex justify-between items-center w-full mb-10 pt-3'>
                <img src={img} alt='sumz_logo' className='w-40 h-30 object-contain' />
                {/* <button
                    type='button'
                    onClick={() =>
                        window.open("https://github.com/aditya-130103")
                    }
                    className='blue_btn'
                >
                    GitHub
                </button> */}
            </nav>
            <h1 className='head_text'>
                Summarize Articles with <br />
                <span className='orange_gradient '>OpenAI GPT-4</span>
            </h1>
            <h2 className='desc'>
                Are you tired of reading long and boring articles?Then you need Summarize, the app that uses the latest
                and greatest natural language processing technology to condense any text into a short and sweet summary.
            </h2>
        </header>
    )
}

export default Hero