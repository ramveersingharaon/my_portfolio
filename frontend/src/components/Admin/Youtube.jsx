import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addYoutube, getUser } from "../../actions/user";
import { MdKeyboardBackspace } from "react-icons/md";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import YoutubeCard from "../YoutubeCard/YoutubeCard";
import Swal from "sweetalert2";

const Youtube = () => {
    const { message, error, loading } = useSelector((state) => state.update);
    const { message: loginMessage } = useSelector((state) => state.login);

    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(addYoutube(title, url, image));
        dispatch(getUser());
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();

        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImage(Reader.result);
            }
        };
    };

    useEffect(() => {
        if (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error,
                showConfirmButton: false,
                timer: 3000
            })
            dispatch({ type: "CLEAR_ERRORS" });
        }
        if (message) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 3000
            })

            dispatch({ type: "CLEAR_MESSAGE" });
        }


        if (loginMessage) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: loginMessage,
                showConfirmButton: false,
                timer: 3000
            })

            dispatch({ type: "CLEAR_MESSAGE" });
        }

    }, [alert, error, message, dispatch, loginMessage]);


    return (
        <div className="adminPanel">
            <div className="adminPanelContainer">
                <Typography variant="h4">
                    <p>A</p>
                    <p>D</p>
                    <p>M</p>
                    <p>I</p>
                    <p style={{ marginRight: "1vmax" }}>N</p>

                    <p>P</p>
                    <p>A</p>
                    <p>N</p>
                    <p>E</p>
                    <p>L</p>
                </Typography>

                <form onSubmit={submitHandler}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="adminPanelInputs"
                    />
                    <input
                        type="text"
                        placeholder="Link"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="adminPanelInputs"
                    />
                    <input
                        type="file"
                        onChange={handleImage}
                        className="adminPanelFileUpload"
                        accept="image/*"
                    />

                    <Link to="/account">
                        BACK <MdKeyboardBackspace />
                    </Link>

                    <Button type="submit" variant="contained" disabled={loading}>
                        Add
                    </Button>
                </form>

                <div className="adminPanelYoutubeVideos">
                    {user &&
                        user.youtube &&
                        user.youtube.map((item) => (
                            <YoutubeCard
                                key={item._id}
                                url={item.url}
                                title={item.title}
                                image={item.image.url}
                                isAdmin={true}
                                id={item._id}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Youtube;