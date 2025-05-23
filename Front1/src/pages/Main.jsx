import  { useEffect, useState } from 'react';
 
 import { LuLayoutTemplate } from "react-icons/lu";
 import { FaCloudUploadAlt } from "react-icons/fa";
 import { FaShapes } from "react-icons/fa";
 import { FaTextHeight } from "react-icons/fa6";
 import { FaFolderOpen } from "react-icons/fa";
 import { BsImages } from "react-icons/bs";
 import { RxTransparencyGrid } from "react-icons/rx";
 import { MdKeyboardArrowLeft } from "react-icons/md";

 
 import api from '../utils/api'
 import {  Link, useParams } from 'react-router-dom';
 



import Curentcomponent from './../component/Currentcomponent';
import Header from './../component/Header';
import Image from './../component/Image';
import MyImages from './../component/MyImage';
import Project from './../component/Project';



 const Main = () => {
 
     const { design_id } = useParams()
 
     const [state, setState] = useState('')
     const [current_component , setCurrentComponent] = useState('')
     const [color, setColor] = useState('')
     const [image, setImage] = useState('')
     const [rotate, setRotate] = useState(0)
     const [left, setLeft] = useState('')
     const [top, setTop] = useState('')
     const [width, setWidth] = useState('')
     const [height, setHeight] = useState('')
 
    
     const [padding, setPadding] = useState('')
     const [font, setFont] = useState('')
     const [weight, setWeight] = useState('')
     const [text, setText] = useState('')
     const [opacity, setOpacity] = useState('')
     const [zIndex, setzIndex] = useState('')
 
     const [radius, setRadius] = useState(0)
     const[Design,setDesign]=useState('')
 
     const [show, setShow] = useState({
         status: true,
         name:''
     })
 
     const setElements = (type,name) => {
         setState(type)
         setShow({
             state:false,
             name
         })
     }
     const [components , setComponents] = useState([
         {
         name: "main_frame",
         type: "rect",
         id: Math.floor((Math.random() * 100) + 1),
         height: 500,
         width: 650,
         z_index: 1,
         color: '#fff',
         image: "",
         setCurrentComponent: (a) => setCurrentComponent(a)
         }
     ])
 
     useEffect(() => {
         if (current_component) {
             const index = components.findIndex(c => c.id === current_component.id)
 
             const temp =  components.filter(c => c.id !== current_component.id)
 
         if (current_component.name !== 'text') {
             components[index].width = width || current_component.width
             components[index].height = height || current_component.height
             components[index].rotate = rotate || current_component.rotate
         }
 
         if (current_component.name === 'text') {
             components[index].font = font || current_component.font
             components[index].padding = padding || current_component.padding
             components[index].weight = weight || current_component.weight
             components[index].title = text || current_component.title
         }
 
         if (current_component.name === 'image') {
             components[index].radius = radius || current_component.radius
 
         }
 
             if (current_component.name === 'main_frame' && image) {
                 components[index].image = image || current_component.image
             }
 
             if (current_component.name !== 'main_frame') {
                 components[index].left = left || current_component.left
                 components[index].top = top || current_component.top
                 components[index].opacity = opacity || current_component.opacity
                 components[index].z_index = zIndex || current_component.z_index
             }
 
             components[index].color = color || current_component.color
 
             setComponents([...temp,components[index]])
 
             setColor('')
             setLeft('')
             setTop('')
             setWidth('')
             setHeight('')
             setRotate(0)
             setOpacity('')
             setzIndex('')
             setText('')
 
         }
 
     },[color,image,left,top,width,height,opacity,zIndex,padding,font,weight,text,radius])
 
     const moveElement = (id, currentInfo) => {
         setCurrentComponent(currentInfo)
         let isMoving = true
 
         const currentDiv = document.getElementById(id)
 
         const mouseMove = ({ movementX,movementY }) => {
             const getStyle = window.getComputedStyle(currentDiv)
             const left = parseInt(getStyle.left) 
             const top = parseInt(getStyle.top) 
             if (isMoving) {
                 currentDiv.style.left = `${left + movementX}px`
                 currentDiv.style.top = `${top + movementY}px`
             } 
         }
 
         const mouseUp = (e) => {
             let isMoving = false
             window.removeEventListener('mousemove',mouseMove)
             window.removeEventListener('mouseup',mouseUp)
             setLeft(parseInt(currentDiv.style.left))
             setTop(parseInt(currentDiv.style.top))
         }
 
         window.addEventListener('mousemove',mouseMove)
         window.addEventListener('mouseup',mouseUp) 
     }
 
 
     const resizeElement = (id, currentInfo) => {
         setCurrentComponent(currentInfo)
         let isMoving = true
 
         const currentDiv = document.getElementById(id)
 
         const mouseMove = ({ movementX,movementY }) => {
             const getStyle = window.getComputedStyle(currentDiv)
             const width = parseInt(getStyle.width) 
             const height = parseInt(getStyle.height) 
             if (isMoving) {
                 currentDiv.style.width = `${width + movementX}px`
                 currentDiv.style.height = `${height + movementY}px`
             } 
         }
 
         const mouseUp = (e) => {
             let isMoving = false
             window.removeEventListener('mousemove',mouseMove)
             window.removeEventListener('mouseup',mouseUp)
             setWidth(parseInt(currentDiv.style.width))
             setHeight(parseInt(currentDiv.style.height))
         }
 
         window.addEventListener('mousemove',mouseMove)
         window.addEventListener('mouseup',mouseUp) 
     }
 
 
     const rotateElement = (id, currentInfo) => {
         setCurrentComponent("")
         setCurrentComponent(currentInfo)
         const target = document.getElementById(id)
 
         const mouseMove = ({ movementX,movementY }) => {
             const getStyle = window.getComputedStyle(target)
             const trans = getStyle.transform
 
             const values = trans.split('(')[1].split(')')[0].split(',')
             const angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI))
 
             let deg = angle < 0 ? angle + 360 : angle
             if (movementX) {
                 deg = deg + movementX
             }
             target.style.transform = `rotate(${deg}deg)`
 
         }
 
 
         const mouseUp = (e) => {
 
             window.removeEventListener('mousemove',mouseMove)
             window.removeEventListener('mouseup',mouseUp)
 
             const getStyle = window.getComputedStyle(target)
             const trans = getStyle.transform
 
             const values = trans.split('(')[1].split(')')[0].split(',')
             const angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI))
 
             let deg = angle < 0 ? angle + 360 : angle
             setRotate(deg)
 
         } 
         window.addEventListener('mousemove',mouseMove)
         window.addEventListener('mouseup',mouseUp) 
     }
 
     const removeComponent = (id) => {
          const temp = components.filter(c => c.id !== id)
          setCurrentComponent('')
          setComponents(temp)
     }
 
     const remove_background = () => {
         const com = components.find(c => c.id === current_component.id)
         const temp = components.filter(c => c.id !== current_component.id)
         com.image = ''
         setImage("")
         setComponents([...temp,com ])
 
     }
 
     const opacityHandle = (e) => {
         setOpacity(parseFloat(e.target.value))
     }
 
     const createShape = (name, type) => {
         const style = {
             id: Date.now(),
             name: name,
             type,
             left: 10,
             top: 10,
             opacity: 1,
             width: 200,
             height: 150,
             rotate,
             z_index: 2,
             color: '#3c3c3d',
             setCurrentComponent: (a) => setCurrentComponent(a),
             moveElement,
             resizeElement,
             rotateElement
 
         }
         setComponents([...components, style])
     }
 
 
     const add_text = (name, type) => {
         const style = {
             id: Date.now(),
             name: name,
             type,
             left: 10,
             top: 10,
             opacity: 1, 
             rotate,
             z_index: 10,
             padding: 6,
             font: 22,
             title: 'Add Your Text',
             weight: 400,
             color: '#3c3c3d',
             setCurrentComponent: (a) => setCurrentComponent(a),
             moveElement,
             resizeElement,
             rotateElement
 
         }
         setWeight('')
         setFont('')
         setCurrentComponent(style)
         setComponents([...components, style])
     }
 
 
     const add_image = (img) => {
         setCurrentComponent('')
         const style = {
             id: Date.now(),
             name: 'image',
             type: 'image',
             left: 10,
             top: 10,
             opacity: 1, 
             width: 200,
             height: 150,
             rotate,
             z_index: 2,
             radius: 0,
             image: img, 
             setCurrentComponent: (a) => setCurrentComponent(a),
             moveElement,
             resizeElement,
             rotateElement
 
         }
 
         setCurrentComponent(style)
         setComponents([...components, style])
     }
     useEffect(() => {
        const getDesign = async () => {
            if (!design_id) {
                console.warn("⚠️ No design_id provided. Skipping API call.");
                return;
            }
    
            try {
                console.log("🔍 Fetching design with ID:", design_id);
                const response = await api.get(`/api/user-design/${design_id}`);
    
                console.log("📜 Full API Response:", response.data);
    
                if (!response?.data) {
                    console.warn("⚠️ Warning: API returned empty data.");
                    return;
                }
    
                let { design } = response.data;
    
                // Ensure design is always an array
                design = Array.isArray(design) ? design : [design];
    
                const updatedDesign = design.map((item) => ({
                    ...item,
                    setCurrentComponent: (a) => setCurrentComponent(a),
                    moveElement,
                    resizeElement,
                    rotateElement,
                    remove_background,
                }));
    
                setDesign(updatedDesign);
                console.log(updatedDesign) // Ensure `setDesign` is defined
            } catch (error) {
                console.error("❌ Error fetching design:", error.response?.data || error.message);
            }
        };
    
        getDesign();
    }, [design_id]);
    
    
    
    
    
    
 
 
 
     return (
 <div className='min-w-screen h-screen bg-black'>
     <Header components={components} design_id={design_id}/>
 
     <div className='flex h-[calc(100%-60px)] w-screen'>
         <div className='w-[80px] bg-[#18191B] z-50 h-full text-gray-400 overflow-y-auto'>
 
         <div onClick={() => setElements('design','design')} className={` ${show.name === 'design' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
             <span className='text-2xl'><LuLayoutTemplate /></span>
             <span className='text-xs font-medium'>Design</span>
             </div>
 
         <div onClick={() => setElements('shape','shape')} className={`${show.name === 'shape' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
         <span className='text-2xl'><FaShapes /></span>
         <span className='text-xs font-medium'>Shapes</span>
         </div>
 
         <div onClick={() => setElements('image','uploadImage')} className={`${show.name === 'uploadImage' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
         <span className='text-2xl'><FaCloudUploadAlt  /></span>
         <span className='text-xs font-medium'>Upload</span>
         </div>
 
         <div onClick={() => setElements('text','text')} className={`${show.name === 'text' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
         <span className='text-2xl'><FaTextHeight  /></span>
         <span className='text-xs font-medium'>Text</span>
         </div>
 
 
         <div onClick={() => setElements('project','projects')} className={` ${show.name === 'projects' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
         <span className='text-2xl'><FaFolderOpen  /></span>
         <span className='text-xs font-medium'>Project</span>
         </div>
 
         <div onClick={() => setElements('initImage','images')} className={` ${show.name === 'images' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
         <span className='text-2xl'><BsImages   /></span>
         <span className='text-xs font-medium'>Images</span>
         </div>
 
         <div onClick={() => setElements('background','background')} className={`${show.name === 'background' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
         <span className='text-2xl'><RxTransparencyGrid   /></span>
         <span className='text-xs font-medium'>Background</span>
         </div> 
         </div>
 
 
 
     <div className='h-full w-[calc(100%-75px)]'>
         <div className={`${show.status ? 'p-0 -left-[350px]': 'px-8 left-[75px] py-5'} bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}>
             <div onClick={() => setShow({name: '' ,status: true })} className='flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full'>
             <MdKeyboardArrowLeft />
             </div>
             {state === 'design' && (
    <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
      <div className="grid grid-cols-2 gap-2">
        {[
          'https://th.bing.com/th/id/OIP.c4KPuPLH9voam_ELLGaeywHaFQ?w=269&h=191&c=7&r=0&o=5&dpr=1.6&pid=1.7',
          'https://th.bing.com/th/id/OIP.qYGvC06qTQFOifGE51-S_wHaK4?w=187&h=275&c=7&r=0&o=5&dpr=1.6&pid=1.7',
          'https://th.bing.com/th/id/OIP.kRniPuqRlB8xiSDvbfcACwAAAA?w=187&h=264&c=7&r=0&o=5&dpr=1.6&pid=1.7',
         'https://th.bing.com/th/id/OIP.FJXpfZOZZ3k_9YYTgUDZ6QHaHa?rs=1&pid=ImgDetMain',
          'https://th.bing.com/th/id/OIP.o9L1jvdV8NfODsonKgmy6AHaFu?w=233&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7',
        ].map((url, i) => (
          <div
            key={i}
            onClick={() => setImage(url)}
            className="w-full h-[90px] overflow-hidden rounded-sm cursor-pointer"
          >
            <img
              className="w-full h-full object-cover rounded"
              src={url}
              alt={`Background ${i}`}
            />
          </div>
        ))}
      </div>
    </div>
  )}
  
             {
                 state === 'shape' && <div className='grid grid-cols-3 gap-2'>
                     <div onClick={() => createShape('shape', 'rect')} className='h-[90px] w-[90px] bg-[#3c3c3d] cursor-pointer'></div>

<div onClick={() => createShape('shape', 'circle')} className='h-[90px] w-[90px] bg-[#3c3c3d] cursor-pointer rounded-full'></div>

<div onClick={() => createShape('shape', 'trangle')} 
style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} className='h-[90px] w-[90px] bg-[#3c3c3d] cursor-pointer'></div>

<div onClick={() => createShape('shape', 'pentagon')} style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} className='h-[90px] w-[90px] bg-[#3c3c3d] cursor-pointer'></div>


<div onClick={() => createShape('shape', 'star')} style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} className='h-[90px] w-[90px] bg-[#3c3c3d] cursor-pointer'></div>

<div onClick={() => createShape('shape', 'parallelogram')} style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }} className='h-[90px] w-[90px] bg-[#3c3c3d] cursor-pointer'></div>

                 </div>
             }
             {
                 state ==   'image' && <MyImages add_image={add_image}/>  
             }
             {
                 state === 'text' && <div>
                     <div className='grid grid-cols-1 gap-2'>
                     <div onClick={() => add_text('text','title')} className='bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm'>
                     <h2>Add A Text </h2>
                     </div>
                     </div>
                 </div>
             }
             {
                 
                 state === 'project' &&  <Project    type='main' design_id={design_id} />
             }
             {
                 state === 'initImage' && <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
                     <Image add_image={add_image} />
                 </div>
 }{state === 'background' && (
    <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
      <div className="grid grid-cols-2 gap-2">
        {[
          'https://th.bing.com/th/id/OIP.kug8-9NMPeRq3p6L11POJgHaEK?pid=ImgDet&w=474&h=266&rs=1',
          'https://th.bing.com/th/id/OIP.ujB3LQLlxP12McLtT-OMbgHaEK?pid=ImgDet&w=474&h=266&rs=1',
          'https://marketplace.canva.com/EAEvtbPYp80/1/0/800w/canva-red-and-white-elegant-merry-christmas-zoom-virtual-background-ExJQp9-e4hE.jpg',
          'https://marketplace.canva.com/EAE6czSlkzA/1/0/1600w/canva-beige-aesthetic-floral-desktop-wallpaper-8a_51ac_kGU.jpg',
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
        ].map((url, i) => (
          <div
            key={i}
            onClick={() => setImage(url)}
            className="w-full h-[90px] overflow-hidden rounded-sm cursor-pointer"
          >
            <img
              className="w-full h-full object-cover rounded"
              src={url}
              alt={`Background ${i}`}
            />
          </div>
        ))}
      </div>
    </div>
  )}
  

          </div>
     <div className='w-full flex h-full'>
         <div className={`flex justify-center relative items-center h-full ${!current_component ? 'w-full' : "w-[calc(100%-250px)] overflow-hidden"}`}>
             <div className='m-w-[650px] m-h-[500px] flex justify-center items-center overflow-hidden'>
             <div id='main_design' className='w-auto relative h-auto overflow-hidden' >
                 {
                     components.map((c,i) => <Curentcomponent key={i} info={c} current_component={current_component} removeComponent={removeComponent} />
                     )
                 }
             </div>
             </div>
 
         </div>
 
     {
         current_component && <div className='h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2'>
             <div className='flex gap-6 flex-col items-start h-full px-3 justify-start'>
                 <div className='flex gap-4 justify-start items-start mt-4'>
                 <span>Color :</span>
                 <label className='w-[30px] h-[30px] cursor-pointer rounded-sm' style={{ background: `${current_component.color && current_component.color !== '#fff' ? current_component.color : 'gray' }` }}  htmlFor="color"></label>
                 <input onChange={(e) => setColor(e.target.value)} type="color" className='invisible'  id="color" />
                 </div>
                 <div>
                 <Link to="/home">
  <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
    Go to Home Page
  </button>
  </Link>
  </div>
                 
                 
    {/* Conditionally Render "Remove Background" Button */}
    {(current_component?.name === 'main_frame' && current_component?.image) && (
        <div 
            className='p-[6px] bg-slate-600 text-white cursor-pointer rounded-md shadow-md hover:bg-slate-700 transition duration-200' 
            onClick={remove_background}
        >
            Remove Background
        </div>
    )}


     {
         current_component.name !== 'main_frame' && <div className='flex gap-6 flex-col'>
             <div className='flex gap-1 justify-start items-start'>
                 <span className='text-md w-[70px]'>Opacity</span>
             <input onChange={opacityHandle} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={0.1} min={0.1} max={1} value={current_component.opacity}  />
             </div>
 
             <div className='flex gap-1 justify-start items-start'>
    <span className='text-md w-[70px]'>Z-Index</span>
    <input 
        onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setzIndex(isNaN(value) ? 0 : value);
        }} 
        className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' 
        type="number" 
        step={1} 
        value={current_component?.z_index || 0}  
    />
   

</div>

 
     {
         current_component.name === 'image' && <div className='flex gap-1 justify-start items-start'>
         <span className='text-md w-[70px]'>Radius</span>
     <input onChange={(e) => setRadius(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={current_component.radius}  />
     </div>
     }        
 
 
     {
         current_component.name === 'text' && <>
         <div className='flex gap-1 justify-start items-start'>
                 <span className='text-md w-[70px]'>Padding : </span>
             <input onChange={(e) => setPadding(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={current_component.padding}  />
             </div>
 
             <div className='flex gap-1 justify-start items-start'>
                 <span className='text-md w-[70px]'>Font Size</span>
             <input onChange={(e) => setFont(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={current_component.font}  />
             </div>
 
             <div className='flex gap-1 justify-start items-start'>
                 <span className='text-md w-[70px]'>Weight : </span>
             <input onChange={(e) => setWeight(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={100} min={100} max={900} value={current_component.weight}  />
             </div> 
 
 
             <div className='flex gap-2 flex-col justify-start items-start'>
 
             <input onChange={(e) => setCurrentComponent({
                 ...current_component,
                 title: e.target.value
             } )} className='border border-gray-700 bg-transparent outline-none p-2 rounded-md' type="text" value={current_component.title}  />
             <button onClick={() => setText(current_component.title)} className='px-4 py-2 bg-purple-500 text-xs text-white rounded-sm'>Add Text</button>
 
             </div> 
 
 
         </>
     }        
 
         </div>
 
     }
 
 
 
             </div>
 
         </div>
     }
 
 
 
 
 
 
     </div>    
 
 
 
 
 
     </div> 
     </div>
 
 </div>
     );
 };
 export default Main;