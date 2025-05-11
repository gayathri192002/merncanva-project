import { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import Item from './Home/Item';

const Project = ({ type, design_id }) => {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    getUserDesigns();
  }, []);
  
  const getUserDesigns = async () => {
    try {
      const { data } = await api.get('/api/user-designs');
      console.log("Designs:", data.designs); // 🔍 Log what you're getting
      setDesigns(data.designs);
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  };
  
  const deleteDesign = async (id) => {
    try {
      const { data } = await api.put(`/api/delete-user-image/${id}`);
      toast.success(data.message);
      getUserDesigns(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete design');
    }
  };

 
  return (
    <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide w-full">
      <div className={`${type ? 'grid grid-cols-2 gap-2' : 'grid grid-cols-4'} mt-5 w-full`}>
        {designs
          .filter((d) => d._id !== design_id)
          .map((d, i) => (
            <Item key={d._id || i} design={d} type={type} delete_design={deleteDesign} />
          ))}
      </div>
    </div>
  );
};

export default Project;
