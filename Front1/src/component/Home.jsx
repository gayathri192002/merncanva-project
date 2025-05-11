import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Item from "./Home/Item";
import api from "../utils/api";
import toast from "react-hot-toast";

const Home = () => {
    const [designs, setDesigns] = useState([]);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [state, setState] = useState({ width: 0, height: 0 });

    // Handle user input
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    // Responsive settings for the carousel
    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
        tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
        smallTablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    // Navigate to the create design page
    const create = (e) => {
        e.preventDefault();
        if (!state.width || !state.height) {
            toast.error("Please enter valid dimensions.");
            return;
        }
        navigate("/design/create", {
            state: {
                type: "create",
                width: state.width,
                height: state.height,
            },
        });
    };

    // Fetch user designs from API
    const get_user_design = async () => {
        try {
            const {data} = await api.get('/api/user-designs')
            setDesigns(data.designs)
        } catch (error) {
            console.log(error)
        }
    }

    // Delete user design
    const delete_design = async (design_id) => {
        try {
            const { data } = await api.put(`/api/delete-user-image/${design_id}`)
            toast.success(data.message)
            get_user_design()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    useEffect(() => {
        get_user_design();
    }, []);

    return (
        <div className="pt-1 pl-3">
            {/* Hero Section */}
            <div className="w-full flex flex-col justify-center items-center h-[250px] bg-gradient-to-r from-[#4c76cf] to-[#552ab8] relative rounded-md overflow-hidden">
                <button
                    onClick={() => setShow(!show)}
                    className="px-4 py-2 text-[15px] bg-[#32769ead] text-white rounded-md font-medium hover:bg-[#1e830f] absolute top-3 right-3"
                >
                    Custom Size
                </button>

                {/* Custom Size Form */}
                {show && (
                    <form
                        onSubmit={create}
                        className="absolute top-16 right-3 bg-[#252627] w-[250px] p-4 text-white rounded-md transition-all duration-500"
                    >
                        <div className="grid grid-cols-2 gap-3 pb-4">
                            <div className="flex flex-col">
                                <label htmlFor="width">Width</label>
                                <input
                                    onChange={inputHandle}
                                    type="number"
                                    name="width"
                                    id="width"
                                    className="w-full outline-none px-2 py-1 bg-[#1b1a1a] border border-[#404040] rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="height">Height</label>
                                <input
                                    onChange={inputHandle}
                                    type="number"
                                    name="height"
                                    id="height"
                                    className="w-full outline-none px-2 py-1 bg-[#1b1a1a] border border-[#404040] rounded-md"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 w-full bg-[#32769ead] text-white rounded-md font-medium hover:bg-[#1e830f]"
                        >
                            Create New Design
                        </button>
                    </form>
                )}

                <h2 className="text-3xl font-semibold text-white mt-6">
                    What Will You Design Today?
                </h2>
            </div>

            {/* Recent Designs Section */}
            <div>
                <h2 className="text-xl py-6 font-semibold text-white">Your Recent Designs</h2>
                <div>
                    <Carousel
                        autoPlay
                        infinite
                        responsive={responsive}
                        transitionDuration={500}
                    >
                        {designs.length > 0 ? (
    designs.map((d, index) => (
        <Item key={d._id || d.id || index} delete_design={delete_design} design={d} />
    ))
) : (
    <p className="text-center text-gray-400">No designs available.</p>
)}

                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default Home;
