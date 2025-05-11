

const Image = ({ add_image, images = [] }) => {
    // Static images (replace with actual URLs if needed)
    const staticImages = [
        "https://th.bing.com/th/id/OIP.UUrKOVj82dSXjsLQe-Ij4wAAAA?pid=ImgDet&w=199&h=159&c=7&dpr=1.6",
        "https://th.bing.com/th/id/OIP.7VqWh-Q46_OFC_Vbl-xWVwHaHD?w=187&h=178&c=7&r=0&o=5&dpr=1.6&pid=1.7",
        "https://www.bing.com/images/search?view=detailV2&ccid=7OZ1QDJw&id=89416DEA92FB04A2B7FAEEF6D10CE199D6B7AC79&thid=OIP.7OZ1QDJwW93R6jbw1b1oYAHaFj&mediaurl=https%3a%2f%2fdesignwithred.com%2fwp-content%2fuploads%2f2018%2f04%2fa3.jpg&exph=600&expw=800&q=One+Letter+Logo+Design&simid=608012016863176466&FORM=IRPRST&ck=557B3DCF7B4640405337B53F4D977481&selectedIndex=9&itb=0",
        "https://api.deepai.org/job-view-file/decdb697-79dd-4abf-840a-b1f80aca9091/outputs/output.jpg",
        "https://png.pngtree.com/png-clipart/20231008/original/pngtree-lily-flower-elements-for-frame-or-decoration-png-image_13291157.png",
        "https://th.bing.com/th/id/OIP.MJuEMWFHAawCvfwZktAQaQHaHD?rs=1&pid=ImgDetMain",
         "https://th.bing.com/th/id/OIP.g394COSJMaxXNzJEFhUVkwHaJQ?w=223&h=279&c=8&rs=1&qlt=90&o=6&dpr=1.6&pid=3.1&rm=2",
         "https://th.bing.com/th/id/OIP.98g4yVdo7duEZXbdsXVb8wHaI4?w=228&h=273&c=8&rs=1&qlt=90&o=6&dpr=1.6&pid=3.1&rm=2",
         "https://th.bing.com/th/id/OIP.nDtx0ncA427O2UfflMjhXgHaLF?w=115&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7",
         "https://www.leadershipbroward.org/wp-content/uploads/2017/06/photodune-1678194-group-of-graduate-students-xxl-1.jpg"
    ]; 

    return (
        <div className='grid grid-cols-2 gap-2'>
            {/* Render static images */}
            {staticImages.map((src, i) => (
                <div 
                    key={`static-${i}`} 
                    onClick={() => add_image(src)} 
                    className='w-full h-[90px] overflow-hidden rounded-md cursor-pointer hover:opacity-80 transition'
                >
                    <img 
                        className='w-full h-full object-cover' 
                        src={src} 
                        alt={`Static Image ${i + 1}`} 
                    />
                </div>
            ))}

            {/* Render dynamic images from API */}
            {Array.isArray(images) && images.map((item, i) => (
                <div 
                    key={`dynamic-${i}`} 
                    onClick={() => add_image(item.image_url)} 
                    className='w-full h-[90px] overflow-hidden rounded-md cursor-pointer hover:opacity-80 transition'
                >
                    <img 
                        className='w-full h-full object-cover' 
                        src={item.image_url} 
                        alt={`Dynamic Image ${i + 1}`} 
                    />
                </div>
            ))}
        </div>
    );
};

export default Image;

