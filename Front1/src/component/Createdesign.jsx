import {  useEffect, useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { useLocation, useNavigate } from 'react-router-dom';
import Currentcomponent from './Currentcomponent'; // Assuming Currentcomponent is correct
import RotateLoader from 'react-spinners/RotateLoader';
import api from '../utils/api';


const Createdesign = () => {
    const ref = useRef();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    // Define the design object
    const obj = {
        name: "main_frame",
        type: "rect",
        id: Math.floor((Math.random() * 100) + 1),
        height: state?.height, // Optional chaining to prevent issues when state is undefined
        width: state?.width,
        z_index: 1,
        color: 'green',
        image: ""
    }
   
    const create_design = async () => {
        try {
            const image = await htmlToImage.toBlob(ref.current);
            const design = JSON.stringify(obj);
    
            if (image) {
                const formData = new FormData();
                formData.append('design', design); // Fixed duplicate key ('desing' typo removed)
                formData.append('image', image);
    
                setLoader(true);
    
                const { data } = await api.post('/api/create-user-design', formData);
    
                if (data?.design?._id) {
                    navigate(`/design/${data.design._id}/edit`);
                } else {
                    console.error("❌ Error: Missing design ID in API response", data);
                }
    
                setLoader(false);
            }
        } catch (error) {
            setLoader(false);
            console.error("❌ API Error:", error.response?.data || error.message);
        }
    };
    
    useEffect(() => {
        if (state && ref.current) {
            create_design();
        } else {
            navigate('/');
        }
    }, [state, ref]);
    
    
   
    

    return (
        <div className='w-screen h-screen flex justify-center items-center relative'>
            <div ref={ref} className='relative w-auto h-auto overflow-auto'>
                {/* Ensure that Currentcomponent is a valid component */}
                <Currentcomponent info={obj} current_component={{}} />
            </div>
            {loader && (
                <div className='left-0 top-0 w-full h-full flex justify-center items-center bg-black absolute'>
                    <RotateLoader color='white' />
                </div>
            )}
        </div>
    );
};

export default Createdesign;
