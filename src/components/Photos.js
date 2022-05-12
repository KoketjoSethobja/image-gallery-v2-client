import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver'
 
const Photos = () => {    

    const navigate = useNavigate();

    const [imagesList, setImagesList] = useState([]);
    const [file, setFile] = useState(null);
    const [lid, setLid] = useState(JSON.stringify(localStorage.getItem('idUsers')))

    const [status, setStatus] = useState('')

    const [newPublicId, setNewPublicId] = useState('')

    const handlePic = (e) => {
        const pic = e.target.files[0];
        setFile(pic);
    }

    const onUpload = () => {

        let formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'koketjogallery')

        fetch('https://api.cloudinary.com/v1_1/koketjosethobja/image/upload', {
            method: 'POST',
            body: formData
        }).then((res) => res.json()).then((res) => {
            console.log(res);
            const img_publicId = res.public_id;
            const img_size = res.bytes / Math.pow(1024, 2);
            const img_uploadDate = res.created_at;
            const img_format = res.format;
            const img_fileName = res.original_filename;
            const img_secureUrl = res.secure_url;
            const img_height = res.height;
            const img_width = res.width;
            const id = localStorage.getItem('idUsers')

            axios.post('https://koketjocomgallery.herokuapp.com/upload', {
                publicId: img_publicId,
                fileName: img_fileName,
                uploadDate: img_uploadDate,
                secureUrl: img_secureUrl,
                size_in_mb: img_size,                
                format: img_format,                                
                height: img_height,
                width: img_width,
                user_id: id
            }).then((response) => {
                if(response.data.error){
                    window.alert(response.data.error)
                } else {
                    window.alert(response.data.message)
                }
            }).then(() => {
                setImagesList([
                    ...imagesList, {
                        publicId: img_publicId,
                        fileName: img_fileName,
                        uploadDate: img_uploadDate,
                        secureUrl: img_secureUrl,
                        size_in_mb: img_size,                
                        format: img_format,                                
                        height: img_height,
                        width: img_width,
                        user_id: id
                    }
                ])
            })

        })

    }

    const showImages = () => {
        axios.get('https://koketjocomgallery.herokuapp.com/images').then((response) => {
            if(response.data.error){
                navigate('/')
                localStorage.clear()
            } else {
                setImagesList(response.data)
                console.log(response.data)
            }            
        })
    }

    const updateImage = (publicId) => {
        axios.put('https://koketjocomgallery.herokuapp.com/update', {
            newPublicId: newPublicId,
            publicId: publicId
        }).then((response) => {
            if(response.data.error){
                window.alert(response.data.error)
            } else {
                window.alert(response.data.message)
                setImagesList(imagesList.map((val) => {
                    return val.publicId == publicId ? {
                        publicId: val.publicId,
                        fileName: val.fileName,
                        uploadDate: val.uploadDate,
                        secureUrl: val.secureUrl,
                        size_in_mb: val.size_in_mb,                
                        format: val.format,                                
                        height: val.height,
                        width: val.width,
                        user_id: val.user_id
                    } : val
                }))
            }            
        })
    }

    const deleteImage = (publicId) => {
        axios.delete(`https://koketjocomgallery.herokuapp.com/delete/${publicId}`).then((response) => {
            if(response.data.error){
                window.alert(response.data.error)
            } else {
                window.alert(response.data.message)
                setImagesList(imagesList.filter((val) => {
                    return val.publicId != publicId
                }))
            }            
        })
    }

    const logout = () => {
        localStorage.clear()
        navigate('/')
    }

    useEffect(() => {        
        axios.get('https://koketjocomgallery.herokuapp.com/images').then((response) => {
            setImagesList(response.data)
            //console.log(response.data)            
        })
    }, [])

    axios.defaults.withCredentials = true;

    return (
        <div className='container'>
            <div className='logo-signout'>
                <div className='photos-logo'>
                    <img src="../logo.svg" alt="logo" />
                </div>
                <button onClick={logout}>Sign Out</button>
            </div>
            <div className='title-upload'>
                <h1>Photos</h1>
                <div className='inputFile-uploadBtn'>
                    <input 
                        className='inputFile' 
                        type="file" name="" id=""
                        onChange={handlePic}
                    />
                    <button 
                        className='uploadBtn'
                        onClick={onUpload}
                    >
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M518.3 459a8 8 0 0 0-12.6 0l-112 141.7a7.98 7.98 0 0 0 6.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 459z"></path><path d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7-23.5-24.2-36-56.8-34.9-90.6.9-26.4 9.9-51.2 26.2-72.1 16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9 13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0 1 52.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9 15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5 37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 0 1-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z"></path></svg>
                    </button>
                </div>
                
            </div>  
            <div className="reload">
                <button 
                    className='reload-btn'
                    onClick={showImages}
                >
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 0 0-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 0 1 655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 0 1 279 755.2a342.16 342.16 0 0 1-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 0 1 109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"></path></svg>
                </button>
            </div>      
            {/* images on flex-wrap */}
            <div className='images-list'>
                {imagesList.map((val, key) => {

                    {/* for each image */}
                    return (

                        <div className='image-container'>
                            <img className='image' src={val.secureUrl} alt="image" />
                            <div className='overlay'>
                                <p className='image-name'>{val.publicId}</p>
                                <div className='crud-image-btn'>
                                    <div className='img-hundred'>
                                        <div className='edit-dropdown'>
                                            <button className='edit-droptown-btn crud-btn btn-edit'>
                                                <svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#fff" stroke-width="2" d="M14,4 L20,10 L14,4 Z M22.2942268,5.29422684 C22.6840146,5.68401459 22.6812861,6.3187139 22.2864907,6.71350932 L9,20 L2,22 L4,15 L17.2864907,1.71350932 C17.680551,1.319449 18.3127724,1.31277239 18.7057732,1.70577316 L22.2942268,5.29422684 Z M3,19 L5,21 M7,17 L15,9"></path></svg>
                                            </button>
                                            <div className='edit-dropdown-content'>
                                                <div className='flex-dropdown'>
                                                    <input 
                                                        className='editText' 
                                                        type="text" 
                                                        placeholder='Change image&apos;s name'
                                                        onChange={(e) => {setNewPublicId(e.target.value)}}
                                                    />
                                                    <button 
                                                        className='confirm-edit'
                                                        onClick={() => {updateImage(val.publicId)}}
                                                    >
                                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16.972 6.251c-.967-.538-2.185-.188-2.72.777l-3.713 6.682-2.125-2.125c-.781-.781-2.047-.781-2.828 0-.781.781-.781 2.047 0 2.828l4 4c.378.379.888.587 1.414.587l.277-.02c.621-.087 1.166-.46 1.471-1.009l5-9c.537-.966.189-2.183-.776-2.72z"></path></svg>
                                                    </button>
                                                </div>                                        
                                            </div>
                                        </div>                            
                                        <button 
                                            className='crud-btn btn-del'
                                            onClick={() => {deleteImage(val.publicId)}}
                                            >
                                            <svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"></path></g></svg>
                                        </button>
                                        <button 
                                            className='crud-btn btn-down'
                                            onClick={() => saveAs(val.secureUrl, 'image')}
                                            >
                                            <svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path></svg>
                                        </button>
                                        <button 
                                            className='crud-btn btn-share'
                                            onClick={() => navigator.clipboard.writeText(val.secureUrl) ? window.alert('link copied') : window.alert('link not copied')}
                                            >
                                            <svg stroke="#fff" fill="#fff" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8.465,11.293c1.133-1.133,3.109-1.133,4.242,0L13.414,12l1.414-1.414l-0.707-0.707c-0.943-0.944-2.199-1.465-3.535-1.465 S7.994,8.935,7.051,9.879L4.929,12c-1.948,1.949-1.948,5.122,0,7.071c0.975,0.975,2.255,1.462,3.535,1.462 c1.281,0,2.562-0.487,3.536-1.462l0.707-0.707l-1.414-1.414l-0.707,0.707c-1.17,1.167-3.073,1.169-4.243,0 c-1.169-1.17-1.169-3.073,0-4.243L8.465,11.293z"></path><path d="M12,4.929l-0.707,0.707l1.414,1.414l0.707-0.707c1.169-1.167,3.072-1.169,4.243,0c1.169,1.17,1.169,3.073,0,4.243 l-2.122,2.121c-1.133,1.133-3.109,1.133-4.242,0L10.586,12l-1.414,1.414l0.707,0.707c0.943,0.944,2.199,1.465,3.535,1.465 s2.592-0.521,3.535-1.465L19.071,12c1.948-1.949,1.948-5.122,0-7.071C17.121,2.979,13.948,2.98,12,4.929z"></path></svg>                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })}                                

            </div>            
        </div>
    )
}
 
export default Photos;