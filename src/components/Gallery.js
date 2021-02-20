import React, { useState, useEffect, useRef } from 'react';
import { ClipLoader } from "react-spinners";
import '../styles/gallery.scss';
import { css } from "@emotion/core";

function Gallery() {
    const inputElement = useRef(null);
    const [images, setImages] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [enlargeImage, setEnlargeImage] = useState(false);
    let [spinnerColor, setSpinnerColor] = useState("#f7b244");
    const [error, setError] = useState('');


    const override = css`
    display: block;
    margin: 0 auto;
    `;

    function handleClick(e){
        e.preventDefault();
        setShowLoader(true);
        const query = handleOnchange();
        fetch(`https://api.imgur.com/3/gallery/search/?q=${query}`, {
            headers: new Headers({
                "Authorization": "Client-ID b067d5cb828ec5a"
            })
        }).then(res => {
            const promise = res.json();
            promise.then(response => {
                const imageData = response.data;
                console.log(imageData);
                setImages(imageData);
                setShowLoader(false);
            })
        })
        .catch(error => {
            setError(error);
        })
    }

    function handleOnchange() {
        const query = inputElement.current.value;
        return query;
    }

    function handleImgError(e) {
        e.target.src = "https://picsum.photos/200/300"
    }

    function handleEnlargeImage(image) {
        console.log(image.id);
    }

    return (
        <div>
            <div className="container m-auto pt-5">
                <form className="form-inline my-2 my-lg-0 ml-auto" onSubmit={handleClick}>
                    <input className="form-control m-0 w-50"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        ref={inputElement}
                        onChange={handleOnchange} />
                    <button
                        className="search btn btn-outline-white btn-md my-2 my-sm-0 ml-3"
                        type="submit" >Search</button>
                </form>
                <div className="row d-flex">
                    {
                        showLoader ? <ClipLoader size={100} color={spinnerColor} css={override} /> :
                        images && images.map(image =>
                            <div className="col-lg-4 col-md-4 col-sm-4 mt-5" key={image.id}>
                                <div className="card mb-4" >
                                    {
                                        image && image.images && image.images[0] ? 
                                        <img className="card-img-top m-auto p-1" src={image.images[0].link} onError={handleImgError} onClick={handleEnlargeImage.bind(null, image)}/> : <img className="card-img-top m-auto p-1" src="https://picsum.photos/200/300" onError={handleImgError} onClick={handleEnlargeImage.bind(null, image)}/>
                                    }
                                    
                                    <div className="card-body">
                                        <h5 className="card-title">{image.account_url}</h5>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Gallery
