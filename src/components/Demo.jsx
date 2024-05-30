import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";

import { useLazyGetSummaryQuery } from "../services/article";//remember this is a hook

const Demo = () => {
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });//this is for the present article and inorder to save the other past artcile we use another hook called allArtciles

    const [allArtciles, setAllArtciles] = useState([]);

    const [copied, setCopied] = useState("");

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    //useEffect hook is used to save and keep the track of the older articles even if we reload the page    
    //it contains call back function and dependency array
    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem('articles')
        );

        if (articlesFromLocalStorage) {
            setAllArtciles(articlesFromLocalStorage);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await getSummary({ articleUrl: article.url });

        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary };
            const updatedAllArticles = [newArticle, ...allArtciles];

            setArticle(newArticle);
            setAllArtciles(updatedAllArticles);

            //update at the local storage
            localStorage.setItem('articles', JSON.stringify(updatedAllArticles));//remeber localstorage only contains strings

            console.log(newArticle);
        }
    }

    // for handling the copy icon we add handle copy feature
    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => {
            setCopied(false)
        }, 3000);//3sec
    }

    return (
        <section className="w-full mt-16 max-w-ful">
            {/* SEARCH-BAR */}
            <div className="flex flex-col w-full gap-2">
                <form
                    className='relative flex justify-center items-center'
                    onSubmit={handleSubmit}>

                    <img
                        src={linkIcon}
                        alt='link-icon'
                        className='absolute left-0 my-2 ml-3 w-5'
                    />

                    <input
                        type="url"
                        placeholder="Enter the URL of the article"
                        value={article.url}
                        onChange={(e) => setArticle({ ...article, url: e.target.value })}
                        required
                        className="url_input"
                    />

                    <button type='submit' className='submit_btn'>
                        <p>↵</p>
                    </button>
                </form>

                {/* for the history */}
                <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                    {allArtciles.reverse().map((item, index) => (
                        <div
                            key={`link-${index}`}
                            onClick={() => setArticle(item)}
                            className='link_card'
                        >
                            <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                                <img
                                    src={copied === item.url ? tick : copy}
                                    alt={copied === item.url ? "tick_icon" : "copy_icon"}
                                    className="w-[40%] h-[40%] object-contain" />
                            </div>
                            <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                                {item.url}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Display the results -3 cases exists 
                1.isfectching
                2.error
                3.if artcile summaryis present
            */}
            <div className="my-10 max-w-full flex justify-center items-center">
                {isFetching ? (
                    <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
                ) : error ? (
                    <p className='font-inter font-bold text-black text-center'>
                        Well, that wasn't supposed to happen...
                        <br />
                        <span className='font-satoshi font-normal text-gray-700'>
                            {error?.data?.error}
                        </span>
                    </p>
                ) : (
                    article.summary && (
                        <div className='flex flex-col gap-3'>
                            <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                                Article <span className='blue_gradient'>Summary</span>
                            </h2>
                            <div className='summary_box'>
                                <p className='font-inter font-medium text-sm text-gray-700'>
                                    {article.summary}
                                </p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    )
}

export default Demo;