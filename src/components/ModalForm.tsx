import React, { useState, useEffect } from 'react'
import { ModalProps, RootState } from '../globalfiles/GlobalInterface';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser } from '../globalfiles/ContactReducer';
import toast, { Toaster } from 'react-hot-toast';


const ModalForm = ({ toggleModal, modalData, modalStatus }: ModalProps) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [inactive, setInactive] = useState<boolean>(false);

  const dispatch = useDispatch();
  const userContact = useSelector((state: RootState) => state.users);

  const toggleActive = (response: boolean) => {
    setActive(response);
    if (response) {
      setInactive(false);
    }
  };

  const toggleInactive = (response: boolean) => {
    setInactive(response);
    if (response) {
      setActive(false);
    }
  };

  useEffect(() => {
    if (modalStatus === "EDIT") {
      setFirstName(modalData.firstName);
      setLastName(modalData.lastName);
      if (modalData.status === "Active") {
        setActive(true);
      } else if (modalData.status === "Inactive") {
        setInactive(true);
      }
    }
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (firstName === "") {
      toast.error('Please enter First Name', { duration: 2000 });
    } else if (lastName === "") {
      toast.error('Please enter Last Name', { duration: 2000 });
    }
    else {
      toggleModal(false);

      if (modalStatus === "CREATE") {
        dispatch(addUser({ id: userContact[userContact.length - 1].id + 1, firstName, lastName, active, inactive }))
      }
      else if (modalStatus === "EDIT") {
        dispatch(updateUser({ id: modalData.id, firstName, lastName, active, inactive }))
      }

    }

  }



  return (
    <div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed backdrop-blur-sm inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold">
                {modalStatus}
              </h3>
              <button
                className="bg-transparent border-0 text-black "
                onClick={() => toggleModal(false)}
              >
               <svg fill="#ebebe0" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 490 490" stroke="#ff1a1a" stroke-width="34.3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="11.387,490 245,255.832 478.613,490 489.439,479.174 255.809,244.996 489.439,10.811 478.613,0 245,234.161 11.387,0 0.561,10.811 234.191,244.996 0.561,479.174 "></polygon> </g></svg>              
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                <label className="block text-black text-sm font-bold mb-1">
                  First Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" type='text' name='firstName' placeholder='enter firstName'
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)} />
                <label className="block text-black text-sm font-bold mb-1">
                  Last Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-1" type='text' name='lastName' placeholder='enter lastName'
                  value={lastName}
                  onChange={e => setLastName(e.target.value)} />
                <label className="block text-black text-sm font-bold mb-1">
                  Status
                </label>
                <div>
                  <input id="active" aria-describedby="active" type="checkbox" name='active'
                    checked={active}
                    onChange={e => toggleActive(e.target.checked)} />
                  <label>Active</label>
                </div>
                <div className="flex items-center  mb-4">
                  <input id="inactive" aria-describedby="inactive" type="checkbox" name='inactive'
                    checked={inactive}
                    onChange={e => toggleInactive(e.target.checked)} />
                  <label>Inactive</label>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-white bg-red-500  background-transparent font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => toggleModal(false)}
              >
                Close
              </button>
              <button
                className="text-white bg-indigo-800 active:bg-indigo-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                {modalStatus === "CREATE" ? "Add" : "Update"}
              </button>
            </div>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalForm
