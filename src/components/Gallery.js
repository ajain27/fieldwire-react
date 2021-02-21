import React, { useState, useRef } from 'react';
import { ClipLoader } from "react-spinners";
import '../styles/gallery.scss';
import { css } from "@emotion/core";
import { ImageGroup, Image } from 'react-fullscreen-image'


function Gallery() {

    const [images, setImages] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [clickedImage, setClickedImage] = useState(0);
    let [spinnerColor, setSpinnerColor] = useState("#f7b244");
    const [error, setError] = useState('');

    const inputElement = useRef(null);
    const imageEl = useRef(null);

    const override = css`
    display: block;
    margin: 0 auto;
    `;

    function handleSearch(e) {
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
                try {
                    const imageData = response.data;
                    setImages(imageData);
                    setShowLoader(false);
                } catch (error) {
                    setError(error);
                }
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
        console.log(image);
        setClickedImage(image);
        setIsActive(!isActive);
    }

    return (
        <div>
            <div className="container">
                <nav className="search navbar">
                    <form className="form-inline my-2 my-lg-0 m-auto w-100" onSubmit={handleSearch}>
                        <input
                            className="form-control mr-sm-2 w-50"
                            type="search"
                            placeholder="Search"
                            ref={inputElement}
                            aria-label="Search" />
                        <button
                            className="btn btn-outline-success searchbtn my-2 my-sm-0"
                            type="submit">Search</button>
                    </form>
                </nav>
            </div>

            <div className="container m-auto pt-5">
                <div className="row d-flex">
                    {
                        showLoader ? <ClipLoader size={100} color={spinnerColor} css={override} /> :
                            images && images.length > 0 ? images.map(image =>
                                <div className="col-lg-4 col-md-4 col-sm-4 mt-5" key={image.id}>
                                    <div className="card mb-4" >
                                        {
                                            image && image.images && image.images[0] ?
                                                <img
                                                    className={clickedImage === image && isActive ? "card-img-top m-auto p-1 active" : "card-img-top m-auto p-1"}
                                                    src={image.images[0].link}
                                                    onError={handleImgError}
                                                    ref={imageEl}
                                                    onClick={handleEnlargeImage.bind(null, image)} /> :
                                                <img
                                                    className="card-img-top m-auto p-1"
                                                    src="https://picsum.photos/200/300"
                                                    onError={handleImgError}
                                                    onClick={handleEnlargeImage.bind(null, image)} />
                                        }
                                    </div>
                                </div>
                            ) : <p>{error}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Gallery
