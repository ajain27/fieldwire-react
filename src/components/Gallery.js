import React, { useEffect, useState, useRef } from 'react';
import { ClipLoader } from "react-spinners";
import '../styles/gallery.scss';
import { css } from "@emotion/core";


function Gallery({ search }) {

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

    useEffect(() => {
        handleSearch();
    }, [search])

    function handleSearch(e) {
        if (search !== "" || search !== null) {
            setShowLoader(true);
            fetch(`https://api.imgur.com/3/gallery/search/?q=${search}`, {
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
            <div className="container m-auto pt-2">
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
